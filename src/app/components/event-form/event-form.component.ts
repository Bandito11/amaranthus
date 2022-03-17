import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IEvent, IStudent } from '../../common/models';
import { addZeroInFront } from '../../common/validation';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  @Input() htmlControls;
  @Input() imgSrc;
  @Input() create: boolean;
  @Input() logo;
  @Input() language;
  @Input() students: IStudent[];
  @Input() studentIds: string[];

  @Output() eventData = new EventEmitter<IEvent>();

  eventName;
  startDate;
  endDate;
  hasEndDate;
  infiniteDates: boolean;
  monthNames;

  constructor(public platform: Platform) {}

  ngOnInit() {
    if (this.create) {
      const currentDate = new Date();
      this.startDate = `${currentDate.getFullYear()}-${addZeroInFront(
        currentDate.getMonth() + 1
      )}-${addZeroInFront(currentDate.getDate())}`;
      this.endDate = ``;
    }
    if (this.language === 'spanish') {
      this.monthNames =
        'Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre';
    } else {
      this.monthNames =
        'January,February,March,April,May,June,July,August,September,October,November,December';
    }
  }

  resetEndDate() {
    this.endDate = '';
  }

  getPicture() {}

  addLogo() {}

  assignStudentId(studentIds) {
    this.studentIds = [...studentIds];
  }

  async submit() {
    const temp = {
      name: this.eventName,
      startDate: this.startDate,
      endDate: this.endDate,
      infiniteDates: this.infiniteDates,
      logo: '',
      members: [],
      studentIds: this.studentIds,
      hasEndDate: this.hasEndDate,
    };
    this.eventData.emit(temp);
  }
}
