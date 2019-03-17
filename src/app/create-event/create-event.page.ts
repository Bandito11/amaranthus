import { Component, OnInit } from '@angular/core';
import { IStudent, ISimpleAlertOptions, IEvent } from '../common/models';
import { NavController, Platform, ModalController, AlertController } from '@ionic/angular';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { addZeroInFront } from '../common/validation';
import { handleError } from '../common/handleError';
import { CreatePage } from '../create/create.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  logo;
  students: IStudent[];
  STUDENTS: IStudent[];
  studentIds: string[];
  eventName;
  startDate;
  endDate;
  hasEndDate;
  infiniteDates: boolean;
  currentDate = new Date();

  constructor(
    public navCtrl: NavController,
    public camera: Camera,
    public platform: Platform,
    public modalCtrl: ModalController,
    public db: AmaranthusDBProvider,
    public alertCtrl: AlertController,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit() {
    this.logo = '';
    this.studentIds = [];
    this.getStudents();
    const currentDate = new Date();
    this.startDate = `${currentDate.getFullYear()}-${addZeroInFront(currentDate.getMonth() + 1)}-${addZeroInFront(currentDate.getDate())}`;
    this.endDate = ``;
  }

  resetEndDate() {
    this.endDate = '';
  }

  addAll() {
    for (const student of this.STUDENTS) {
      this.addToEvent(student.id);
    }
  }

  async createNewEvent() {
    try {
      if (this.studentIds.length < 1) {
        const opts: ISimpleAlertOptions = {
          header: 'Error',
          message: 'Have to choose at least one user from the list!'
        };
        this.showSimpleAlert(opts);
        return;
      }
      if (!this.startDate && !this.infiniteDates) {
        const opts: ISimpleAlertOptions = {
          header: 'Error',
          message: 'Have to choose a start date!'
        };
        this.showSimpleAlert(opts);
        return;
      }
      if (!this.eventName) {
        const opts: ISimpleAlertOptions = {
          header: 'Error',
          message: 'Have to write a name for the event!'
        };
        this.showSimpleAlert(opts);
        return;
      }
      const members = this.studentIds.map(studentId => {
        return {
          id: studentId,
          attendance: false,
          absence: false,
          record: []
        };
      });
      let newEvent: IEvent = {
        logo: this.logo,
        name: this.eventName,
        startDate: '',
        members: members,
        endDate: '',
        infiniteDates: this.infiniteDates
      };
      if (!newEvent.infiniteDates) {
        newEvent = {
          ...newEvent,
          startDate: this.startDate
        };
      }
      if (this.endDate && !newEvent.infiniteDates) {
        if (!this.startDate) {
          this.showSimpleAlert({
            header: 'Error!',
            message: 'If the event had an end date it has to have a start date~'
          });
        } else {
          newEvent = {
            ...newEvent,
            endDate: this.endDate
          };
        }
      } else if (!this.hasEndDate) {
        this.resetEndDate();
      }
      const alert = await this.alertCtrl.create({
        header: 'Warning!',
        message: `Are you sure you want to create a new ${this.eventName}?`,
        buttons: [
          { text: 'No' },
          {
            text: 'Yes',
            handler: () => {
              // user has clicked the alert button
              // begin the alert's dismiss transition
              const navTransition = alert.dismiss();
              const response = this.db.insertEvent(newEvent);
              if (response.success === true) {
                navTransition.then(() => {
                  const options = {
                    header: 'Success!',
                    message: `${this.eventName} was created.`
                  };
                  this.showAdvancedAlert(options);
                });
              } else {
                const options = {
                  header: 'Error',
                  message: response.error
                };
                navTransition.then(() => this.showAdvancedAlert(options));
              }
              return false;
            }
          }
        ]
      });
      alert.present();
    } catch (error) {
      const opts: ISimpleAlertOptions = {
        header: 'Error',
        message: error
      };
      this.showSimpleAlert(opts);
    }
  }

  getStudents() {
    this.students = [];
    this.STUDENTS = [];
    const response = this.db.getAllStudents();
    if (response.success) {
      this.students = [...response.data];
      this.STUDENTS = [...response.data];
    }
  }

  private initializeStudentsList() {
    this.students = [...this.STUDENTS];
  }

  search(event) {
    const query = event.target.value;
    query ? this.filterStudentsList(query) : this.initializeStudentsList();
  }

  private filterStudentsList(query: string) {
    const students = [...this.STUDENTS];
    let fullName: string;
    const newQuery = students.filter(student => {
      fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      if (student.id === query || student.firstName.toLowerCase().includes(query.toLowerCase()) ||
        student.lastName.toLowerCase().includes(query.toLowerCase()) || fullName === query.toLowerCase()) {
        return student;
      }
    });
    this.students = [...newQuery];
  }

  addLogo() {
    if (this.platform.is('cordova')) {
      const options: CameraOptions = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        targetWidth: 250,
        targetHeight: 250,
        destinationType: this.camera.DestinationType.FILE_URI,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.PNG
      };
      this.camera.getPicture(options).then(
        imageData => {
          this.logo = this.sanitizer.bypassSecurityTrustUrl(imageData);
        },
        error => handleError(error)
      );
    } else {
      // Only for Dev Purposes
      // this.logo = `https://firebasestorage.googleapis.com/v0/b/ageratum-ec8a3.appspot.com/o/
      // cordova_logo_normal_dark.png?alt=media&token=3b89f56e-8685-4f56-b5d7-2441f8857f97`;
    }
  }

  addToEvent(id) {
    if (this.studentIds.indexOf(id) === -1) { this.studentIds = [...this.studentIds, id]; }
  }

  removeFromEvent(id) {
    const newStudentIds = [...this.studentIds.slice(0, this.studentIds.indexOf(id)),
    ...this.studentIds.slice(this.studentIds.indexOf(id) + 1, this.studentIds.length)];
    this.studentIds = [...newStudentIds];
  }

  async addStudent() {
    const modal = await this.modalCtrl.create({
      component: CreatePage
    });
    modal.present();
    modal.onDidDismiss().then(_ => this.getStudents());
  }

  ifOnEventList(id) {
    if (this.studentIds.indexOf(id) !== -1) { return true; }
    return false;
  }

  private async showSimpleAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl
      .create({
        header: options.header,
        message: options.message,
        buttons: options.buttons
      });
    alert.present();
  }

  private async showAdvancedAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl.create({
      header: options.header,
      message: options.message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // user has clicked the alert button
            // begin the alert's dismiss transition
            alert.dismiss().then(() => {
              this.modalCtrl.dismiss();
            });
            return false;
          }
        }
      ]
    });
    alert.present();
  }

}
