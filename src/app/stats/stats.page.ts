import { ActivatedRoute } from '@angular/router';
import { MONTHS, MESESLABELS } from './../common/constants';
import { ExportPage } from './../export/export.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IRecord, ICalendar, ISimpleAlertOptions } from 'src/app/common/models';
import { MONTHSLABELS, YEARLABELS } from 'src/app/common/constants';
import { AmaranthusDBProvider } from 'src/app/services/amaranthus-db/amaranthus-db';
import { AlertController, ModalController } from '@ionic/angular';
import { handleError } from 'src/app/common/handleError';
import { Storage } from '@ionic/storage';

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
  months: string[] = [];
  currentDate: Date = new Date();
  yearQuery: string;
  years: number[] = [...YEARLABELS];
  selectOptions: string[];
  bought: boolean;
  @ViewChild('filter') filterElement;
  event;
  studentIds: string[];
  htmlControls = {
    toolbar: {
      title: '',
      buttons: {
        export: ''
      }
    },
    filter: '',
    year: '',
    month: '',
    tableTitle: '',
    tableHeaders: {
      name: '',
      attendance: '',
      absence: '',
      percent: ''
    }
  };

  LANGUAGE = {
    english: {
      toolbar: {
        title: 'Stats',
        buttons: {
          export: 'EXPORT'
        }
      },
      filter: 'Filter by: ',
      year: 'Year: ',
      month: 'Month: ',
      tableTitle: 'Total Attendance in ',
      tableHeaders: {
        name: 'Name',
        attendance: 'Attendance',
        absence: 'Absence',
        percent: 'Attendance %'
      }
    },
    spanish: {
      toolbar: {
        title: 'Estadísticas',
        buttons: {
          export: 'Exportar'
        }
      },
      filter: 'Filtrar por: ',
      year: 'Año',
      month: 'Mes',
      tableTitle: 'Asistencia Total en ',
      tableHeaders: {
        name: 'Nombre',
        attendance: 'Asistencia',
        absence: 'Ausencia',
        percent: 'Asistence %'
      }
    }
  };
  language;

  constructor(
    private db: AmaranthusDBProvider,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private storage: Storage
  ) { }

  ionViewWillEnter() {
    this.storage.get('language').then(value => {
      if (value) {
        this.language = value;
      } else {
        this.language = 'english';
      }
      this.htmlControls = this.LANGUAGE[this.language];
      if (this.language === 'spanish') {
        this.filterElement.value = 'Sin filtro';
        this.selectOptions = ['Id', 'Asistencia', 'Ausencia', 'Fecha', 'Nombre', 'Sin filtro'];
        this.months = MESESLABELS;
      } else {
        this.selectOptions = ['Id', 'Attendance', 'Absence', 'Date', 'Name', 'None'];
        this.filterElement.value = 'None';
        this.months = MESESLABELS;
        this.months = MONTHSLABELS;
      }
      this.monthQuery = this.months[this.currentDate.getMonth()];
      this.yearQuery = this.currentDate.getFullYear().toString();
    });
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
    this.students = [];
    this.unfilteredStudents = [];
  }

  initializeStudents() {
    this.students = this.unfilteredStudents;
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
      case 'Asistencia':
        this.queryStudentsbyAttendance();
        break;
      case 'Absence':
      case 'Ausencia':
        this.queryStudentsbyAbsence();
        break;
      case 'Name':
      case 'Nombre':
        this.queryStudentsName();
        break;
      case 'Date':
      case 'Fecha':
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
          let list = [];
          for (const id of this.studentIds) {
            const found = response.data.find(student => id === student.id);
            if (found) {
              list = [...list, found];
            }
          }
          this.students = list;
          this.unfilteredStudents = list;
        } else {
          this.students = response.data;
          this.unfilteredStudents = response.data;
        }
      } else {
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
          if (this.language === 'spanish') {
            this.showSimpleAlert({
              buttons: ['OK'],
              header: '¡Información!',
              message: response.data
            });
          } else {
            this.showSimpleAlert({
              buttons: ['OK'],
              header: 'Information!',
              message: response.data
            });
          }
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
