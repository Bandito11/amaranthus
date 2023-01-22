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
import { FileOpener } from '@capacitor-community/file-opener';

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
    const results = await this.writeToDevice(opts);
    if (this.platform.is('mobileweb')) {
      return results;
    }
    await this.shareFile(results);
    return results;
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
  async shareFile(path: string) {
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
      FileOpener.open({ filePath: path });
    } else if (this.platform.is('desktop')) {
      Share.share({
        url: path,
        title,
        dialogTitle,
        text,
      });
    } else {
      await Share.share({
        url: path,
        title,
        dialogTitle,
        text,
      });
    }
    return;
  }
}
