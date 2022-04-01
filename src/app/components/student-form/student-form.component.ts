import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStudent } from 'src/app/common/models';
import { Platform } from '@ionic/angular';
import { CameraToolsService } from 'src/app/services/camera-tools.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  @Input() htmlControls;
  @Input() student: IStudent;
  @Input() imgSrc;
  @Input() create: boolean;

  @Output() studentData = new EventEmitter<IStudent>();
  @Output() deleteStudentData = new EventEmitter<IStudent>();

  constructor(public sanitizer: DomSanitizer, public platform: Platform, public cameraTools: CameraToolsService) {}

  ngOnInit() {
    if (this.create) {
      this.student.isActive = true;
      this.student.gender = 'male';
    }
  }

  submit() {
    //TODO: Set imgSrc to student.picture
    this.student = {
      ...this.student,
      isActive: this.student.isActive,
    };
    this.studentData.emit(this.student);
  }

  reset() {
    this.student = {} as IStudent;
    this.resetPicture();
  }

  resetPicture() {
    this.imgSrc = './assets/profilePics/defaultMale.png';
    if (this.platform.is('desktop')) {
      const pictureInput = document.querySelector('#inputFile');
      pictureInput['value'] = '';
    }
    this.student.picture = this.imgSrc;
  }

  deleteStudent() {
    this.deleteStudentData.emit(this.student);
  }

  async getPictureFromMobile(){
   const image = await this.cameraTools.takePicture();
   this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(image.webPath);
  }
}
