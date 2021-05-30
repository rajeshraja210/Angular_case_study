// Import necessary wrappers for Jasmine

import {BankAccount} from './account';
let firstName = 'Rajesh';
let email = 'rajeshraja210@gmail.com';
describe('constructor', () => {
  it('should throw for missing id', () => {
    expect(() => new BankAccount(undefined,undefined,undefined,undefined))
      .toThrowError('id and accounttype must be provided.');
  });

  it('should allow an id of \'0\'', () => {
    let accountId = '0';
    let accountType = '0';
    let account = new BankAccount(accountId,accountType,firstName,email);

    expect(account.id).toEqual(accountId);
  });

  it('should throw for negative initialBalance', () => {
    expect(() => new BankAccount('account-9',firstName,email,'Saving', -1))
      .toThrowError('initialBalance must not be negative.');
  });

  it('should throw for decimal initialBalance', () => {
    let initialBalance = 123.45;
    let accountType = 'Saving';
    expect(() => new BankAccount('account-9',firstName,email,accountType, initialBalance))
      .toThrowError(
        `The amount specified '${initialBalance}' must be an integer ` +
        '(decimals are not supported)');
  });

  it('should default balance to zero if initialBalance is not specified', () => {
    let account = new BankAccount('account-9',firstName,email,'Saving');

    expect(account.balance).toEqual(0);
  });

  it('should set balance if initialBalance is specified', () => {
    let initialBalance = 123;

    let account = new BankAccount('account-9',firstName,email,'Saving', initialBalance);

    expect(account.balance).toEqual(initialBalance);
  });
});
