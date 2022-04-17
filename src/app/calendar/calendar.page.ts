import { MESESLABELS, DIASHEADER } from './../common/constants';
import { Component } from '@angular/core';
import { IRecord, ICalendar } from 'src/app/common/models';
import { handleError } from 'src/app/common/handleError';
import { MONTHSLABELS, WEEKDAYSHEADER } from 'src/app/common/constants';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
  currentDate: string;
  students: IRecord[];
  homeURL ;
  date: ICalendar;
  timer;
  toggle: string;
  event;
  studentIds: string[];
  language;
  htmlControls: {
    attended: string;
    absence: string;
    present: string;
    absent: string;
    class: string;
    phone: string;
    toolbar: {
      title: string;
    };
    name: string;
    profile: string;
  };
  LANGUAGE: {
    spanish: {
      profile: string;
      attended: string;
      absence: string;
      present: string;
      absent: string;
      class: string;
      phone: string;
      toolbar: { title: string; profile: string };
      name: string;
    };
    english: {
      profile: string;
      attended: string;
      absence: string;
      present: string;
      absent: string;
      class: string;
      phone: string;
      toolbar: { title: string; profile: string };
      name: string;
    };
  };

  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    private dbService: DatabaseService
  ) {
    this.homeURL = '/tabs/tabs/calendar'
    this.LANGUAGE = {
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
          profile: 'Perfil',
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
          profile: 'Profile',
        },
        name: 'Name: ',
      },
    };

    this.htmlControls = this.LANGUAGE['english'];
  }

  async ionViewWillEnter() {
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
    await this.getStudentsRecords(this.date);
  }

  /**
   *
   * @param {ICalendar} opts
   * Will get all Students queried by today's date.
   */
  async getStudentsRecords(opts: ICalendar) {
    const date = {
      ...opts,
      month: opts.month + 1,
    };
    this.students = [];
    try {
      const records = await this.dbService.getStudentsRecordsByDate({
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
      } else {
        this.students = records;
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

  async searchStudent(event) {
    const query = event.target.value;
    query
      ? (this.students = [
          ...(await this.dbService.getStudentWithRecord({
            query,
            date: this.date,
          })),
        ])
      : this.getStudentsRecords(this.date);
  }
}
