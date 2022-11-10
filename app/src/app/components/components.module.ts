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
import { NotesComponent } from './notes/notes.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    LoaderComponent,
    GobackComponent,
    CalendarComponent,
    CancelComponent,
    UserItemComponent,
    StudentFormComponent,
    EventFormComponent,
    EventStudentsListComponent,
    NotesComponent,
  ],
  imports: [IonicModule, CommonModule, FormsModule, ScrollingModule],
  exports: [
    LoaderComponent,
    GobackComponent,
    CalendarComponent,
    CancelComponent,
    UserItemComponent,
    StudentFormComponent,
    EventFormComponent,
    EventStudentsListComponent,
    NotesComponent,
  ],
})
export class ComponentsModule {}
