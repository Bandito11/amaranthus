import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IStudent } from 'src/app/common/models';

@Component({
  selector: 'app-event-students-list',
  templateUrl: './event-students-list.component.html',
  styleUrls: ['./event-students-list.component.scss'],
})
export class EventStudentsListComponent implements OnInit {
  @Input() htmlControls;
  @Input() student: IStudent;
  @Input() studentIds: string[];

  @Output() studentIdsData = new EventEmitter<string[]>();
  constructor() {}

  ngOnInit() {}


  ifOnEventList(id) {
    if (this.studentIds.indexOf(id) !== -1) {
      return true;
    }
    return false;
  }

  addToEvent(id) {
    if (this.studentIds.indexOf(id) === -1) {
      this.studentIds = [...this.studentIds, id];
    }
    this.studentIdsData.emit(this.studentIds);
  }

  removeFromEvent(id) {
    const newStudentIds = [
      ...this.studentIds.slice(0, this.studentIds.indexOf(id)),
      ...this.studentIds.slice(
        this.studentIds.indexOf(id) + 1,
        this.studentIds.length
      ),
    ];
    this.studentIds = [...newStudentIds];
    this.studentIdsData.emit(this.studentIds);
  }
}
