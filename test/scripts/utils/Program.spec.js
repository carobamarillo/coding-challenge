const Program = require('../../../scripts/utils/Program');

it('Should throw an error when calling playSomethingCool', () => {
  const program = new Program();
  program.name = 'test';

  expect(program).toEqual({ name: 'test', dependencies: [] });
});
