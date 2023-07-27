import {getSizeLabel} from '../src/labeler';

import * as core from '@actions/core';

jest.mock('@actions/core');

beforeAll(() => {
  jest.spyOn(core, 'getInput').mockImplementation((name, options) => {
    return jest.requireActual('@actions/core').getInput(name, options);
  });
});

const sizeSettings = new Map([
  [0, 'XS'],
  [10, 'S'],
  [30, 'M'],
  [100, 'L'],
  [500, 'XL'],
  [1000, 'XXL']
]);

const sizeSettingsNoZero = new Map([
  [10, 'XS'],
  [30, 'S'],
  [50, 'M'],
  [100, 'L'],
  [500, 'XL'],
  [1000, 'XXL']
]);

describe('getSizeLabel', () => {
  it('returns the label size/XS with default settings', () => {
    const changedFiles = [
      {name: 'foo.txt', size: 6},
      {name: 'bar.txt', size: 2}
    ];
    const result = getSizeLabel(changedFiles, sizeSettings);

    expect(result).toBe('size/XS');
  });

  it('returns the label size/S with default settings', () => {
    const changedFiles = [
      {name: 'foo.txt', size: 6},
      {name: 'bar.txt', size: 9}
    ];
    const result = getSizeLabel(changedFiles, sizeSettings);

    expect(result).toBe('size/S');
  });

  it('returns the label size/M with default settings', () => {
    const changedFiles = [
      {name: 'foo.txt', size: 13},
      {name: 'bar.txt', size: 24}
    ];
    const result = getSizeLabel(changedFiles, sizeSettings);

    expect(result).toBe('size/M');
  });

  it('returns the label size/L with default settings', () => {
    const changedFiles = [
      {name: 'foo.txt', size: 60},
      {name: 'bar.txt', size: 57}
    ];
    const result = getSizeLabel(changedFiles, sizeSettings);

    expect(result).toBe('size/L');
  });

  it('returns the label size/XL with default settings', () => {
    const changedFiles = [
      {name: 'foo.txt', size: 356},
      {name: 'bar.txt', size: 213}
    ];
    const result = getSizeLabel(changedFiles, sizeSettings);

    expect(result).toBe('size/XL');
  });

  it('returns the label size/XXL with default settings', () => {
    const changedFiles = [
      {name: 'foo.txt', size: 629},
      {name: 'bar.txt', size: 528}
    ];
    const result = getSizeLabel(changedFiles, sizeSettings);

    expect(result).toBe('size/XXL');
  });

  it('returns the label size/XXS when smaller than smallest size in settings', () => {
    const changedFiles = [
      {name: 'foo.txt', size: 6},
      {name: 'bar.txt', size: 2}
    ];
    const result = getSizeLabel(changedFiles, sizeSettingsNoZero);

    expect(result).toBe('size/XXS');
  });
});
