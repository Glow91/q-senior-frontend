import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { auditTime, Subject, Subscription } from 'rxjs';
import { SecuritiesFilter } from 'src/app/models/securitiesFilter';


@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit, OnDestroy {
  @Output()
  filterChanged = new EventEmitter<SecuritiesFilter>();

  currencyForm = new FormControl();
  currencyList = ['EUR', 'USD', 'GBP'];
  typeForm = new FormControl();
  typeList = ['Equity', 'Closed-endFund', 'BankAccount', 'DirectHolding', 'Generic', 'Collectible', 'Loan', 'RealEstate', 'Collectible'];
  searchForm = new FormControl();

  filter: SecuritiesFilter = {
    currencies: this.currencyList,
    types: this.typeList,
  }

  // Observable to debounce selections, time could be passed via input or injectable options
  private _debounce$ = new Subject<void>();
  private _subscription: Subscription;

  ngOnInit(): void {
    this._subscription = this._debounce$.pipe(auditTime(2000)).subscribe(() => {
      this.filterChanged.emit(this.filter);
    })
    this.currencyForm.setValue(this.filter.currencies);
    this.typeForm.setValue(this.filter.types);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  currencyChanged(e: string[]) {
    this.filter = {
      ...this.filter,
      currencies: e,
    };    
    this._debounce$.next();
  }

  typesChanged(e: string[]) {
    this.filter = {
      ...this.filter,
      types: e,
    };  
    this._debounce$.next();
  }

  searchChanged() {
    this.filter = {
      ...this.filter,
      name: this.searchForm.value,
    };
    this.filterChanged.emit(this.filter);
  }
}
