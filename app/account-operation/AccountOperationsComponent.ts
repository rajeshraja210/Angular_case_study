import { AfterViewInit, Component, Directive } from "@angular/core";
import { Bank } from "./bank";

@Component({
  providers: [Bank],
  selector: "account-operations",
  styles: [
    `
      .bank-textfield--account-id-label {
        width: 200px;
      }
      .bank-textfield--amount-label {
        width: 125px;
      }
      .bank-button {
        width: 150px;
      }
    `,
  ],
  templateUrl: "./AccountOperationsComponent.html",
})
export class AccountOperationsComponent implements AfterViewInit {
  btnClickedMale = true;
  btnClickedFemale = false;

  firstName: string;
  email: string;
  // accounType: string;
  public accountId: string;
  public accountType: string = "Saving";
  public amount: number;
  public transferToAccountId: string;
  ngAfterViewInit() {
    let anyExistingAccount = this._bank
      .getAllAccounts()
      .some((x) => x.id === "account-1");
    if (!anyExistingAccount) {
      this._bank.openAccount(
        "account-1",
        this.firstName,
        this.email,
        "Saving",
        123
      );
      this._bank.openAccount(
        "account-2",
        this.firstName,
        this.email,
        "Saving",
        234
      );
      this._bank.openAccount(
        "account-3",
        this.firstName,
        this.email,
        "Current",
        123
      );
      this._bank.openAccount(
        "account-4",
        this.firstName,
        this.email,
        "Current",
        234
      );
    }
  }
  public get openAccountProhibited() {
    if (!this.accountId) {
      return true;
    }

    let anyExistingAccount = this._bank
      .getAllAccounts()
      .some((x) => x.id === this.accountId);

    return anyExistingAccount;
  }
  Saving() {
    this.btnClickedMale = true;
    this.btnClickedFemale = false;
    this.accountType = "Saving";
  }

  Current() {
    this.btnClickedMale = false;
    this.btnClickedFemale = true;
    this.accountType = "Current";
  }
  public get closeAccountProhibited() {
    if (!this.accountId) {
      return true;
    }

    let anyExistingZeroBalanceAccount = this._bank
      .getAllAccounts()
      .some((x) => x.id === this.accountId && x.balance === 0);

    return !anyExistingZeroBalanceAccount;
  }

  public get depositProhibited() {
    if (!this.accountId) {
      return true;
    }

    if (!this.amount || this.amount < 0) {
      return true;
    }

    let anyExistingAccount = this._bank
      .getAllAccounts()
      .some((x) => x.id === this.accountId);

    return !anyExistingAccount;
  }

  public get withdrawProhibited() {
    if (!this.accountId) {
      return true;
    }

    if (!this.amount || this.amount < 0) {
      return true;
    }

    let existingAccounts = this._bank
      .getAllAccounts()
      .filter((x) => x.id === this.accountId);

    if (existingAccounts.length === 0) {
      return true;
    }

    let existingAccount = existingAccounts[0];

    return existingAccount.balance < this.amount;
  }

  public get transferProhibited() {
    if (!this.accountId) {
      return true;
    }

    if (!this.amount || this.amount < 0) {
      return true;
    }

    if (!this.transferToAccountId) {
      return true;
    }

    if (this.accountId === this.transferToAccountId) {
      return true;
    }

    let existingAccounts = this._bank
      .getAllAccounts()
      .filter((x) => x.id === this.accountId);

    if (existingAccounts.length === 0) {
      return true;
    }

    let existingAccount = existingAccounts[0];

    if (existingAccount.balance < this.amount) {
      return true;
    }

    let anyExistingTransferToAccount = this._bank
      .getAllAccounts()
      .some((x) => x.id === this.transferToAccountId);

    return !anyExistingTransferToAccount;
  }

  private _bank: Bank;

  constructor(bank: Bank) {
    this._bank = bank;
  }

  public openAccount(): void {
    if (!this.accountId) {
      throw new Error("accountId must be provided.");
    }
    if (!this.amount) {
      throw new Error("amount must be provided.");
    }

    this._bank.openAccount(
      this.accountId,
      this.firstName,
      this.email,
      this.accountType,
      this.amount
    );

    this.resetAmount();
  }

  public closeAccount(): void {
    if (!this.accountId) {
      throw new Error("accountId must be provided.");
    }

    this._bank.closeAccount(this.accountId);

    this.resetAmount();
  }

  public deposit(): void {
    if (!this.accountId) {
      throw new Error("accountId must be provided.");
    }

    if (!this.amount) {
      throw new Error("amount must be provided.");
    }

    this._bank.deposit(this.accountId, this.amount);

    this.resetAmount();
  }

  public withdraw(): void {
    if (!this.accountId) {
      throw new Error("accountId must be provided.");
    }

    if (!this.amount) {
      throw new Error("amount must be provided.");
    }

    this._bank.withdraw(this.accountId, this.amount);

    this.resetAmount();
  }

  public transfer(): void {
    if (!this.accountId) {
      throw new Error("accountId must be provided.");
    }

    if (!this.amount) {
      throw new Error("amount must be provided.");
    }

    if (!this.transferToAccountId) {
      throw new Error("transferToAccountId must be provided.");
    }

    this._bank.transfer(this.accountId, this.transferToAccountId, this.amount);

    this.resetAmount();
    this.transferToAccountId = null;
  }

  private resetAmount(): void {
    this.amount = undefined;
  }
}
