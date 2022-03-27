import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IResponse } from 'src/app/common/models';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

declare const fs;
declare const process;

@Injectable({
  providedIn: 'root',
})
export class FileProvider {
  constructor(
    private fileOpener: FileOpener,
    private platform: Platform
  ) {}

  /**
   *
   *
   * @param {{
   *     fileName: string,
   *     text: any,
   *     type: string
   *   }} opts
   * @returns {Promise<IResponse<any>>}
   * @memberof FileProvider
   */
  async exportFile(opts: {
    fileName: string;
    data: any;
    type: string;
  }) {
    if (this.platform.is('mobile')) {
      await this.writeToLocal(opts)
    }
    return new Promise((resolve, reject) => {
      if (this.platform.is('desktop')) {
        this.writeToDesktop(opts)
          .then((response) => {
            return resolve(response);
          })
          .catch((error) => reject(error));
      }
    });
  }

  /**
   *
   * @param {{ fileName: string, text: any, type: string }} opts
   * @returns {Promise<IResponse<any>>}
   * @memberof FileProvider
   *    */
  writeToDesktop(opts: {
    fileName: string;
    data: any;
    type: string;
  }) {
    return new Promise((resolve, reject) => {
      let path = ``;
      if (navigator.userAgent.match('Macintosh')) {
        path = `${process.env.HOME}/Documents/${opts.fileName}`;
      } else if (navigator.userAgent.match('Windows')) {
        path = `${process.env.USERPROFILE}\\Documents\\${opts.fileName}`;
      }
      fs.writeFile(path, opts.data, {}, (err) => {
        if (err) {
          reject(err);
        }
        resolve({
          success: true,
          data: `The file has been saved on under Documents/${opts.fileName}`,
          dateStamp: new Date().toString(),
          error: null,
        });
      });
    });
  }

  /**
   *
   *
   * @param {{ fileName: string, text: any, type: string }} opts
   * @returns {Promise<void>}
   * @memberof FileProvider
   */
  async writeToLocal(opts: { fileName: string; data: any; type: string }) {
    await Filesystem.writeFile({
      path: `AttendanceLog/${opts.fileName}`,
      data: opts.data,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      recursive: true,
    });
  }

  /**
   *
   *
   * @param {{ fileName: string, text: any, type: string, path, directory }} opts
   * @returns {Promise<IResponse<any>>}
   * @memberof FileProvider
   */
  toFileOpener(opts: {
    fileName: string;
    text: any;
    type: string;
    path;
    directory;
  }) {
    return new Promise((resolve, reject) => {
      let response: IResponse<string> = {
        success: false,
        error: '',
        data: '',
      };
      const path = `${opts.path}${opts.directory}/${opts.fileName}`;
      if (opts.type === 'xlsx') {
        response = {
          ...response,
          success: true,
          data: `${opts.fileName} was exported successfully to the folder ${opts.path}${opts.directory} in your device!`,
        };
        this.fileOpener
          .open(
            path,
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          )
          .then(() => resolve(response))
          .catch((_) =>
            reject(
              `${opts.fileName} was exported successfully to the folder ${opts.path}${opts.directory} in your device
             but there was an error opening the file, please try again!`
            )
          );
      }
      if (opts.type === 'txt') {
        response = {
          ...response,
          success: true,
          data: `${opts.fileName} was exported successfully to the folder ${opts.path}${opts.directory} in your device!`,
        };
        this.fileOpener
          .open(path, 'text/plain')
          .then(() => resolve(response))
          .catch((_) =>
            reject(
              `${opts.fileName} was exported successfully to the folder ${opts.path}${opts.directory} in your device
             but there was an error opening the file, please try again!`
            )
          );
      }
      if (opts.type === 'csv') {
        response = {
          ...response,
          success: true,
          data: `${opts.fileName} was exported successfully to the folder ${opts.path}${opts.directory} in your device!`,
        };
        this.fileOpener
          .open(path, 'text/csv')
          .then(() => resolve(response))
          .catch((_) =>
            reject(
              `${opts.fileName} was exported successfully to the folder ${opts.path}${opts.directory} in your device
             but there was an error opening the file, please try again!`
            )
          );
      }
    });
  }
}
