class Program {
  constructor(name, dependencies = []) {
    this.name = name;
    this.dependencies = dependencies;
  }

  getName(name) {
    return name;
  }

  getDependencies(dependencies) {
    return dependencies;
  }

  addDependencies(dependency) {
    this.dependencies.push(dependency);
  }
}

module.exports = Program;
