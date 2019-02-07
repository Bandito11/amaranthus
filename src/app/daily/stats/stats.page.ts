import { MONTHS } from './../../common/constants';
import { ExportPage } from './../../export/export.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IRecord, ICalendar, ISimpleAlertOptions } from 'src/app/common/models';
import { MONTHSLABELS, YEARLABELS } from 'src/app/common/constants';
import { AmaranthusDBProvider } from 'src/app/services/amaranthus-db/amaranthus-db';
import { AlertController, ModalController } from '@ionic/angular';
import { handleError } from 'src/app/common/handleError';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  students: IRecord[] = [];
  private untouchedStudentList: IRecord[] = [];
  query: string;
  monthQuery: string;
  months: string[] = [...MONTHSLABELS];
  currentDate: Date = new Date();
  yearQuery: string;
  years: number[] = [...YEARLABELS];
  selectOptions: string[] = ['Id', 'Attendance', 'Absence', 'Date', 'Name', 'None'];
  bought: boolean;
  @ViewChild('filter') filterElement;

  constructor(
    private db: AmaranthusDBProvider,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
    this.getStudentsRecords();
    this.filterElement.value = 'None';
    this.query = '';
  }

  ngOnInit() {
    this.monthQuery = this.months[this.currentDate.getMonth()];
    this.yearQuery = this.currentDate.getFullYear().toString();
  }

  initializeStudents() {
    this.students = [...this.untouchedStudentList];
  }

  queryData(option: string) {
    this.initializeStudents();
    switch (option) {
      case 'Id':
        this.queryStudentsbyId();
        break;
      case 'Attendance':
        this.queryStudentsbyAttendance();
        break;
      case 'Absence':
        this.queryStudentsbyAbsence();
        break;
      case 'Name':
        this.queryStudentsName();
        break;
      case 'Date':
        this.query = 'Date';
        this.queryDataByYear(new Date().getFullYear());
        break;
      default:
        this.initializeStudents();
    }
  }

  queryDataByYear(year: number) {
    const date: ICalendar = {
      year: +year,
      month: this.months.indexOf(this.monthQuery) + 1,
      day: null
    };
    try {
      const response = this.db.getQueriedRecordsByDate({ date: date });
      if (response.success === true) {
        this.students = [...response.data];
      }
    } catch (error) {
      handleError(error);
    }
  }

  queryDataByMonth(month) {
    let date: ICalendar;
    const index = parseInt(MONTHS[month]);
    date = {
      year: +this.yearQuery,
      month: index + 1,
      day: null
    };
    try {
      const response = this.db.getQueriedRecordsByDate({ date: date });
      if (response.success === true) {
        this.students = [...response.data];
      }
    } catch (error) {
      handleError(error);
    }
  }

  getStudentsRecords() {
    // Will get all Students queried by today's date.
    try {
      const response = this.db.getQueriedRecords({ query: this.query });
      if (response.success === true) {
        this.students = [...response.data];
        this.untouchedStudentList = [...response.data];
      } else {
        // TODO:  implement an alert message if it fails message should say no students
        // can be retrieved.
        handleError(response.error);
      }
    } catch (error) {
      handleError(error);
    }
  }

  queryStudentsName() {
    this.students = [
      ...this.students.sort((a, b) => {
        if (a.fullName.toLowerCase() < b.fullName.toLowerCase()) {
          return -1;
        }
        if (a.fullName.toLowerCase() > b.fullName.toLowerCase()) {
          return 1;
        }
        return 0;
      })
    ];
  }

  queryStudentsbyAttendance() {
    this.students = [
      ...this.students.sort((a, b) => {
        if (a.attendance < b.attendance) {
          return 1;
        }
        if (a.attendance > b.attendance) {
          return -1;
        }
        return 0;
      })
    ];
  }

  queryStudentsbyAbsence() {
    this.students = [
      ...this.students.sort((a, b) => {
        if (a.absence < b.absence) {
          return 1;
        }
        if (a.absence > b.absence) {
          return -1;
        }
        return 0;
      })
    ];
  }

  queryStudentsbyId() {
    this.students = [
      ...this.students.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
    ];
  }

  async toExportPage() {
    const modal = await this.modalCtrl.create({
      component: ExportPage,
      componentProps: { students: this.students }
    });
    modal.present();
    modal.onDidDismiss().then(response => {
      if (response.data) {
        this.showSimpleAlert({ buttons: ['OK'], title: 'Information!', subTitle: response.data });
      }
    });
  }

  private async showSimpleAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl
      .create({
        header: options.title,
        message: options.subTitle,
        buttons: options.buttons
      });
    alert.present();
  }
}
