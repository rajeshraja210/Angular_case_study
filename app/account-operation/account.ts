export class BankAccount {
  public id: string;
  public balance: number;
  public accountType: string;
  public firstName: string;
  public email: string;
  constructor(
    id: string,
    firstName: string,
    email: string,
    accountType: string,
    initialBalance = 0
  ) {
    if (!id) {
      throw new Error("id must be provided.");
    }
    if (!firstName) {
      throw new Error("firstName must be provided.");
    }
    if (!email) {
      throw new Error("email must be provided.");
    }
    if (!accountType) {
      throw new Error("accountType must be provided.");
    }
    if (initialBalance < 0) {
      throw new Error("initialBalance must not be negative.");
    }

    if (!this.isInteger(initialBalance)) {
      throw new Error(
        `The amount specified '${initialBalance}' must be an integer ` +
          "(decimals are not supported)"
      );
    }

    this.id = id;
    this.balance = initialBalance;
    this.accountType = accountType;
    this.firstName = firstName;
    this.email = email;
  }

  /* tslint:disable:quotemark max-line-length */
  private isInteger(value: number) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
    return (
      typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  }
  /* tslint: enable */
}
