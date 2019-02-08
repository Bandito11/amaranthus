import { Component } from '@angular/core';
import { LoadingController, NavParams, ModalController } from '@ionic/angular';
import { CSVProvider } from '../services/csv/csv';
import { TextTabDelimitedProvider } from '../services/text-tab-delimited/text-tab-delimited';
import { FileProvider } from '../services/file/file';
import { XLSXProvider } from '../services/xslx/xslx';

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage {

  students;

  constructor(
    private loading: LoadingController,
    private modal: ModalController,
    private navParams: NavParams,
    private csv: CSVProvider,
    private textTab: TextTabDelimitedProvider,
    private file: FileProvider,
    private xlsx: XLSXProvider
  ) { }

  ionViewWillEnter() {
    this.students = this.navParams.get('students');
    if (!this.students.length) {
      this.students = [];
    }
  }

  /**
   *
   *
   * @memberof ExportPage
   */
  async exportTextTabToFile() {
    const loading = await this.loading.create({
      message: 'Creating the File...'
    });
    loading.present();
    try {
      const textTabResponse = this.textTab.exportTextTabDelimited(this.students);
      const fileName = 'AttendanceLog.txt';
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
  async exportCSVToFile() {
    const loading = await this.loading.create({
      message: 'Creating the File...'
    });
    loading.present();
    try {
      const csvResponse = this.csv.exportCSV(this.students);
      const fileName = 'AttendanceLog.csv';
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
   * @memberof ExportPage
   */
  async exportXLSXToFile() {
    const loading = await this.loading.create({
      message: 'Creating the File...'
    });
    loading.present();
    try {
      const xlsxResponse = await this.xlsx.exportXLSXToFile(this.students);
      const fileName = 'AttendanceLog.xlsx';
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

}
