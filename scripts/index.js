const {
  installComponent,
  isComponentInstalled,
  manageDependencies,
  getProgram,
  canRemoveComponent,
} = require('./utils/index');

const COMMANDS = {
  DEPEND: 'DEPEND',
  INSTALL: 'INSTALL',
  REMOVE: 'REMOVE',
  LIST: 'LIST',
  END: 'END',
};
let installedComponents = [];

const run = commands => {
  // validateCommands(commands);
  for (const command of commands) {
    try {
      const commandSplit = command.split('\\s+');
      const commandSanitize = commandSplit[0].toUpperCase();
      const commandToExecute = COMMANDS[commandSanitize.split(' ')[0]];
      const commandInputProgram = command.split(' ')[1];

      switch (commandToExecute) {
        case 'DEPEND':
          console.log(`${command}`);
          manageDependencies(commandInputProgram, command);
          break;
        case 'INSTALL':
          console.log(`${command}`);
          const programToInstall = getProgram(commandInputProgram);
          if (isComponentInstalled(programToInstall, installedComponents)) {
            console.log(`${programToInstall.name} is already installed`);
          } else {
            for (const programDependency of programToInstall.dependencies) {
              if (!isComponentInstalled(programDependency, installedComponents)) {
                installComponent(programDependency, installedComponents);
              }
            }
            installComponent(programToInstall, installedComponents);
          }
          break;
        case 'REMOVE':
          console.log(`${command}`);
          const componentToRemove = getProgram(commandInputProgram);
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

        case 'LIST':
          console.log(`${command}`);
          for (const component of installedComponents) {
            if (component.name) {
              console.log(component.name);
            }
          }
          break;

        case 'END':
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
