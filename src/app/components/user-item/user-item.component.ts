import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { handleError } from 'src/app/common/handleError';
import { ICalendar, IRecord, IStudent } from 'src/app/common/models';
import { DatabaseService } from 'src/app/services/database.service';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {
  @Input() student: IStudent & IRecord;
  @Input() htmlControls;
  @Input() homeURL;
  @Input() date: ICalendar;

  language: string;
  toggle: any;

  constructor(
    private toastController: ToastController,
    private navCtrl: NavController,
    private dbService: DatabaseService,
    public sanitizer: DomSanitizer,
    public modalCtrl: ModalController
  ) {}

  async addAttendance(opts: { id: string }) {
    try {
      const attended = this.dbService.addAttendance({
        date: this.date,
        id: opts.id,
      });
      let message;
      if (this.language === 'spanish') {
        message = '¡El estudiante se marcó presente!';
      } else {
        message = 'Student was marked present!';
      }
      const toast = await this.toastController.create({
        message,
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();
      this.student.attendance = attended;
      this.student.absence = !attended;
    } catch (error) {
      handleError(error);
    }
  }

  async addAbsence(opts: { id: string }) {
    try {
      const absent = this.dbService.addAbsence({
        date: this.date,
        id: opts.id,
      });
      let message;
      if (this.language === 'spanish') {
        message = '¡El estudiante se marcó ausente!';
      } else {
        message = 'Student was marked absent!';
      }
      const toast = await this.toastController.create({
        message,
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();
      this.student.attendance = !absent;
      this.student.absence = absent;
    } catch (error) {
      handleError(error);
    }
  }

  goToProfile(id) {
    this.navCtrl.navigateForward(`${this.homeURL}/profile/${id}`);
  }

  async showNotes(id: string, notes: string) {
    const modal = await this.modalCtrl.create({
      component: NotesComponent,
      componentProps: {
        id,
        notes,
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.student.notes = data.notes;
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
