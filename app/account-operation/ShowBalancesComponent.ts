import { AfterViewInit, Component, Directive, OnDestroy, OnInit } from "@angular/core";
import { BankAccount } from "./account";
import { Bank } from "./bank";

@Component({
  providers: [ Bank ],
  selector: 'show-accounts',
  styles: [`
    .zero-balance {
      color: red;
      font-weight: bold;
    }
  `],
  templateUrl: './ShowBalancesComponent.html',
  // template: require('./ShowBalancesComponent.html')
})
export class ShowBalancesComponent implements OnInit, OnDestroy,AfterViewInit {
  public accounts: BankAccount[]=[];
  public loading: boolean;
  private _accountUpdatesSubscription: any;
  private _bank: Bank;
  firstName: string;
  email: string;
  constructor(bank: Bank) {
    this._bank = bank;
    this.accounts = this._bank.getAllAccounts();
  }
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
  public ngOnInit() {
    this._accountUpdatesSubscription = Bank.accountUpdates
      .subscribe(() => this.refreshAccounts());
  }

  public ngOnDestroy() {
    this._accountUpdatesSubscription.unsubscribe();
  }

  public isZeroBalance(account: BankAccount) : boolean {
    return account.balance === 0;
  }

  public refreshAccounts() : void {
    this.loading = true;
    this.accounts = this._bank.getAllAccounts();
    this.loading = false;
  }
}
