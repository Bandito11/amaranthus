import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  Filesystem,
  Directory,
  Encoding,
  WriteFileOptions,
  ReadFileOptions,
} from '@capacitor/filesystem';

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
    try {
      if (this.platform.is('mobile')) {
        const results = await this.writeToMobile(opts);
        if (this.platform.is('mobileweb')) {
          return results;
        }
        await this.toFileOpener({ type: opts.type, path: results });
        return results;
      }
      if (this.platform.is('desktop')) {
        return await this.writeToDesktop(opts);
      }
    } catch (error) {
      throw error;
    }
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
      return path + ' ' + opts.data;
    });
  }

  /**
   *
   *
   * @param {{ fileName: string, data: any }} opts
   * @memberof FileProvider
   */
  async writeToMobile(opts: { fileName: string; data: any; type: string }) {
    const options: WriteFileOptions = {
      path: `AttendanceLog/${opts.fileName}`,
      data: opts.data,
      directory: Directory.Library,
      recursive: true,
    };
    if (opts.type !== 'xlsx') {
      options.encoding = Encoding.UTF8;
    }
    const results = await Filesystem.writeFile(options);
    return results.uri;
  }

  async readFromMobile(opts: { type: string; path: string }) {
    const options: ReadFileOptions = {
      path: `AttendanceLog/${opts.path}`,
      directory: Directory.Library,
    };
    if (opts.type !== 'xlsx') {
      options.encoding = Encoding.UTF8;
    }
    const result = await Filesystem.readFile(options);
    return result.data;
  }

  async deleteFile( path: string ) {
    await Filesystem.deleteFile({
      path: `AttendanceLog/${path}`,
      directory: Directory.Library,
    });
  }

  /**
   *
   *
   * @param {{ path: string, type: string }} opts
   * @returns {Promise<IResponse<any>>}
   * @memberof FileProvider
   */
  async toFileOpener(opts: { path: string; type: string }) {
    try {
      let result;
      if (opts.type === 'xlsx') {
        result = await this.fileOpener.open(
          opts.path,
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
      }
      if (opts.type === 'txt') {
        result = await this.fileOpener.open(opts.path, 'text/plain');
      }
      if (opts.type === 'csv') {
        result = await this.fileOpener.open(opts.path, 'text/csv');
      }
    } catch (error) {
      throw error;
    }
  }
}
