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
  @Input() event: IEvent;
  @Input() language;
  @Input() students: IStudent[];
  @Input() studentIds: string[];

  @Output() eventData = new EventEmitter<IEvent>();
  @Output() queryData = new EventEmitter<string>();
@Output() deleteEventData = new EventEmitter<IEvent>();

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
    if (this.event.endDate) {
      this.hasEndDate = true;
    }
  }

  search(event) {
    this.queryData.emit(event.target.value);
  }

  resetEndDate() {
    this.event.endDate = '';
  }

  async getPicture() {
    try {
      const image = await this.cameraTools.takePicture();
      this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(image.webPath);
      this.event.logo = await this.cameraTools.readAsBase64(image.webPath);
    } catch (error) {
      handleError(error);
    }
  }

  resetPicture() {
    this.imgSrc = '';
    this.event.logo = this.imgSrc;
  }

  assignStudentId(studentIds) {
    this.studentIds = [...studentIds];
  }

  addAll() {
    for (const student of this.students) {
      this.addToEvent(student.id);
    }
  }

  addToEvent(id) {
    if (this.studentIds.indexOf(id) === -1) {
      this.studentIds = [...this.studentIds, id];
    }
  }
  
  async submit() {
    if (typeof this.event.logo === 'object') {
      this.event.logo = await this.cameraTools.readAsBase64(
        this.event.logo.changingThisBreaksApplicationSecurity
      );
    }
    const event = {
      name: this.event.name,
      startDate: this.event.startDate,
      endDate: this.event.endDate,
      infiniteDates: this.event.infiniteDates,
      logo: this.event.logo,
      members: [],
      studentIds: this.studentIds,
      hasEndDate: this.hasEndDate,
    };
    
    this.eventData.emit(event);
  }

  deleteEvent(){
    this.deleteEventData.emit(this.event)
  }
}
