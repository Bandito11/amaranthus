import { MenuButtonComponent } from './menu-button/menu-button.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoaderComponent } from './loader/loader.component';
import { NgModule } from '@angular/core';
import { GobackComponent } from './goback/goback.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CancelComponent } from './cancel/cancel.component';
import { UserItemComponent } from './user-item/user-item.component';

@NgModule({
  declarations: [
    LoaderComponent,
    GobackComponent,
    CalendarComponent,
    CancelComponent,
    MenuButtonComponent,
    UserItemComponent,
  ],
  imports: [IonicModule, CommonModule],
  exports: [
    LoaderComponent,
    GobackComponent,
    CalendarComponent,
    CancelComponent,
    MenuButtonComponent,
    UserItemComponent,
  ],
})
export class ComponentsModule {}
