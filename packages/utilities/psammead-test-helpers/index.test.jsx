import * as testHelpers from '.';
import * as testHelpersFromSrc from './src/index';

const testHelpersExpectedExports = {
  shouldMatchSnapshot: 'function',
  shallowRender: 'function',
  shouldShallowMatchSnapshot: 'function',
  isNull: 'function',
  testUtilityPackages: 'function',
};

const expectedExports = { testHelpers: testHelpersExpectedExports };

const acutalExports = { testHelpers };

const acutalExportsFromSrc = { testHelpers: testHelpersFromSrc };

const testTheTestHelperErrorCases = testHelperMethod => {
  const consoleLogSpy = jest.spyOn(global.console, 'log');

  const actual = { utility: { foo: {} } };
  const expected = { utility: { bar: {} } };

  expect(() => {
    testHelperMethod(actual, expected, 'testing');
  }).toThrowError();
  expect(consoleLogSpy).toHaveBeenCalledWith(
    'No expected export value declared in unit tests for testing/utility.js - foo',
  );

  consoleLogSpy.mockRestore();
};

describe('Psammead test helpers', () => {
  it('should test all the utility exports exist and are the correct type', () => {
    testHelpers.testUtilityPackages(
      acutalExports,
      expectedExports,
      'psammead-test-helpers',
    );
  });

  it('should test all the utility exports exist and are the correct type when coming from src/', () => {
    testHelpers.testUtilityPackages(
      acutalExportsFromSrc,
      expectedExports,
      'psammead-test-helpers',
    );
  });

  it('should error and console.log if expectedExport is missing a value compared to the actual export', () => {
    testTheTestHelperErrorCases(testHelpers.testUtilityPackages);
  });

  it('should error and console.log if expectedExport is missing a value compared to the actual export when coming from /src', () => {
    testTheTestHelperErrorCases(testHelpersFromSrc.testUtilityPackages);
  });
});
