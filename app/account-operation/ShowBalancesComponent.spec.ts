

import { BankAccount } from './account';
import { Bank } from './bank';
import {ShowBalancesComponent} from './ShowBalancesComponent';
let firstName = 'Rajesh';
let email = 'rajeshraja210@gmail.com';
beforeEachProviders(() => {
   Bank.clear();
});

describe('ShowBalancesComponent', () => {
  it('should be empty to start', injectAsync([ShowBalancesComponent], (tcb) => {
    return tcb.createAsync(ShowBalancesComponent).then((fixture) => {
      fixture.detectChanges();

      let compiled = fixture.debugElement.nativeElement;
      let tbody = compiled.getElementsByTagName('tbody')[0];
      let rows = tbody.getElementsByTagName('tr');

      expect(rows.length).toEqual(0);
    });
  }));

  it('should show Id column', injectAsync([ShowBalancesComponent], (tcb) => {
    return tcb.createAsync(ShowBalancesComponent).then((fixture) => {
      fixture.detectChanges();

      let compiled = fixture.debugElement.nativeElement;
      let thead = compiled.getElementsByTagName('thead')[0];
      let th = thead.getElementsByTagName('th')[0];

      expect(th.innerHTML).toEqual('Id');
    });
  }));

  it('should show Balance column', injectAsync([ShowBalancesComponent], (tcb) => {
    return tcb.createAsync(ShowBalancesComponent).then((fixture) => {
      fixture.detectChanges();

      let compiled = fixture.debugElement.nativeElement;
      let thead = compiled.getElementsByTagName('thead')[0];
      let th = thead.getElementsByTagName('th')[1];

      expect(th.innerHTML).toEqual('Balance');
    });
  }));

  it('should show expected number of accounts', injectAsync([ShowBalancesComponent], (tcb) => {
    return tcb.createAsync(ShowBalancesComponent).then((fixture) => {
      fixture.detectChanges();

      fixture.debugElement.componentInstance._bank.openAccount('account-9', 0);
      fixture.debugElement.componentInstance._bank.openAccount('account-10', 0);

      fixture.debugElement.componentInstance.refreshAccounts();

      fixture.detectChanges();

      let compiled = fixture.debugElement.nativeElement;
      let tbody = compiled.getElementsByTagName('tbody')[0];
      let trTags = tbody.getElementsByTagName('tr');

      expect(trTags.length).toEqual(2);
    });
  }));

  it('should show accountId', injectAsync([ShowBalancesComponent], (tcb) => {
    return tcb.createAsync(ShowBalancesComponent).then((fixture) => {
      fixture.detectChanges();

      fixture.debugElement.componentInstance._bank.openAccount('account-9', 0);

      fixture.debugElement.componentInstance.refreshAccounts();

      fixture.detectChanges();

      let compiled = fixture.debugElement.nativeElement;
      let tbody = compiled.getElementsByTagName('tbody')[0];
      let trTags = tbody.getElementsByTagName('tr');
      let tdTags = trTags[0].getElementsByTagName('td');

      expect(tdTags[0].innerHTML).toEqual('account-9');
    });
  }));

  it('should show balance', injectAsync([ShowBalancesComponent], (tcb) => {
    return tcb.createAsync(ShowBalancesComponent).then((fixture) => {
      fixture.detectChanges();

      fixture.debugElement.componentInstance._bank.openAccount('account-9', 123);

      fixture.debugElement.componentInstance.refreshAccounts();

      fixture.detectChanges();

      let compiled = fixture.debugElement.nativeElement;
      let tbody = compiled.getElementsByTagName('tbody')[0];
      let trTags = tbody.getElementsByTagName('tr');
      let tdTags = trTags[0].getElementsByTagName('td');

      expect(tdTags[1].innerHTML).toEqual('123');
    });
  }));

  describe('isZeroBalance', () => {
    it('should return true for zero value', () => {
      let bank = new Bank();
      let component = new ShowBalancesComponent(bank);

      let result = component.isZeroBalance(new BankAccount('account-9',firstName,email,'Saving', 0))

      expect(result).toEqual(true);
    });

    it('should return false for positive value', () => {
      let bank = new Bank();
      let component = new ShowBalancesComponent(bank);

      let result = component.isZeroBalance(new BankAccount('account-9',firstName,email,'Saving', 123))

      expect(result).toEqual(false);
    });
  });

  describe('refreshAccounts', () => {
    it('should refresh accounts', () => {
      let bank = new Bank();
      let component = new ShowBalancesComponent(bank);

      bank.openAccount('account-9',firstName,email,'Saving');

      component.refreshAccounts();

      expect(component.accounts.length).toEqual(1);
    });
  });
});
function injectAsync(arg0: (typeof ShowBalancesComponent)[], arg1: (tcb: any) => any): (done: DoneFn) => Promise<void> {
  throw new Error('Function not implemented.');
}

function beforeEachProviders(arg0: () => void) {
  throw new Error('Function not implemented.');
}

