import { Injectable } from '@angular/core';
import { takePicture } from '../providers/camera-tools';

@Injectable({
  providedIn: 'root'
})
export class CameraToolsService {

  constructor() { }

  takePicture(){
    return takePicture()
  }
}
