const Program = require('./Program.js');

const programsMap = new Map();

const getProgram = name => {
  let program = programsMap.get(name);
  if (!program) {
    program = new Program();
    program.name = name;
    programsMap.set(name, program);
  }
  return program;
};

const isComponentInstalled = (componentToInstall, installedComponents) => {
  return installedComponents.includes(componentToInstall);
};

const installComponent = (component, installedComponents) => {
  if (component.name) {
    console.log(`Installing ${component.name}`);
    installedComponents.push(component);
  }
};

const manageDependencies = (programName, commandInput) => {
  for (let i = 2; i < commandInput.length; i++) {
    const dependency = commandInput.split(' ')[i];
    const dependencies = getProgram(dependency).dependencies;

    if (dependencies !== null && dependencies.includes(getProgram(programName))) {
      console.log(dependency + ' depends on ' + programName + ', ignoring command');
    } else {
      getProgram(programName).addDependencies(getProgram(dependency));
    }
  }
};

const canRemoveComponent = (componentToRemove, installedComponents) => {
  for (const component of installedComponents) {
    const requiredDependencies = component.dependencies;
    if (requiredDependencies) {
      for (const dependency of requiredDependencies) {
        if (componentToRemove.name === dependency.name) {
          return false;
        }
      }
    }
  }
  return true;
};

module.exports = {
  installComponent,
  isComponentInstalled,
  manageDependencies,
  getProgram,
  canRemoveComponent,
  programsMap,
};
