import { Share } from '@capacitor/share';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  Filesystem,
  Directory,
  Encoding,
  WriteFileOptions,
  ReadFileOptions,
} from '@capacitor/filesystem';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class FileProvider {
  constructor(private platform: Platform, private storage: Storage) {}

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
    if (
      this.platform.is('mobileweb') &&
      navigator.userAgent.toLowerCase().match('windows')
    ) {
      return;
    }
    const data = await this.writeToDevice(opts);
    await this.shareFile({ data, type: opts.type });
  }

  /**
   *
   * @param {{ fileName: string, data: any, type: string }} opts
   * @memberof FileProvider
   */
  async writeToDevice(opts: { fileName: string; data: any; type: string }) {
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

  async writeToAndroidExternal(opts: {
    fileName: string;
    data: any;
    type: string;
  }) {
    const options: WriteFileOptions = {
      path: `Attendance-Log-Tracker/${opts.fileName}`,
      data: opts.data,
      directory: Directory.ExternalStorage,
      recursive: true,
    };
    if (opts.type !== 'xlsx') {
      options.encoding = Encoding.UTF8;
    }
    const results = await Filesystem.writeFile(options);

    return results.uri;
  }

  async readFromDevice(opts: { type: string; path: string }) {
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

  async deleteFile(path: string) {
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
  async shareFile(arg0: { type: string; data: string }) {
    const language = await this.storage.get('language');
    let text =
      'Share your records with someone or save it on your personal device.';

    let title = `Share file?`;
    if (language === 'spanish') {
      title = `¿Compartir documento?`;
      text =
        'Comparte tu documento con alguien o guardalo en tu dispositivo personal.';
    }
    const dialogTitle = title;
    if (this.platform.is('android')) {
      const date = new Date();
      const filename = `student-report.${arg0.type}`;
      await this.writeToAndroidExternal({
        data: arg0.data,
        type: arg0.type,
        fileName: filename,
      });
    } else if (this.platform.is('desktop')) {
      Share.share({
        url: arg0.data,
        title,
        dialogTitle,
        text,
      });
    } else {
      await Share.share({
        url: arg0.data,
        title,
        dialogTitle,
        text,
      });
    }
    return null;
  }
}
