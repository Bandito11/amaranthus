import { MenuButtonComponent } from './menu-button/menu-button.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoaderComponent } from './loader/loader.component';
import { NgModule } from '@angular/core';
import { GobackComponent } from './goback/goback.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CancelComponent } from './cancel/cancel.component';
import { UserItemComponent } from './user-item/user-item.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { FormsModule } from '@angular/forms';
import { EventFormComponent } from './event-form/event-form.component';
import { EventStudentsListComponent } from './event-students-list/event-students-list.component';

@NgModule({
  declarations: [
    LoaderComponent,
    GobackComponent,
    CalendarComponent,
    CancelComponent,
    MenuButtonComponent,
    UserItemComponent,
    StudentFormComponent,
    EventFormComponent,
    EventStudentsListComponent
  ],
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [
    LoaderComponent,
    GobackComponent,
    CalendarComponent,
    CancelComponent,
    MenuButtonComponent,
    UserItemComponent,
    StudentFormComponent,
    EventFormComponent,
    EventStudentsListComponent
  ],
})
export class ComponentsModule {}
