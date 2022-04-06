import { DIASLABELS, MESESLABELS, DIASHEADER } from './../../common/constants';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';
import { ICalendar } from '../../common/models';
import {
  WEEKDAYSHEADER,
  WEEKDAYSLABELS,
  MONTHSLABELS,
} from '../../common/constants';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnChanges {
  /**
   * Date chosen by the user to be shown in the card Header
   * Will return @param Calendar
   * */
  @Output() getDate = new EventEmitter();
  //  html properties
  weekDaysHeader = [];

  //  html properties
  weekDaysLabels = [];

  //  html properties
  monthsLabels = [];

  // Used to get the month and year to start the calendar
  month = -1;

  // Used to get the year to start the calendar
  year = -1;

  // Used to generate calendar
  calendarDays: Array<ICalendar> = [];

  // Used to generate Calendar
  private currentDate = new Date();

  // Verify if a day is chosen
  chosen: number;

  currentStyles;

  @Input() language;

  constructor() {}

  ngOnInit() {
    this.currentDate = new Date();
    this.createCalendar(null, null);
    this.initialize(this.language);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['language']) {
      this.initialize(this.language);
    }
  }

  setCurrentStyles() {
    this.currentStyles = {
      'background-color': this.chosen ? '#e60000' : '',
      color: this.chosen ? '#fff' : '',
    };
  }

  /**Initialize the labels and headers in order to generate the calendar and the output for the header*/
  private initialize(language) {
    if (language === 'spanish') {
      this.weekDaysLabels = DIASLABELS;
      this.monthsLabels = MESESLABELS;
      this.weekDaysHeader = DIASHEADER;
    } else {
      this.weekDaysLabels = WEEKDAYSLABELS;
      this.monthsLabels = MONTHSLABELS;
      this.weekDaysHeader = WEEKDAYSHEADER;
    }
    const calendar: ICalendar = {
      day: this.currentDate.getDate(),
      month: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear(),
    };
    calendar.weekDay = this.currentDate.getDay();
    this.choseDay(calendar);
  }

  // When the day is chosen, load the data from the db using the date as a parameter.
  choseDay(date: ICalendar) {
    this.chosen = date.day;
    this.getDate.emit(date);
  }

  /**
   * Create the calendar by passing the month and the year. When starting the app the null values
   * will be passed for the month and year parameters, but when changing to a previous month or one
   * next in the list a month and year will be passed.
   */
  private createCalendar(month, year) {
    // Max days for the months in the Gregorian calendar.
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.calendarDays = [];
    this.month =
      isNaN(month) || month == null ? this.currentDate.getMonth() : month;
    this.year =
      isNaN(year) || year == null ? this.currentDate.getFullYear() : year;
    const firstDay = new Date(this.year, this.month, 1);
    const startingDay = firstDay.getDay();
    let monthsLength = daysInMonth[this.month];
    if (this.month === 1) {
      // Only February Leap Years
      if (
        (this.year % 4 === 0 && this.year % 100 !== 0) ||
        this.year % 400 === 0
      ) {
        monthsLength = 29;
      }
    }
    for (let i = 1 - startingDay; i <= monthsLength; i++) {
      if (i > 0) {
        this.calendarDays.push({
          weekDay: new Date(this.year, this.month, i).getDay(),
          day: i,
          month: this.month,
          year: this.year,
        });
      } else {
        this.calendarDays.push({
          weekDay: null,
          day: null,
          month: null,
          year: null,
        });
      }
    }
  }

  nextMonth() {
    if (this.month !== 11) {
      this.createCalendar(this.month + 1, this.year);
    } else {
      this.month = 0;
      this.createCalendar(this.month, this.year + 1);
    }
    const calendar: ICalendar = {
      month: this.month,
      year: this.year,
      day: 1,
      weekDay: new Date(this.year, this.month, 1).getDay(),
    };
    this.choseDay(calendar);
  }

  previousMonth() {
    if (this.month !== 0) {
      this.createCalendar(this.month - 1, this.year);
    } else {
      this.month = 11;
      this.createCalendar(this.month, this.year - 1);
    }
    const calendar: ICalendar = {
      month: this.month,
      year: this.year,
      day: 1,
      weekDay: new Date(this.year, this.month, 1).getDay(),
    };
    this.choseDay(calendar);
  }
}
