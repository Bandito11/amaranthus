import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IRecord, ICalendar, ISimpleAlertOptions } from 'src/app/common/models';
import { handleError } from 'src/app/common/handleError';
import { MONTHSLABELS, WEEKDAYSHEADER } from 'src/app/common/constants';
import { filterStudentsList } from 'src/app/common/search';
import { AlertController } from '@ionic/angular';
import { AmaranthusDBProvider } from 'src/app/services/amaranthus-db/amaranthus-db';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  currentDate: string;
  students: IRecord[];
  private unfilteredStudents: IRecord[];
  private date: ICalendar;
  timer;
  @ViewChild('notes') notesElement: ElementRef;
  @ViewChild('slidingUser') slidingUser;

  toggle: string;
  search: string;

  constructor(
    public alertCtrl: AlertController,
    public db: AmaranthusDBProvider
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.timer = 0;
    const studentInterval = setInterval(() => {
      this.getStudentsRecords(this.date);
      if (this.students.length > 0) {
        clearInterval(studentInterval);
        this.db.convertLegacyData();
      }
    }, 50);
  }

  showNotes(id) {
    if (this.toggle) {
      this.toggle = '';
    } else {
      this.toggle = id;
      setTimeout(() => {
        this.notesElement.nativeElement.focus();
      }, 0);
    }
  }
  addNotes(opts: { id: string; notes: string }) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const newNote = {
        ...opts,
        month: this.date.month,
        day: this.date.day,
        year: this.date.year
      };
      this.db.insertNotes(newNote);
      this.updateNotes(opts);
    }, 1000);
  }

  updateNotes(opts: { id: string; notes: string }) {
    const index = this.students.findIndex(student => {
      if (student.id === opts.id) {
        return true;
      }
    });
    this.students[index].notes = opts.notes;
    this.unfilteredStudents[index].notes = opts.notes;
  }

  /**
   *
   * @param {ICalendar} opts
   * Will get all Students queried by today's date.
   */
  getStudentsRecords(opts: ICalendar) {
    const date = { ...opts, month: opts.month + 1 };
    try {
      const response = this.db.getStudentsRecordsByDate({ date: date });
      if (response.success === true) {
        this.students = [...response.data];
        this.unfilteredStudents = [...response.data];
      } else {
        handleError(response.error);
      }
    } catch (error) {
      handleError(error);
    }
  }

  /**
   *
   * @param date
   */
  getDate(date: ICalendar) {
    this.search = '';
    this.date = date;
    const currentDay = date.day;
    const currentMonth = MONTHSLABELS[date.month];
    const currentYear = date.year;
    const currentWeekDay = WEEKDAYSHEADER[date.weekDay];
    this.currentDate = `${currentWeekDay}, ${currentDay} ${currentMonth}, ${currentYear}`;
    this.getStudentsRecords(date);
  }

  addAttendance(opts: { id: string }) {
    const response = this.db.addAttendance({ date: this.date, id: opts.id });
    if (response.success === true) {
      this.updateStudentAttendance({
        id: opts.id,
        absence: false,
        attendance: true
      });
      this.showSimpleAlert({
        title: 'Success!',
        subTitle: 'Student was marked present!',
        buttons: ['OK']
      });
    } else {
      handleError(response.error);
    }
  }

  addAbsence(opts: { id: string }) {
    const response = this.db.addAbsence({ date: this.date, id: opts.id });
    if (response.success === true) {
      this.updateStudentAttendance({
        id: opts.id,
        absence: true,
        attendance: false
      });
      this.showSimpleAlert({
        title: 'Success!',
        subTitle: 'Student was marked absent!',
        buttons: ['OK']
      });
    } else {
      handleError(response.error);
    }
  }

  private updateStudentAttendance(opts: { id: string; absence: boolean; attendance: boolean }) {
    this.slidingUser.close();
    const results = this.students.map(student => {
      if (student.id === opts.id) {
        return {
          ...student,
          attendance: opts.attendance,
          absence: opts.absence
        };
      } else {
        return student;
      }
    });
    this.students = [...results];
    this.unfilteredStudents = [...results];
  }

  private async showSimpleAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl.create({
      header: options.title,
      message: options.subTitle,
      buttons: options.buttons
    });
    await alert.present();
  }

  searchStudent() {
    const query = this.search;
    query ? this.filterStudentsList(query) : this.initializeStudentsList();
  }

  private initializeStudentsList() {
    this.students = [...this.unfilteredStudents];
  }

  private filterStudentsList(query: string) {
    const students = <any>this.unfilteredStudents;
    this.students = <any>filterStudentsList({ query: query, students: students });
  }

}
