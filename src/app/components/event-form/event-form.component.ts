import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { CameraToolsService } from 'src/app/services/camera-tools.service';
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
  @Input() eventName;
  @Input() startDate;
  @Input() endDate;
  @Input() infiniteDates: boolean;

  @Output() eventData = new EventEmitter<IEvent>();

  hasEndDate;
  monthNames;

  constructor(
    public platform: Platform,
    public cameraTools: CameraToolsService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if (this.create) {
      const currentDate = new Date();
      this.startDate = `${currentDate.getFullYear()}-${addZeroInFront(
        currentDate.getMonth() + 1
      )}-${addZeroInFront(currentDate.getDate())}`;
      this.endDate = ``;
    } else {
      if (this.endDate) {
        this.hasEndDate = true;
      }
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

  async getPicture() {
    const image = await this.cameraTools.takePicture();
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(image.webPath);
    this.logo = await this.cameraTools.readAsBase64(image.webPath);
  }
  
  resetPicture() {
    this.imgSrc = '';
    this.logo = this.imgSrc;
  }

  assignStudentId(studentIds) {
    this.studentIds = [...studentIds];
  }

  async submit() {
    const temp = {
      name: this.eventName,
      startDate: this.startDate,
      endDate: this.endDate,
      infiniteDates: this.infiniteDates,
      logo: this.logo,
      members: [],
      studentIds: this.studentIds,
      hasEndDate: this.hasEndDate,
    };
    this.eventData.emit(temp);
  }
}
