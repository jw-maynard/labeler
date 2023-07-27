import {checkGlobs} from '../src/labeler';

import * as core from '@actions/core';

jest.mock('@actions/core');

beforeAll(() => {
  jest.spyOn(core, 'getInput').mockImplementation((name, options) => {
    return jest.requireActual('@actions/core').getInput(name, options);
  });
});

const matchConfig = [{any: ['*.txt']}];

describe('checkGlobs', () => {
  it('returns true when our pattern does match changed files', () => {
    const changedFiles = [
      {name: 'foo.txt', size: 6},
      {name: 'bar.txt', size: 20}
    ];
    const result = checkGlobs(changedFiles, matchConfig, false);

    expect(result).toBeTruthy();
  });

  it('returns false when our pattern does not match changed files', () => {
    const changedFiles = [{name: 'foo.docx', size: 13}];
    const result = checkGlobs(changedFiles, matchConfig, false);

    expect(result).toBeFalsy();
  });

  it('returns false for a file starting with dot if `dot` option is false', () => {
    const changedFiles = [{name: '.foo.txt', size: 13}];
    const result = checkGlobs(changedFiles, matchConfig, false);

    expect(result).toBeFalsy();
  });

  it('returns true for a file starting with dot if `dot` option is true', () => {
    const changedFiles = [{name: '.foo.txt', size: 13}];
    const result = checkGlobs(changedFiles, matchConfig, true);

    expect(result).toBeTruthy();
  });
});
