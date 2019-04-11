import { ActivatedRoute } from '@angular/router';
import { MONTHS } from './../common/constants';
import { ExportPage } from './../export/export.page';
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
  students: IRecord[];
  private unfilteredStudents: IRecord[] = [];
  query: string;
  monthQuery: string;
  months: string[] = [...MONTHSLABELS];
  currentDate: Date = new Date();
  yearQuery: string;
  years: number[] = [...YEARLABELS];
  selectOptions: string[] = ['Id', 'Attendance', 'Absence', 'Date', 'Name', 'None'];
  bought: boolean;
  @ViewChild('filter') filterElement;
  event;
  studentIds: string[];

  constructor(
    private db: AmaranthusDBProvider,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter() {
    this.filterElement.value = 'None';
    this.query = '';
    this.event = this.route.snapshot.paramMap.get('event');
    if (!this.event) {
      this.event = '';
    }
    try {
      this.studentIds = this.route.snapshot.paramMap.get('ids').split(',');
    } catch (error) {
      this.studentIds = [];
    }
    this.getStudentsRecords();
  }

  ngOnInit() {
    this.monthQuery = this.months[this.currentDate.getMonth()];
    this.yearQuery = this.currentDate.getFullYear().toString();
    this.students = [];
    this.unfilteredStudents = [];
  }

  initializeStudents() {
    this.students = [...this.unfilteredStudents];
  }

  /**
   *
   *
   * @param {string} option
   * @memberof StatsPage
   */
  queryData(option: string) {
    this.initializeStudents();
    this.query = '';
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

  /**
   *
   *
   * @param {number} year
   * @memberof StatsPage
   */
  queryDataByYear(year: number) {
    const date: ICalendar = {
      year: +year,
      month: this.months.indexOf(this.monthQuery) + 1,
      day: null
    };
    try {
      const response = this.db.getQueriedRecordsByDate({ event: this.event, date: date });
      if (response.success === true) {
        this.students = [...response.data];
      }
    } catch (error) {
      handleError(error);
    }
  }

  /**
   *
   *
   * @param {*} month
   * @memberof StatsPage
   */
  queryDataByMonth(month) {
    let date: ICalendar;
    const index = parseInt(MONTHS[month]);
    date = {
      year: +this.yearQuery,
      month: index + 1,
      day: null
    };
    try {
      const response = this.db.getQueriedRecordsByDate({ event: this.event, date: date });
      if (response.success === true) {
        this.students = [...response.data];
      }
    } catch (error) {
      handleError(error);
    }
  }

  /**
   *
   *
   * @memberof StatsPage
   */
  getStudentsRecords() {
    try {
      const response = this.db.getQueriedRecords({ event: this.event, query: this.query });
      if (response.success === true) {
        if (this.studentIds.length > 0) {
          for (const id of this.studentIds) {
            this.students = [...this.students, response.data.find(student => id === student.id)];
          }
          this.unfilteredStudents = [...this.students];
        } else {
          this.students = [...response.data];
          this.unfilteredStudents = [...response.data];
        }
      } else {
        // TODO:  implement an alert message if it fails message should say no students
        // can be retrieved.
        handleError(response.error);
      }
    } catch (error) {
      handleError(error);
    }
  }

  /**
   *
   *
   * @memberof StatsPage
   */
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

  /**
   *
   *
   * @memberof StatsPage
   */
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

  /**
   *
   *
   * @memberof StatsPage
   */
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

  /**
   *
   *
   * @memberof StatsPage
   */
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

  /**
   *
   *
   * @memberof StatsPage
   */
  async toExportPage() {
    const modal = await this.modalCtrl.create({
      component: ExportPage,
      componentProps: { students: this.students }
    });
    modal.present();
    modal.onDidDismiss().then(response => {
      try {
        if (response.data) {
          this.showSimpleAlert({
            buttons: ['OK'],
            header: 'Information!',
            message: response.data
          });
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  /**
   *
   *
   * @private
   * @param {ISimpleAlertOptions} options
   * @memberof StatsPage
   */
  private async showSimpleAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl
      .create({
        header: options.header,
        message: options.message,
        buttons: options.buttons
      });
    alert.present();
  }
}
