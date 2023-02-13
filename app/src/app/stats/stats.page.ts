import { ActivatedRoute } from '@angular/router';
import { MONTHS, MESESLABELS, MESES } from './../common/constants';
import { ExportPage } from './../export/export.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IRecord, ICalendar, IStudent } from 'src/app/common/models';
import { MONTHSLABELS, YEARLABELS } from 'src/app/common/constants';
import { IonSelect, ModalController, ToastController } from '@ionic/angular';
import { handleError } from 'src/app/common/handleError';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  @ViewChild('filter') filterElement: IonSelect;
  @ViewChild('table') tableElement: IonSelect;
  @ViewChild('year') yearElement: IonSelect;
  @ViewChild('month') monthElement: IonSelect;

  records: IRecord[];
  private initialRecords: IRecord[];

  query: string;
  monthQuery: string;
  months: string[] = [];
  currentDate: Date;
  yearQuery: string;
  years: number[];
  selectOptions: string[];
  tableOptions: string[];
  bought: boolean;
  event;
  studentIds: string[];

  htmlControls: {
    toolbar: {
      title: string;
      buttons: {
        export: string;
      };
    };
    table: string;
    filter: string;
    year: string;
    month: string;
    tableTitle: string;
    tableHeaders: {
      name: string;
      attendance: string;
      absence: string;
      percent: string;
      date: string;
    };
  };

  LANGUAGE;
  language;

  constructor(
    private dbService: DatabaseService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.currentDate = new Date();
    this.records = [];
    this.initialRecords = [];
    this.years = [...YEARLABELS];
    this.htmlControls = {
      toolbar: {
        title: '',
        buttons: {
          export: '',
        },
      },
      table: '',
      filter: '',
      year: '',
      month: '',
      tableTitle: '',
      tableHeaders: {
        name: '',
        attendance: '',
        absence: '',
        percent: '',
        date: '',
      },
    };
    this.LANGUAGE = {
      english: {
        toolbar: {
          title: 'Stats',
          buttons: {
            export: 'EXPORT',
          },
        },
        filter: 'Sort by: ',
        year: 'Year: ',
        month: 'Month: ',
        table: 'Choose table: ',
        tableTitle: 'Total Attendance in ',
        tableHeaders: {
          name: 'Name',
          attendance: 'Attendance',
          absence: 'Absence',
          percent: 'Attendance %',
          date: 'Date',
        },
      },
      spanish: {
        toolbar: {
          title: 'Estadísticas',
          buttons: {
            export: 'Exportar',
          },
        },
        filter: 'Ordenar por: ',
        year: 'Año',
        month: 'Mes',
        table: 'Escoger tabla: ',
        tableTitle: 'Asistencia Total en ',
        tableHeaders: {
          name: 'Nombre',
          attendance: 'Asistencia',
          absence: 'Ausencia',
          percent: 'Asistence %',
          date: 'Fecha',
        },
      },
    };
  }

  async ionViewWillEnter() {
    const language = await this.storage.get('language');
    language ? (this.language = language) : (this.language = 'english');
    this.htmlControls = this.LANGUAGE[this.language];
    if (this.language === 'spanish') {
      this.selectOptions = [
        // 'Id',
        'Asistencia',
        'Ausencia',
        'Fecha',
        // 'Nombre',
        'Ninguno',
      ];
      this.tableOptions = ['Total', 'Por mes'];
      this.months = MESESLABELS;
      this.filterElement.value = 'Ninguno';
    } else {
      this.selectOptions = [
        // 'Id',
        'Attendance',
        'Absence',
        'Date',
        // 'Name',
        'None',
      ];
      this.tableOptions = ['Total', 'Per Month'];
      this.months = MONTHSLABELS;
      this.filterElement.value = 'None';
    }
    this.tableElement.value = 'Total';
    this.monthQuery = this.months[this.currentDate.getMonth()];
    this.yearQuery = this.currentDate.getFullYear().toString();
    this.query = this.tableElement.value;
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

  initializeStudents() {
    this.records = this.initialRecords;
  }

  getAttendancePerDay(date: ICalendar) {
    let studentIds = [];
    if (this.studentIds.length > 0) {
      studentIds = [...this.studentIds];
    } else {
      this.records.map((record) => studentIds.push(record.id));
    }
    const { names, records } = this.dbService.getAttendancePerDay({
      date,
      studentIds: studentIds,
      event: this.event,
    });
    this.studentNames = [...names];
    this.studentRecords = [...records];
  }

  studentNames;
  studentRecords;

  getTable(option) {
    this.initializeStudents();
    this.query = '';
    switch (option) {
      case 'Total':
        this.query = 'Total';
        this.queryDataByYear(new Date().getFullYear());
        break;
      case 'Per Month':
      case 'Por mes':
        this.query = 'Monthly';
        const date:ICalendar = {
          day: this.currentDate.getDate(),
          year: this.currentDate.getFullYear(),
          month: this.currentDate.getMonth()+1
        }
        this.getAttendancePerDay(date);
        break;
    }
  }

  /**
   *
   *
   * @param {string} option
   * @memberof StatsPage
   */
  sortData(option: string) {
    this.initializeStudents();
    this.query = '';
    switch (option) {
      case 'Id':
        this.queryStudentsbyId();
        break;
      case 'Attendance':
      case 'Asistencia':
        this.sortStudentsbyAttendance();
        break;
      case 'Absence':
      case 'Ausencia':
        this.sortStudentsbyAbsence();
        break;
      case 'Name':
      case 'Nombre':
        this.queryStudentsName();
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
      day: null,
    };
    try {
      if (this.query === 'Total') {
        const records = this.dbService.getQueriedRecords({
          event: this.event,
          date: date,
          studentIds: this.studentIds,
        });
        if (records['length']) {
          this.records = [...records];
        }
      } else if (this.query === 'Monthly') {
        this.getAttendancePerDay(date);
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
    let index: number;
    if (this.language === 'spanish') {
      index = parseInt(MESES[month]);
    } else {
      index = parseInt(MONTHS[month]);
    }
    date = {
      year: +this.yearQuery,
      month: index + 1,
      day: null,
    };
    try {
      if(this.query === 'Total'){
      const records = this.dbService.getQueriedRecords({
        event: this.event,
        date: date,
        studentIds: this.studentIds,
      });
      if (records['length']) {
        this.records = [...records];
        this.monthQuery = this.months[date.month - 1];
      }} else if(this.query === 'Monthly'){
        this.getAttendancePerDay(date);
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
      const records = this.dbService.getQueriedRecords({
        event: this.event,
        studentIds: this.studentIds,
      });
      this.records = [...records];
      this.initialRecords = [...records];
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
    this.records = [
      ...this.records.sort((a, b) => {
        if (a.fullName.toLowerCase() < b.fullName.toLowerCase()) {
          return -1;
        }
        if (a.fullName.toLowerCase() > b.fullName.toLowerCase()) {
          return 1;
        }
        return 0;
      }),
    ];
  }

  /**
   *
   *
   * @memberof StatsPage
   */
  sortStudentsbyAttendance() {
    this.records = [
      ...this.records.sort((a, b) => {
        if (a.attendance < b.attendance) {
          return 1;
        }
        if (a.attendance > b.attendance) {
          return -1;
        }
        return 0;
      }),
    ];
  }

  /**
   *
   *
   * @memberof StatsPage
   */
  sortStudentsbyAbsence() {
    this.records = [
      ...this.records.sort((a, b) => {
        if (a.absence < b.absence) {
          return 1;
        }
        if (a.absence > b.absence) {
          return -1;
        }
        return 0;
      }),
    ];
  }

  /**
   *
   *
   * @memberof StatsPage
   */
  queryStudentsbyId() {
    this.records = [
      ...this.records.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      }),
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
      componentProps: { students: this.records, event: this.event },
      cssClass: 'export-modal'
    });
    await modal.present();
  }
}
