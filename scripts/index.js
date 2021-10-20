const {
  installComponent,
  isComponentInstalled,
  manageDependencies,
  getProgram,
  canRemoveComponent,
} = require('./utils/index');

/**
 * Commands available mapper
 */
const COMMANDS = {
  DEPEND: 'DEPEND',
  INSTALL: 'INSTALL',
  REMOVE: 'REMOVE',
  LIST: 'LIST',
  END: 'END',
};

let installedComponents = [];

const run = commands => {
  for (const command of commands) {
    try {
      /**
       * Given an array of strings as input
       * we need to split the commands to run the program
       */
      const commandSplit = command.split('\\s+');
      /**
       * We are not making the program case sensitive
       * so we are taking each command and transform it to upperCase()
       * this avoids errors in execution
       */
      const commandSanitize = commandSplit[0].toUpperCase();
      const commandToExecute = COMMANDS[commandSanitize.split(' ')[0]];
      const commandInputProgram = command.split(' ')[1];

      switch (commandToExecute) {
        case 'DEPEND':
          console.log(`${command}`);
          manageDependencies(commandInputProgram, command);
          break;
        case 'INSTALL': {
          console.log(`${command}`);
          const programToInstall = getProgram(commandInputProgram);
          /**
           * First we need to check
           * is the program is already installed
           */
          if (isComponentInstalled(programToInstall, installedComponents)) {
            console.log(`${programToInstall.name} is already installed`);
          } else {
            /**
             * If the program is not yet installed
             * we need to check dependencies in order
             * to finally install
             */
            for (const programDependency of programToInstall.dependencies) {
              if (!isComponentInstalled(programDependency, installedComponents)) {
                installComponent(programDependency, installedComponents);
              }
            }
            installComponent(programToInstall, installedComponents);
          }
          break;
        }
        case 'REMOVE': {
          console.log(`${command}`);
          const componentToRemove = getProgram(commandInputProgram);
          /**
           * In order to remove a program first we check if is installed
           * then we check if we can remove it completly,
           * if none of those steps can be executed it means that
           * the component is still needed due dependencies
           */
          if (!isComponentInstalled(componentToRemove, installedComponents)) {
            console.log(`${componentToRemove.name} is not installed`);
          } else if (canRemoveComponent(componentToRemove, installedComponents)) {
            installedComponents = installedComponents.filter(item => item.name !== componentToRemove.name);
            console.log(`Removing ${componentToRemove.name}`);

            const currentSoftwareDependencies = componentToRemove.dependencies;
            for (const dependency of currentSoftwareDependencies) {
              if (canRemoveComponent(dependency, installedComponents)) {
                console.log(`Removing ${dependency.name}`);
                installedComponents = installedComponents.filter(item => item.name !== dependency.name);
              }
            }
          } else {
            console.log(`${componentToRemove.name} is still needed`);
          }
          break;
        }
        case 'LIST':
          console.log(`${command}`);
          /**
           * List all installed components
           */
          for (const component of installedComponents) {
            if (component.name) {
              console.log(component.name);
            }
          }
          break;
        case 'END':
          /**
           * End execution
           */
          console.log(`${command}`);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(`error`, { message: error.message, stack: error.stack });
    }
  }
};

run([
  'DEPEND TELNET TCPIP NETCARD',
  'DEPEND TCPIP NETCARD',
  'DEPEND NETCARD TCPIP',
  'DEPEND DNS TCPIP NETCARD',
  'DEPEND BROWSER TCPIP HTML',
  'INSTALL NETCARD',
  'INSTALL TELNET',
  'INSTALL foo',
  'REMOVE NETCARD',
  'INSTALL BROWSER',
  'INSTALL DNS',
  'LIST',
  'REMOVE TELNET',
  'REMOVE NETCARD',
  'REMOVE DNS',
  'REMOVE NETCARD',
  'INSTALL NETCARD',
  'REMOVE TCPIP',
  'REMOVE BROWSER',
  'REMOVE TCPIP',
  'LIST',
  'END',
]);
