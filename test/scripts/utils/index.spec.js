const {
  installComponent,
  isComponentInstalled,
  manageDependencies,
  getProgram,
  canRemoveComponent,
} = require('../../../scripts/utils/index');

describe('getProgram()', () => {
  it('Should return program', () => {
    const name = 'NETCARD';
    expect(getProgram(name)).toEqual({ dependencies: [], name: 'NETCARD' });
  });
});

describe('isComponentInstalled()', () => {
  it('Should return true or false', () => {
    const installedComponents = [];
    expect(isComponentInstalled('NETCARD', installedComponents)).toBe(false);
  });
});

describe('installComponent()', () => {
  it('Should install component', () => {
    const installedComponents = [];
    installComponent({ dependencies: [], name: 'NETCARD' }, installedComponents);
    expect(installedComponents).toStrictEqual([{ dependencies: [], name: 'NETCARD' }]);
  });
});

describe('manageDependencies()', () => {
  it.skip('Should install component dependencies', () => {
    expect(manageDependencies('TELNET', 'DEPEND TELNET TCPIP NETCARD')).toBe('hello');
  });
});

describe('Should return true or false', () => {
  it('Should install component', () => {
    const installedComponents = [{ dependencies: [], name: 'NETCARD' }];
    expect(canRemoveComponent('NETCARD', installedComponents)).toBe(true);
  });
});
