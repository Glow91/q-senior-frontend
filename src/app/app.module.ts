import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterableTableComponent } from './components/filterable-table/filterable-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { SecuritiesListComponent } from './components/securities-list/securities-list.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FilterableTableComponent,
    SecuritiesListComponent,
    FilterBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
