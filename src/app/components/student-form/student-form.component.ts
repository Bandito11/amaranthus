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
  @Input() idInput: string;

  @Output() studentData = new EventEmitter<IStudent>();

  picture;
  gender: string;
  isActive;
  @Input() create: boolean;
  
  constructor(public platform: Platform) {}

  ngOnInit() {
    this.gender = this.student.gender;
    this.student.id = this.idInput;
    if (this.create) {
      this.isActive = true;
    }
  }

  submit() {
    this.student = {
      ...this.student,
      gender: this.gender,
      isActive: this.isActive,
    };
    //TODO:
    this.studentData.emit(this.student);
  }

  reset() {
    this.student = {} as IStudent;
    this.student.id = this.idInput;
    this.gender = 'male';
  }
  
}
