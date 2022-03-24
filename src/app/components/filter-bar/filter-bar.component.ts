import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { auditTime, Subject, Subscription } from 'rxjs';
import { SecuritiesFilter } from 'src/app/models/securitiesFilter';

export interface FilterBarConfig {
  showNameFilter: boolean;
  showCurrencyFilter: boolean;
  showTypeFilter: boolean;
  showPrivateFilter: boolean;
}

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit, OnDestroy {
  @Input()
  config: FilterBarConfig = {
    showNameFilter: true,
    showCurrencyFilter: true,
    showTypeFilter: true,
    showPrivateFilter: true,
  }

  @Output()
  filterChanged = new EventEmitter<SecuritiesFilter>();

  public currencyForm = new FormControl();
  // Maybe the backend can provide a cheap request to get these choises depending on available datas
  public currencyList = ['EUR', 'USD', 'GBP'];
  public typeForm = new FormControl();
  public typeList = ['Equity', 'Closed-endFund', 'BankAccount', 'DirectHolding', 'Generic', 'Collectible', 'Loan', 'RealEstate', 'Collectible'];
  public searchForm = new FormControl();

  public filter: SecuritiesFilter = {
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

  toggleChanged(e: MatRadioChange) {
    let isPrivate: boolean;
    switch (e.value) {
      case '1':
        isPrivate = true;
        break;
      case '2':
        isPrivate = false;
        break;
      default:
        isPrivate = undefined;
        break;
    }
    this.filter = {
      ...this.filter,
      isPrivate,
    }
    this.filterChanged.emit(this.filter);
  }
}
