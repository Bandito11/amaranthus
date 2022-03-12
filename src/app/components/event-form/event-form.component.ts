import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IEvent } from '../../common/models';
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
  @Output() eventData = new EventEmitter<IEvent>();

  eventName;
  startDate;
  endDate;
  hasEndDate;
  infiniteDates: boolean;

  constructor(public platform: Platform) {}

  ngOnInit() {
    if (this.create) {
      const currentDate = new Date();
      this.startDate = `${currentDate.getFullYear()}-${addZeroInFront(
        currentDate.getMonth() + 1
      )}-${addZeroInFront(currentDate.getDate())}`;
      this.endDate = ``;
    }
  }

  resetEndDate() {
    this.endDate = '';
  }

  async submit() {
    const temp = {
      name: this.eventName,
      startDate: this.startDate,
      endDate: this.endDate,
      infiniteDates: this.infiniteDates,
      logo: '',
      members: [],
    };
    this.eventData.emit(temp);
  }
}
