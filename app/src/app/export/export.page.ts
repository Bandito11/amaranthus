import { Component } from '@angular/core';
import {
  LoadingController,
  ModalController,
  Platform,
  PlatformConfig,
  ToastController,
} from '@ionic/angular';
import { CSVProvider } from '../providers/csv/csv';
import { TextTabDelimitedProvider } from '../providers/text-tab-delimited/text-tab-delimited';
import { FileProvider } from '../providers/file/file';
import { XLSXProvider } from '../providers/xslx/xslx';
import { recordType } from '../common/constants';
import { handleError } from '../common/handleError';
import { ICalendar } from '../common/models';
import { addZeroInFront } from '../common/validation';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage {
  language;
  htmlControls: {
    toolbar: {
      title: string;
    };
    header: string;
    month: string;
    day: string;
    perMonth: string;
    date: string;
    texttab: string;
    csv: string;
    xlsx: string;
  };
  LANGUAGE;
  students = [];
  event: string;
  date: string;
  dateControl;
  recordsPerMonth: { names: any[]; records: any[] };

  constructor(
    private platform: Platform,
    private loading: LoadingController,
    private modal: ModalController,
    private csv: CSVProvider,
    private textTab: TextTabDelimitedProvider,
    private file: FileProvider,
    private xlsx: XLSXProvider,
    private dbService: DatabaseService,
    private storage: Storage,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.dateControl = 'perMonth';
    this.htmlControls = {
      toolbar: {
        title: '',
      },
      header: '',
      month: '',
      day: '',
      perMonth: '',
      date: '',
      texttab: '',
      csv: '',
      xlsx: '',
    };
    this.LANGUAGE = {
      spanish: {
        toolbar: {
          title: 'Exportar',
        },
        header: 'Escoje como exportar la data',
        month: 'Asistencia total por mes: ',
        day: 'Asistencia total por día: ',
        perMonth: 'Asistencia por mes: ',
        date: 'Fecha: ',
        texttab: 'Exportar como texto delimitado',
        csv: 'Exportar como CSV',
        xlsx: 'Exportar como XLSX',
      },
      english: {
        toolbar: {
          title: 'Export',
        },
        header: 'Choose how to export your data',
        month: 'Total attendance per month: ',
        day: 'Total attendace per day: ',
        perMonth: 'Attendance per month: ',
        date: 'Date',
        texttab: 'Export as Text Tab Delimited',
        csv: 'Export as CSV',
        xlsx: 'Export as XLSX',
      },
    };
  }

  ionViewWillEnter() {
    this.storage.get('language').then((value) => {
      if (value) {
        this.htmlControls = this.LANGUAGE[value];
        this.language = value;
      } else {
        this.language = 'english';
        this.htmlControls = this.LANGUAGE['english'];
      }
    });
    const date = new Date();
    this.date = `${date.getFullYear()}-${addZeroInFront(
      date.getMonth() + 1
    )}-${addZeroInFront(date.getDate())}`;
    if (!this.event) {
      this.event = '';
    }
  }

  async successMessage() {
    let message;
    const android = this.platform.is('android');
    if (this.language === 'spanish') {
      if (android) {
        message = `¡El archivo ha sido creado en Android/data/xyz.attendancelog.amaranthus/files/!`;
      } else {
        message = `¡El archivo ha sido creado!`;
      }
    } else {
      if (android) {
        message = `The file was created in Android/data/xyz.attendancelog.amaranthus/files/!`;
      } else {
        message = `The file was created!`;
      }
    }
    const toast = await this.toastController.create({
      message,

      duration: 1000,
      color: 'success',
      position: 'top',
    });
    await toast.present();
    return;
  }

  /**
   *
   *
   * @memberof ExportPage
   */
  async exportAsXLSX() {
    let xlsxData;
    let message = 'Creating the File...';
    if (this.dateControl === 'month' || this.dateControl === 'perMonth') {
      this.date = this.date.slice(0, 7);
    }
    const fileName = `AttendanceLog-${this.date}.xlsx`;
    this.getRecordsByDate(this.date);
    if (this.language === 'spanish') {
      message = 'Creando el archivo...';
    }
    const loading = await this.loading.create({
      message: message,
    });
    await loading.present();
    try {
      if (this.dateControl === 'perMonth') {
        xlsxData = await this.xlsx.exportAttendancePerMonth({
          type: recordType.perMonth,
          data: this.recordsPerMonth,
          fileName: fileName,
        });
      }
      if (this.dateControl === 'month') {
        xlsxData = await this.xlsx.exportXLSXToFile({
          type: recordType.month,
          records: this.students,
          fileName: fileName,
        });
      }
      if (this.dateControl === 'day') {
        xlsxData = await this.xlsx.exportXLSXToFile({
          type: recordType.day,
          records: this.students,
          fileName: fileName,
        });
      }
      if (xlsxData) {
        await this.file.exportFile({
          fileName: fileName,
          data: xlsxData,
          type: 'xlsx',
        });
        await loading.dismiss();
        this.successMessage();
        await this.modal.dismiss();
        return;
      }
      await loading.dismiss();
      await this.modal.dismiss();
      handleError('Error creating the file');
    } catch (error) {
      // If XLSX Provider err
      await loading.dismiss();
      let message;
      if (this.language === 'spanish') {
        message =
          'Hubo un error creando el archivo. ¡Por favor vuelva a crear el archivo!';
      } else {
        message = `There was an error while creating the file. Please try again later!`;
      }
      handleError(message);
    }
  }

  /**
   *
   *
   * @memberof ExportPage
   */
  async exportAsText() {
    let textTabResponse;
    if (this.dateControl === 'month') {
      this.date = this.date.slice(0, 7);
    }
    const fileName = `AttendanceLog-${this.date}.txt`;
    this.getRecordsByDate(this.date);
    let message = 'Creating the File...';
    if (this.language === 'spanish') {
      message = 'Creando el archivo...';
    }
    const loading = await this.loading.create({
      message: message,
    });
    await loading.present();
    try {
      if (this.dateControl === 'perMonth') {
        textTabResponse = await this.textTab.exportAttendancePerMonth({
          type: recordType.perMonth,
          data: this.recordsPerMonth,
          fileName: fileName,
        });
      }
      if (this.dateControl === 'month') {
        textTabResponse = await this.textTab.exportTextTabDelimited({
          type: recordType.month,
          records: this.students,
          fileName,
        });
      }
      if (this.dateControl === 'day') {
        textTabResponse = await this.textTab.exportTextTabDelimited({
          type: recordType.day,
          records: this.students,
          fileName,
        });
      }
      if (textTabResponse) {
        await this.file.exportFile({
          fileName: fileName,
          data: textTabResponse,
          type: 'txt',
        });
        await loading.dismiss();
        this.successMessage();
        await this.modal.dismiss();
        return;
      }
      await loading.dismiss();
      handleError('Error creating the file: ' + textTabResponse);
    } catch (error) {
      // If TextTabDelimited Provider err
      handleError(error);
      await loading.dismiss();
      let message;
      if (this.language === 'spanish') {
        message = `Hubo un error creando el archivo. ¡Por favor vuelva a crear el archivo!`;
      } else {
        message = `There was an error while creating the file. Please try again later!`;
      }
      const toast = await this.toastController.create({
        message,
        duration: 1000,
        color: 'success',
        position: 'top',
      });
      await toast.present();
      await this.modal.dismiss();
    }
  }

  /**
   *
   *
   * @returns
   * @memberof ExportPage
   */
  async exportAsCSV() {
    let csvResponse;
    if (this.dateControl === 'month') {
      this.date = this.date.slice(0, 7);
    }
    const fileName = `AttendanceLog-${this.date}.csv`;
    this.getRecordsByDate(this.date);
    let message = 'Creating the File...';
    if (this.language === 'spanish') {
      message = 'Creando el archivo...';
    }
    const loading = await this.loading.create({
      message: message,
    });
    await loading.present();
    try {
      if (this.dateControl === 'perMonth') {
        csvResponse = await this.csv.exportAttendancePerMonth({
          type: recordType.perMonth,
          data: this.recordsPerMonth,
          fileName: fileName,
        });
      }
      if (this.dateControl === 'month') {
        csvResponse = await this.csv.exportCSV({
          type: recordType.month,
          records: this.students,
          fileName,
        });
      }
      if (this.dateControl === 'day') {
        csvResponse = await this.csv.exportCSV({
          type: recordType.day,
          records: this.students,
          fileName,
        });
      }
      if (csvResponse) {
        await this.file.exportFile({
          fileName: fileName,
          data: csvResponse,
          type: 'csv',
        });
        await loading.dismiss();
        this.successMessage();
        await this.modal.dismiss();
        return;
      }
      this.modal.dismiss();
      await loading.dismiss();
      handleError('Error creating the file');
    } catch (error) {
      // If CSV Provider err
      await loading.dismiss();
      if (this.language === 'spanish') {
        this.modal.dismiss(
          'Hubo un error creando el archivo. ¡Por favor vuelva a crear el archivo!'
        );
      } else {
        this.modal.dismiss(
          'There was an error while creating the file. Please try again later!'
        );
      }
    }
  }

  /**
   *
   *
   * @param {{ query: string; date: string }} opts
   * @memberof ExportPage
   */
  getRecordsByDate(date: string) {
    try {
      const dateVal = date.split('-');
      let localDate: ICalendar;
      if (dateVal.length === 2) {
        localDate = {
          year: parseInt(dateVal[0]),
          month: parseInt(dateVal[1]),
          day: null,
        };
      } else {
        localDate = {
          year: parseInt(dateVal[0]),
          month: parseInt(dateVal[1]),
          day: parseInt(dateVal[2]),
        };
      }
      if (this.dateControl === 'perMonth') {
        const students = this.dbService.getAllStudentsRecords({
          event: this.event,
          date: localDate,
        });
        const studentIds = students.map((student) => student.id);
        this.recordsPerMonth = this.dbService.getAttendancePerDay({
          date: localDate,
          studentIds,
          event: this.event,
        });
        return;
      }
      const records = this.dbService.getQueriedRecords({
        event: this.event,
        date: localDate,
      });
      if (records['length']) {
        this.students = [...records];
      } else {
        handleError(`No records were found`);
      }
    } catch (error) {
      handleError(error);
    }
  }
}
