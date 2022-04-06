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
  constructor(private fileOpener: FileOpener, private platform: Platform) {}

  /**
   *
   * @param {{
   *     fileName: string,
   *     text: any,
   *     type: string
   *   }} opts
   * @memberof FileProvider
   */
  async exportFile(opts: { fileName: string; data: any; type: string }) {
    if (this.platform.is('capacitor')) {
      await this.writeToMobile(opts);
    }
    if (this.platform.is('desktop')) {
      await this.writeToDesktop(opts);
    }
    throw new Error(`Platform: ${this.platform.platforms()}`);
  }

  /**
   *
   * @param {{ fileName: string, text: any }} opts
   * @memberof FileProvider
   */
  writeToDesktop(opts: { fileName: string; data: any }) {
    return new Promise((_, reject) => {
      let path = ``;
      if (navigator.userAgent.match('Macintosh')) {
        //FIXME: process.env.HOME is supposed to be the user's home directory
        // path = `${process.env.HOME}/Documents/${opts.fileName}`;
      } else if (navigator.userAgent.match('Windows')) {
        // FIXME: process.env.USERPROFILE is supposed to be the user's home directory
        // path = `${process.env.USERPROFILE}\\Documents\\${opts.fileName}`;
      }
      console.log(opts.fileName, ' ', opts.data);
    });
  }

  /**
   *
   *
   * @param {{ fileName: string, data: any }} opts
   * @memberof FileProvider
   */
  async writeToMobile(opts: { fileName: string; data: any }) {
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
   * @param {{ fileName: string, type: string }} opts
   * @returns {Promise<IResponse<any>>}
   * @memberof FileProvider
   */
  toFileOpener(opts: { fileName: string; type: string }) {
    return new Promise((resolve, reject) => {
      let response: IResponse<string> = {
        success: false,
        error: '',
        data: '',
      };
      const directory = `${Directory.Documents}/AttendanceLog/`;
      const path = opts.fileName;
      if (opts.type === 'xlsx') {
        response = {
          ...response,
          success: true,
          data: `${opts.fileName} was exported successfully to the folder ${directory} in your device!`,
        };
        this.fileOpener
          .open(
            path,
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          )
          .then(() => resolve(response))
          .catch((_) =>
            reject(
              `${opts.fileName} was exported successfully to the folder ${directory} in your device
             but there was an error opening the file, please try again!`
            )
          );
      }
      if (opts.type === 'txt') {
        response = {
          ...response,
          success: true,
          data: `${opts.fileName} was exported successfully to the folder ${directory} in your device!`,
        };
        this.fileOpener
          .open(path, 'text/plain')
          .then(() => resolve(response))
          .catch((_) =>
            reject(
              `${opts.fileName} was exported successfully to the folder ${directory} in your device
             but there was an error opening the file, please try again!`
            )
          );
      }
      if (opts.type === 'csv') {
        response = {
          ...response,
          success: true,
          data: `${opts.fileName} was exported successfully to the folder ${directory} in your device!`,
        };
        this.fileOpener
          .open(path, 'text/csv')
          .then(() => resolve(response))
          .catch((_) =>
            reject(
              `${opts.fileName} was exported successfully to the folder ${directory} in your device
             but there was an error opening the file, please try again!`
            )
          );
      }
    });
  }
}
