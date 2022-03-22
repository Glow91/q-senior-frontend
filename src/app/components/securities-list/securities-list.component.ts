import { Component, OnInit } from '@angular/core';
import { Security } from "../../models/security";
import { BehaviorSubject, Observable } from "rxjs";
import { indicate } from "../../utils";
import { SecurityService } from "../../services/security.service";
import { SecuritiesFilter } from 'src/app/models/securitiesFilter';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'securities-list',
  templateUrl: './securities-list.component.html',
  styleUrls: ['./securities-list.component.scss']
})
export class SecuritiesListComponent implements OnInit {
  public displayedColumns: string[] = ["name", "type", "currency"];

  public securities$: Observable<Security[]>;
  public securitiesLength$: Observable<number>;
  public loadingSecurities$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public pageSizeOptions = [5, 10, 25, 50];

  private _filterObject = {
    skip: 0,
    limit: this.pageSizeOptions[1],
  };

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this._updateSecurities();
  }

  filterChanged(e: SecuritiesFilter) {
    this._filterObject = {
      ...this._filterObject,
      ...e,
    };
    this._updateSecurities();
  }

  private _updateSecurities(): void {
    this.securities$ = this.securityService.getSecurities(this._filterObject)
    .pipe(indicate(this.loadingSecurities$));

    this.securitiesLength$ = this.securityService.getSecuritiesLength(this._filterObject);
  }

  // Simple pagination
  onPageChanged(e: PageEvent) {
    this._filterObject = {
      ...this._filterObject,
      skip: e.pageIndex * e.pageSize,
      limit: e.pageIndex * e.pageSize + e.pageSize
    };
    this._updateSecurities();
  }
}
