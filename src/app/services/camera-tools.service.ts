import { Injectable } from '@angular/core';
import { takePicture } from '../providers/camera-tools';

@Injectable({
  providedIn: 'root',
})
export class CameraToolsService {
  constructor() {}

  takePicture() {
    try {
      return takePicture();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async readAsBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  async readAsBlob(dataURL) {
    const response = await fetch(dataURL);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

}
