import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { handleError } from 'src/app/common/handleError';
import { CameraToolsService } from 'src/app/services/camera-tools.service';
import { DatabaseService } from 'src/app/services/database.service';
import { IEvent, IStudent } from '../../common/models';

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
  @Output() queryData = new EventEmitter<string>();

  hasEndDate;
  monthNames;
  unfilteredStudents: IStudent[];

  constructor(
    public platform: Platform,
    public cameraTools: CameraToolsService,
    public sanitizer: DomSanitizer,
    public dbService: DatabaseService
  ) {}

  async ngOnInit() {
    if (this.language === 'spanish') {
      this.monthNames =
        'Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre';
    } else {
      this.monthNames =
        'January,February,March,April,May,June,July,August,September,October,November,December';
    }
    if (this.endDate) {
      this.hasEndDate = true;
    }
  }

  search(event) {
    this.queryData.emit(event.target.value);
  }

  resetEndDate() {
    this.endDate = '';
  }

  async getPicture() {
    try {
      const image = await this.cameraTools.takePicture();
      this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(image.webPath);
      this.logo = await this.cameraTools.readAsBase64(image.webPath);
    } catch (error) {
      handleError(error);
    }
  }

  resetPicture() {
    this.imgSrc = '';
    this.logo = this.imgSrc;
  }

  assignStudentId(studentIds) {
    this.studentIds = [...studentIds];
  }

  async submit() {
    if (typeof this.logo === 'object') {
      this.logo = await this.cameraTools.readAsBase64(
        this.logo.changingThisBreaksApplicationSecurity
      );
    }
    const event = {
      name: this.eventName,
      startDate: this.startDate,
      endDate: this.endDate,
      infiniteDates: this.infiniteDates,
      logo: this.logo,
      members: [],
      studentIds: this.studentIds,
      hasEndDate: this.hasEndDate,
    };
    
    this.eventData.emit(event);
  }
}
