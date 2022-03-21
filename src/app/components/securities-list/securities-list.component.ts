import { Component, OnInit } from '@angular/core';
import { Security } from "../../models/security";
import { BehaviorSubject, Observable } from "rxjs";
import { indicate } from "../../utils";
import { SecurityService } from "../../services/security.service";
import { SecuritiesFilter } from 'src/app/models/securitiesFilter';

@Component({
  selector: 'securities-list',
  templateUrl: './securities-list.component.html',
  styleUrls: ['./securities-list.component.scss']
})
export class SecuritiesListComponent implements OnInit {
  public displayedColumns: string[] = ["name", "type", "currency"];

  public securities$: Observable<Security[]>;
  public loadingSecurities$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _filterObject = {};

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this._updateSecurities();
  }

  filterChanged(e: SecuritiesFilter) {
    this._filterObject = e;
    this._updateSecurities();
  }

  private _updateSecurities(): void {
    this.securities$ = this.securityService.getSecurities(this._filterObject)
    .pipe(indicate(this.loadingSecurities$));
  }

}
