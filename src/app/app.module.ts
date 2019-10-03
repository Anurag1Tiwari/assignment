import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatCardModule , MatListModule, MatButtonModule , MatFormFieldModule} from  '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material'
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule, MatTableModule,
    MatToolbarModule, MatIconModule, MatCardModule , MatListModule, MatButtonModule, MatGridListModule, MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
