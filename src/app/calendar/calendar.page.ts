import { MESESLABELS, DIASHEADER } from './../common/constants';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IRecord, ICalendar } from 'src/app/common/models';
import { handleError } from 'src/app/common/handleError';
import { MONTHSLABELS, WEEKDAYSHEADER } from 'src/app/common/constants';
import { filterStudentsList } from 'src/app/common/search';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
  @ViewChild('notes', { static: true }) notesElement: ElementRef;

  currentDate: string;
  students: IRecord[];
  homeURL = '/tabs/tabs/calendar';
  private unfilteredStudents: IRecord[];
  private date: ICalendar;
  timer;

  toggle: string;
  search: string;
  event;
  studentIds: string[];
  language;
  htmlControls = {
    attended: '',
    absence: '',
    present: ``,
    absent: '',
    class: '',
    phone: '',
    toolbar: {
      title: '',
    },
    name: '',
    ofile: '',
  };

  LANGUAGE = {
    spanish: {
      profile: 'Perfil',
      attended: 'Asistió',
      absence: 'Ausente',
      present: ` está presente hoy.`,
      absent: ' está ausente hoy.',
      class: 'Clase: ',
      phone: 'Teléfono: ',
      toolbar: {
        title: 'Calendario',
      },
      name: 'Nombre: ',
    },
    english: {
      profile: 'Profile',
      attended: 'Attended',
      absence: 'Absent',
      present: `'s is present today!`,
      absent: `'s is absent today`,
      class: 'Class: ',
      phone: 'Phone: ',
      toolbar: {
        title: 'Calendar',
      },
      name: 'Name: ',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    private db: DatabaseService
  ) {}

  ionViewWillEnter() {
    this.timer = 0;
    this.storage.get('language').then((value) => {
      if (value) {
        this.language = value;
      } else {
        this.language = 'english';
      }
      this.htmlControls = this.LANGUAGE[this.language];
    });
    this.event = this.route.snapshot.paramMap.get('event');
    if (!this.event) {
      this.event = '';
    }
    try {
      this.studentIds = this.route.snapshot.paramMap.get('ids').split(',');
    } catch (error) {
      this.studentIds = [];
    }
    this.getStudentsRecords(this.date);
  }

  /**
   *
   * @param {ICalendar} opts
   * Will get all Students queried by today's date.
   */
  getStudentsRecords(opts: ICalendar) {
    const date = {
      ...opts,
      month: opts.month + 1,
    };
    this.students = [];
    this.unfilteredStudents = [];
    try {
      const records = this.db.getStudentsRecordsByDate({
        date: date,
        event: this.event,
      });
      if (this.studentIds.length > 0) {
        let list = [];
        for (const id of this.studentIds) {
          const found = records.find((student) => id === student.id);
          if (found) {
            list = [...list, found];
          }
        }
        this.students = list;
        this.unfilteredStudents = list;
      } else {
        this.students = records;
        this.unfilteredStudents = records;
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
    const currentYear = date.year;
    if (this.language === 'spanish') {
      const currentMonth = MESESLABELS[date.month];
      const currentWeekDay = DIASHEADER[date.weekDay];
      this.currentDate = `${currentWeekDay} ${currentDay} de ${currentMonth} de ${currentYear}`;
    } else {
      const currentMonth = MONTHSLABELS[date.month];
      const currentWeekDay = WEEKDAYSHEADER[date.weekDay];
      this.currentDate = `${currentWeekDay}, ${currentDay} ${currentMonth}, ${currentYear}`;
    }
    this.getStudentsRecords(date);
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
    this.students = <any>(
      filterStudentsList({ query: query, students: students })
    );
  }
}
