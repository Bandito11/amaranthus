import { AmaranthusDBProvider } from '../repositories/amaranthus-db/amaranthus-db';
import { Component } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { CSVProvider } from '../providers/csv/csv';
import { TextTabDelimitedProvider } from '../providers/text-tab-delimited/text-tab-delimited';
import { FileProvider } from '../providers/file/file';
import { XLSXProvider } from '../providers/xslx/xslx';
import { recordType } from '../common/constants';
import { handleError } from '../common/handleError';
import { ActivatedRoute } from '@angular/router';
import { ICalendar } from '../common/models';
import { addZeroInFront } from '../common/validation';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage {
  language;
  htmlControls = {
    toolbar: {
      title: '',
    },
    header: '',
    month: '',
    day: '',
    date: '',
    texttab: '',
    csv: '',
    xlsx: '',
  };
  LANGUAGE = {
    spanish: {
      toolbar: {
        title: 'Exportar',
      },
      header: 'Escoje la fecha',
      month: 'Por mes: ',
      day: 'Por día: ',
      date: 'Fecha: ',
      texttab: 'Exportar como texto delimitado',
      csv: 'Exportar como CSV',
      xlsx: 'Exportar como XLSX',
    },
    english: {
      toolbar: {
        title: 'Export',
      },
      header: 'Choose date',
      month: 'By month: ',
      day: 'By day: ',
      date: 'Date',
      texttab: 'Export as Text Tab Delimited',
      csv: 'Export as CSV',
      xlsx: 'Export as XLSX',
    },
  };
  students = [];
  event;
  month = true;
  day = false;
  date: string;

  constructor(
    private loading: LoadingController,
    private modal: ModalController,
    private csv: CSVProvider,
    private textTab: TextTabDelimitedProvider,
    private file: FileProvider,
    private xlsx: XLSXProvider,
    private db: AmaranthusDBProvider,
    private route: ActivatedRoute,
    private storage: Storage,
    private platform: Platform
  ) {}

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

  /**
   *
   *
   * @memberof ExportPage
   */
  async exportAsXLSX() {
    let xlsxData;
    let message = 'Creating the File...';
    if (this.month) {
      this.date = this.date.slice(0, 7);
    }
    const fileName = `AttendanceLog-${this.date}.xlsx`;
    this.getRecordsByDate({ query: 'Date', date: this.date });
    if (this.language === 'spanish') {
      message = 'Creando el archivo...';
    }
    const loading = await this.loading.create({
      message: message,
    });
    await loading.present();
    try {
      if (this.month) {
        xlsxData = await this.xlsx.exportXLSXToFile({
          type: recordType.month,
          records: this.students,
          fileName: fileName,
        });
      }
      if (this.day) {
        xlsxData = await this.xlsx.exportXLSXToFile({
          type: recordType.day,
          records: this.students,
          fileName: fileName,
        });
      }
      if (xlsxData) {
        const path = await this.file.exportFile({
          fileName: fileName,
          data: xlsxData,
          type: 'xlsx',
        });
        await loading.dismiss();
        if (this.language === 'spanish') {
          await this.modal.dismiss(`¡El archivo ha sido creado en ${path}!`);
        } else {
          await this.modal.dismiss(`The file was created on ${path}!`);
        }
      }
      throw new Error('Error creating the file');
    } catch (error) {
      // If XLSX Provider err
      await loading.dismiss();
      if (this.language === 'spanish') {
        await this.modal.dismiss(
          'Hubo un error creando el archivo. ¡Por favor vuelva a crear el archivo!'
        );
      } else {
        await this.modal.dismiss(
          `There was an error while creating the file. Please try again later!`
        );
      }
    }
  }

  /**
   *
   *
   * @memberof ExportPage
   */
  async exportAsText() {
    let textTabResponse;
    if (this.month) {
      this.date = this.date.slice(0, 7);
    }
    const fileName = `AttendanceLog-${this.date}.txt`;
    this.getRecordsByDate({ query: 'Date', date: this.date });
    let message = 'Creating the File...';
    if (this.language === 'spanish') {
      message = 'Creando el archivo...';
    }
    const loading = await this.loading.create({
      message: message,
    });
    await loading.present();
    try {
      if (this.month) {
        textTabResponse = await this.textTab.exportTextTabDelimited({
          type: recordType.month,
          records: this.students,
          fileName,
        });
      }
      if (this.day) {
        textTabResponse = await this.textTab.exportTextTabDelimited({
          type: recordType.day,
          records: this.students,
          fileName,
        });
      }
      if (textTabResponse) {
        try {
          const path = await this.file.exportFile({
            fileName: fileName,
            data: textTabResponse,
            type: 'txt',
          });
          await loading.dismiss();
          if (this.language === 'spanish') {
            await this.modal.dismiss(`¡El archivo ha sido creado en ${path}!`);
          } else {
            await this.modal.dismiss(`The file was created on ${path}!`);
          }
        } catch (error) {
          // If FileProvider err
          await loading.dismiss();
          await this.modal.dismiss(error);
        }
      }
    } catch (error) {
      // If TextTabDelimited Provider err
      await loading.dismiss();
      if (this.language === 'spanish') {
        await this.modal.dismiss(
          `Hubo un error creando el archivo. ¡Por favor vuelva a crear el archivo!`
        );
      } else {
        await this.modal.dismiss(
          `There was an error while creating the file. Please try again later!`
        );
      }
    }
  }

  /**
   *
   *
   * @memberof ExportPage
   */
  async exportAsCSV() {
    let csvResponse;
    if (this.month) {
      this.date = this.date.slice(0, 7);
    }
    const fileName = `AttendanceLog-${this.date}.csv`;
    this.getRecordsByDate({ query: 'Date', date: this.date });
    let message = 'Creating the File...';
    if (this.language === 'spanish') {
      message = 'Creando el archivo...';
    }
    const loading = await this.loading.create({
      message: message,
    });
    await loading.present();
    try {
      if (this.month) {
        csvResponse = await this.csv.exportCSV({
          type: recordType.month,
          records: this.students,
          fileName,
        });
      }
      if (this.day) {
        csvResponse = await this.csv.exportCSV({
          type: recordType.day,
          records: this.students,
          fileName,
        });
      }
      if (csvResponse) {
        try {
          const path = await this.file.exportFile({
            fileName: fileName,
            data: csvResponse,
            type: 'csv',
          });
          await loading.dismiss();
          if (this.language === 'spanish') {
            await this.modal.dismiss(`¡El archivo ha sido creado en ${path}!`);
          } else {
            await this.modal.dismiss(`The file was created on ${path}!`);
          }
        } catch (error) {
          // If FileProvider err
          await loading.dismiss();
          this.modal.dismiss(error);
        }
      }
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
   * @memberof StatsPage
   * Query can have values of Date
   */
  getRecordsByDate(opts: { query: string; date: string }) {
    try {
      const dateVal = opts.date.split('-');
      let date: ICalendar;
      if (dateVal.length === 2) {
        date = {
          year: parseInt(dateVal[0]),
          month: parseInt(dateVal[1]),
          day: null,
        };
      } else {
        date = {
          year: parseInt(dateVal[0]),
          month: parseInt(dateVal[1]),
          day: parseInt(dateVal[2]),
        };
      }
      const records = this.db.getQueriedRecords({
        event: this.event,
        query: opts.query,
        date: date,
      });
      if (records['length']) {
        this.students = [...records];
      } else {
        // TODO:  implement an alert message if it fails message should say no students
        // can be retrieved.
        handleError(`No records were found`);
      }
    } catch (error) {
      handleError(error);
    }
  }
}
