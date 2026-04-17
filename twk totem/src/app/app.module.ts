import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { DefaultComponent } from './demo/dashboard/default/default.component';
import { AppService } from './app.service';
import { environment } from 'src/environments/environment';


@NgModule({
    declarations: [],
    imports: [CommonModule, ScheduleModule, BrowserModule, DefaultComponent],
    providers: [AppService]
})
export class AppModule { }