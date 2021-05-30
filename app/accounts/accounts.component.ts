import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Bank } from "../account-operation/bank";
export interface Transaction {
  credit: string;
  debit: string;
  amount: number;
  description: string;
  date: Date;
}
@Component({
  providers: [Bank],
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.css"],
})
export class AccountsComponent implements OnInit, AfterViewInit {
  firstName = "Rajesh";
  email = "rajeshraja210@gmail.com";
  name = "test User";
  debit = ["Cash", "Accounts Receivable", "Maintenance", "Service Fees"];
  credit = ["Revenue", "Accounts Payable", "Owner's Equity"];
  transactions: Transaction[];

  accounts: string[];
  balances: { [s: string]: number } = {};
  now = Date.now();

  constructor(private bank: Bank) {
    this.accounts = [...this.debit, ...this.credit];
    this.accounts.map((key) => (this.balances[key] = 0));
    //this.transactions = JSON.parse(localStorage['transactionCache'] || '[]');
    this.transactions = [];
    for (let transaction of this.transactions) {
      this.addTransaction(transaction);
    }
  }

  ngAfterViewInit() {
    let anyExistingAccount = this.bank
      .getAllAccounts()
      .some((x) => x.id === "account-1");
    if (!anyExistingAccount) {
      this.bank.openAccount(
        "account-1",
        this.firstName,
        this.email,
        "Saving",
        123
      );
      this.bank.openAccount(
        "account-2",
        this.firstName,
        this.email,
        "Saving",
        234
      );
      this.bank.openAccount(
        "account-3",
        this.firstName,
        this.email,
        "Current",
        123
      );
      this.bank.openAccount(
        "account-4",
        this.firstName,
        this.email,
        "Current",
        234
      );
    }
  }

  create(
    debit: string,
    credit: string,
    description: string,
    amount: number,
    date: Date
  ) {
    this.addTransaction({
      debit: debit,
      credit: credit,
      amount: amount,
      description: description,
      date: date,
    });
    //localStorage['transactionCache'] = JSON.stringify(this.transactions);
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
    if (this.debit.indexOf(transaction.debit) !== -1) {
      this.balances[transaction.debit] += transaction.amount;
    } else {
      this.balances[transaction.debit] -= transaction.amount;
    }
    if (this.credit.indexOf(transaction.credit) !== -1) {
      this.balances[transaction.credit] += transaction.amount;
    } else {
      this.balances[transaction.credit] -= transaction.amount;
    }
  }

  ngOnInit(): void {}
}
