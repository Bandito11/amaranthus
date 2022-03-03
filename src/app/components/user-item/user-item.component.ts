import { Component, Input, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { handleError } from 'src/app/common/handleError';
import {
  ICalendar,
  IRecord,
  ISimpleAlertOptions,
  IStudent,
} from 'src/app/common/models';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
  @Input() student: IStudent & IRecord;
  @Input() htmlControls;
  @Input() homeURL;
  @Input() date: ICalendar;

  language: string;
  toggle: any;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private dbService: DatabaseService
  ) {}

  ngOnInit() {}

  addAttendance(opts: { id: string }) {
    try {
      const attended = this.dbService.addAttendance({
        date: this.date,
        id: opts.id,
      });
      let options;
      if (this.language === 'spanish') {
        options = {
          header: 'Éxito',
          message: '¡El estudiante se marcó presente!',
          buttons: ['Aprobar'],
        };
      } else {
        options = {
          header: 'Success!',
          message: 'Student was marked present!',
          buttons: ['OK'],
        };
      }
      this.showSimpleAlert(options);
      this.student.attendance = attended;
      this.student.absence = !attended;
    } catch (error) {
      handleError(error);
    }
  }

  addAbsence(opts: { id: string }) {
    try {
      const absent = this.dbService.addAbsence({
        date: this.date,
        id: opts.id,
      });
      let options;
      if (this.language === 'spanish') {
        options = {
          header: 'Éxito',
          message: '¡El estudiante se marcó ausente!',
          buttons: ['Aprobar'],
        };
      } else {
        options = {
          header: 'Success!',
          message: 'Student was marked absent!',
          buttons: ['OK'],
        };
      }
      this.showSimpleAlert(options);
      this.student.attendance = !absent;
      this.student.absence = absent;
    } catch (error) {
      handleError(error);
    }
  }

  private async showSimpleAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl.create({
      header: options.header,
      message: options.message,
      buttons: options.buttons,
    });
    alert.present();
  }

  goToProfile(id) {
    this.navCtrl.navigateForward(`${this.homeURL}/profile/${id}`);
  }

  showNotes(id) {
    if (this.toggle) {
      this.toggle = '';
    } else {
      this.toggle = id;
    }
  }

  addNotes(opts: { id: string; notes: string }) {
    const currentDate = new Date();
    const newNote = {
      ...opts,
      event: '',
      month: currentDate.getMonth(),
      day: currentDate.getDate(),
      year: currentDate.getFullYear(),
    };
    try {
      this.dbService.addNotes(newNote);
      this.student.notes = newNote.notes;
    } catch (error) {
      handleError(error);
    }
  }
}
