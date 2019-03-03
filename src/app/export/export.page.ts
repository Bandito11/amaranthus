import { AmaranthusDBProvider } from './../services/amaranthus-db/amaranthus-db';
import { Component } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { CSVProvider } from '../services/csv/csv';
import { TextTabDelimitedProvider } from '../services/text-tab-delimited/text-tab-delimited';
import { FileProvider } from '../services/file/file';
import { XLSXProvider } from '../services/xslx/xslx';
import { recordType } from '../common/constants';
import { handleError } from '../common/handleError';
import { ActivatedRoute } from '@angular/router';
import { ICalendar } from '../common/models';

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage {

  students = [];
  event;
  month = true;
  day = false;
  date: string;

  constructor(
    private loading: LoadingController,
    private modal: ModalController,
    // private navParams: NavParams, // To be deleted after next update
    private csv: CSVProvider,
    private textTab: TextTabDelimitedProvider,
    private file: FileProvider,
    private xlsx: XLSXProvider,
    private db: AmaranthusDBProvider,
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter() {
    // TODO: To be deleted after next update
    // this.students = this.navParams.get('students');
    // if (!this.students.length) {
    //   this.students = [];
    // }
    this.event = this.route.snapshot.paramMap.get('event');
    if (!this.event) {
      this.event = '';
    }
    // this.getStudentsRecords(); // To be deleted after next update
  }

  /**
 *
 *
 * @memberof ExportPage
 */
  async exportAsXLSX() {
    let xlsxResponse;
    const fileName = 'AttendanceLog.xlsx';
    this.getRecordsByDate({ query: 'Date', date: this.date });
    const loading = await this.loading.create({
      message: 'Creating the File...'
    });
    loading.present();
    try {
      if (this.month) {
        xlsxResponse = await this.xlsx.exportXLSXToFile({ type: recordType.month, records: this.students });
      }
      if (this.day) {
        xlsxResponse = await this.xlsx.exportXLSXToFile({ type: recordType.day, records: this.students });
      }
      if (xlsxResponse.success) {
        try {
          const fileResponse = await this.file.exportFile({
            fileName: fileName,
            text: xlsxResponse.data,
            type: 'xlsx'
          });
          if (fileResponse.success) {
            loading.dismiss();
            this.modal.dismiss(fileResponse.data);
          }
        } catch (error) { // If FileProvider err
          loading.dismiss();
          this.modal.dismiss(error);
        }

      }
    } catch (error) { // If XLSX Provider err
      loading.dismiss();
      this.modal.dismiss('There was an error while creating the file. Please try again later!');
    }
  }

  /**
 *
 *
 * @memberof ExportPage
 */
  async exportAsText() {
    let textTabResponse;
    const fileName = 'AttendanceLog.txt';
    this.getRecordsByDate({ query: 'Date', date: this.date });
    const loading = await this.loading.create({
      message: 'Creating the File...'
    });
    loading.present();
    try {
      if (this.month) {
        textTabResponse = await this.textTab.exportTextTabDelimited({ type: recordType.month, records: this.students });
      }
      if (this.day) {
        textTabResponse = await this.textTab.exportTextTabDelimited({ type: recordType.day, records: this.students });
      }
      if (textTabResponse.success) {
        try {
          const fileResponse = await this.file.exportFile({
            fileName: fileName,
            text: textTabResponse.data,
            type: 'txt'
          });
          if (fileResponse.success) {
            loading.dismiss();
            this.modal.dismiss(fileResponse.data);
          }
        } catch (error) { // If FileProvider err
          loading.dismiss();
          this.modal.dismiss(error);
        }

      }
    } catch (error) { // If TextTabDelimited Provider err
      loading.dismiss();
      this.modal.dismiss('There was an error while creating the file. Please try again later!');
    }
  }

  /**
   *
   *
   * @memberof ExportPage
   */
  async exportAsCSV() {
    let csvResponse;
    const fileName = 'AttendanceLog.csv';
    this.getRecordsByDate({ query: 'Date', date: this.date });
    const loading = await this.loading.create({
      message: 'Creating the File...'
    });
    loading.present();
    try {
      if (this.month) {
        csvResponse = await this.csv.exportCSV({ type: recordType.month, records: this.students });
      }
      if (this.day) {
        csvResponse = await this.csv.exportCSV({ type: recordType.day, records: this.students });
      }
      if (csvResponse.success) {
        try {
          const fileResponse = await this.file.exportFile({
            fileName: fileName,
            text: csvResponse.data,
            type: 'csv'
          });
          if (fileResponse.success) {
            loading.dismiss();
            this.modal.dismiss(fileResponse.data);
          }
        } catch (error) { // If FileProvider err
          loading.dismiss();
          this.modal.dismiss(error);
        }

      }
    } catch (error) { // If CSV Provider err
      loading.dismiss();
      this.modal.dismiss('There was an error while creating the file. Please try again later!');
    }
  }


  /**
*
*
* @memberof StatsPage
* Query can have values of Date
*/
  getRecordsByDate(opts: { query: string, date: string }) {
    try {
      const dateVal = opts.date.split('-');
      let date: ICalendar;
      if (dateVal.length === 2) {
        date = {
          year: parseInt(dateVal[0]),
          month: parseInt(dateVal[1]),
          day: null
        };
      } else {
        date = {
          year: parseInt(dateVal[0]),
          month: parseInt(dateVal[1]),
          day: parseInt(dateVal[2])
        };
      }
      const response = this.db.getQueriedRecords({ event: this.event, query: opts.query, date: date });
      if (response.success === true) {
        this.students = [...response.data];
      } else {
        // TODO:  implement an alert message if it fails message should say no students
        // can be retrieved.
        handleError(response.error);
      }
    } catch (error) {
      handleError(error);
    }
  }


  //   /** TODO: To be deleted after update
  //  *
  //  *
  //  * @memberof StatsPage
  //  * Query can have values of Date
  //  */
  //   getStudentsRecords() {
  //     try {
  //       const response = this.db.getQueriedRecords({ event: this.event, query: '' });
  //       if (response.success === true) {
  //         this.students = [...response.data];
  //         this.unfilteredStudents = [...response.data];
  //       } else {
  //         // TODO:  implement an alert message if it fails message should say no students
  //         // can be retrieved.
  //         handleError(response.error);
  //       }
  //     } catch (error) {
  //       handleError(error);
  //     }
  //   }

  // /** TODO: To be deleted after update
  //  *
  //  *
  //  * @memberof ExportPage
  //  */
  // async exportTextTabToFile() {
  //   const loading = await this.loading.create({
  //     message: 'Creating the File...'
  //   });
  //   loading.present();
  //   try {
  //     const textTabResponse = this.textTab.exportTextTabDelimited(this.students);
  //     const fileName = 'AttendanceLog.txt';
  //     if (textTabResponse.success) {
  //       try {
  //         const fileResponse = await this.file.exportFile({
  //           fileName: fileName,
  //           text: textTabResponse.data,
  //           type: 'txt'
  //         });
  //         if (fileResponse.success) {
  //           loading.dismiss();
  //           this.modal.dismiss(fileResponse.data);
  //         }
  //       } catch (error) { // If FileProvider err
  //         loading.dismiss();
  //         this.modal.dismiss(error);
  //       }

  //     }
  //   } catch (error) { // If TextTabDelimited Provider err
  //     loading.dismiss();
  //     this.modal.dismiss('There was an error while creating the file. Please try again later!');
  //   }
  // }

  // /** TODO: To be deleted after update
  //  *
  //  *
  //  * @memberof ExportPage
  //  */
  // async exportCSVToFile() {
  //   const loading = await this.loading.create({
  //     message: 'Creating the File...'
  //   });
  //   loading.present();
  //   try {
  //     const csvResponse = this.csv.exportCSV(this.students);
  //     const fileName = 'AttendanceLog.csv';
  //     if (csvResponse.success) {
  //       try {
  //         const fileResponse = await this.file.exportFile({
  //           fileName: fileName,
  //           text: csvResponse.data,
  //           type: 'csv'
  //         });
  //         if (fileResponse.success) {
  //           loading.dismiss();
  //           this.modal.dismiss(fileResponse.data);
  //         }
  //       } catch (error) { // If FileProvider err
  //         loading.dismiss();
  //         this.modal.dismiss(error);
  //       }

  //     }
  //   } catch (error) { // If CSV Provider err
  //     loading.dismiss();
  //     this.modal.dismiss('There was an error while creating the file. Please try again later!');
  //   }
  // }

  // /** TODO: To be deleted after update
  //  *
  //  *
  //  * @memberof ExportPage
  //  */
  // async exportXLSXToFile() {
  //   const loading = await this.loading.create({
  //     message: 'Creating the File...'
  //   });
  //   loading.present();
  //   try {
  //     const xlsxResponse = await this.xlsx.exportXLSXToFile({ type: recordType.month, records: this.students });
  //     const fileName = 'AttendanceLog.xlsx';
  //     if (xlsxResponse.success) {
  //       try {
  //         const fileResponse = await this.file.exportFile({
  //           fileName: fileName,
  //           text: xlsxResponse.data,
  //           type: 'xlsx'
  //         });
  //         if (fileResponse.success) {
  //           loading.dismiss();
  //           this.modal.dismiss(fileResponse.data);
  //         }
  //       } catch (error) { // If FileProvider err
  //         loading.dismiss();
  //         this.modal.dismiss(error);
  //       }

  //     }
  //   } catch (error) { // If XLSX Provider err
  //     loading.dismiss();
  //     this.modal.dismiss('There was an error while creating the file. Please try again later!');
  //   }
  // }

}
