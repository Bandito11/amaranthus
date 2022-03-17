import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStudent } from 'src/app/common/models';
import { Platform } from '@ionic/angular';

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

  constructor(public platform: Platform) {}

  ngOnInit() {
    if (this.create) {
      this.student.isActive = true;
      this.student.gender = 'male';
    }
  }

  submit() {
    this.student = {
      ...this.student,
      isActive: this.student.isActive,
    };
    this.studentData.emit(this.student);
  }

  reset() {
    this.student = {} as IStudent;
  }

  resetPicture() {
    this.imgSrc = './assets/profilePics/defaultMale.png';
    const pictureInput = document.querySelector('#inputFile');
    pictureInput['value'] = '';
  }

  deleteStudent() {
    this.deleteStudentData.emit(this.student);
  }
}
