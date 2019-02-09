import { Routes, RouterModule } from '@angular/router';
import { EventProfilePage } from './eventprofile.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { CalendarPageModule } from '../calendar/calendar.module';


const routes: Routes = [
  {
    path: '',
    component: EventProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventProfilePage]
})
export class EventProfilePageModule { }
