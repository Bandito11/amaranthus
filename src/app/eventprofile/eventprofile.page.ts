import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IEvent, ISimpleAlertOptions, IEventControls } from '../common/models';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { MONTHSLABELS } from '../common/constants';
import { formatDate } from '../common/format';
import { handleError } from '../common/handleError';
import { EditEventPage } from '../editevent/editevent.page';

@Component({
  selector: 'app-eventprofile',
  templateUrl: './eventprofile.page.html',
  styleUrls: ['./eventprofile.page.scss'],
})
export class EventProfilePage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public db: AmaranthusDBProvider,
    public alertCtrl: AlertController,
    public modal: ModalController
  ) { }

  /**
   * This is the data show on the Page
   */
  eventControls: IEvent & IEventControls = <IEvent & IEventControls>{};
  /**
   * This is the data that is to be used for CRUD
   */
  event: IEvent = <IEvent>{};

  id;

  studentIds: string[] = [];

  currentDate: string;

  infiniteDate: boolean;

  homeURL = '/tabs/tabs/home/events/profile';


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getEventProfile(this.id);
    const date = new Date();
    this.currentDate = `${MONTHSLABELS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  /**
   *
   *
   * @param {*} id
   * @memberof EventProfilePage
   */
  getEventProfile(id) {
    this.eventControls = <IEvent & LokiObj>{};
    const date = new Date();
    const response = this.db.getEvent(id);
    if (response.success) {
      this.event = { ...response.data };
      let members = [];
      for (const member of response.data.members) {
        this.studentIds = [...this.studentIds, member.id];
        const studentResponse = this.db.getStudentById(<any>member);
        if (studentResponse.success) {
          if (this.event.infiniteDates) {
            let record = this.db.getQueriedRecordsByCurrentDate({
              event: this.event.name,
              studentId: studentResponse.data.id,
              day: date.getDate(),
              month: date.getMonth() + 1,
              year: date.getFullYear()
            });
            if (!record) {
              record = {
                id: '',
                year: 0,
                month: 0,
                day: 0,
                attendance: false,
                absence: false
              };
            }
            members = [
              ...members,
              {
                id: studentResponse.data.id,
                firstName: studentResponse.data.firstName,
                initial: studentResponse.data.initial,
                lastName: studentResponse.data.lastName,
                phoneNumber: studentResponse.data.phoneNumber,
                picture: studentResponse.data.picture,
                class: studentResponse.data.class,
                attendance: member.attendance,
                absence: member.absence,
                record: record
              }
            ];
          } else {
            members = [
              ...members,
              {
                id: studentResponse.data.id,
                firstName: studentResponse.data.firstName,
                initial: studentResponse.data.initial,
                lastName: studentResponse.data.lastName,
                phoneNumber: studentResponse.data.phoneNumber,
                picture: studentResponse.data.picture,
                class: studentResponse.data.class,
                attendance: member.attendance,
                absence: member.absence
              }
            ];
          }
        }
      }
      if (response.data.startDate) {
        this.eventControls = {
          ...response.data,
          startDate: formatDate(response.data.startDate)
        };
      } else {
        this.eventControls = {
          ...response.data,
          startDate: ''
        };
      }
      if (response.data.endDate) {
        this.eventControls = {
          ...this.eventControls,
          endDate: formatDate(response.data.endDate)
        };
      }
      this.eventControls = {
        ...response.data,
        members: [...members]
      };
    } else {
      handleError(response.error);
    }
  }

  /**
   *
   *
   * @param {*} id
   * @memberof EventProfilePage
   */
  addAttendance(id) {
    const index = this.event.members.findIndex(member => member.id === id);
    if (this.event.infiniteDates) {
      this.eventControls.members[index].record.attendance = true;
      this.eventControls.members[index].record.absence = false;
    } else {
      this.eventControls.members[index].attendance = true;
      this.eventControls.members[index].absence = false;
    }
    this.updateAttendance({ index: index, attendance: true, absence: false });
  }

  /**
   *
   *
   * @param {*} id
   * @memberof EventProfilePage
   */
  addAbsence(id) {
    const index = this.event.members.findIndex(member => member.id === id);
    if (this.event.infiniteDates) {
      this.eventControls.members[index].record.attendance = false;
      this.eventControls.members[index].record.absence = true;
    } else {
      this.eventControls.members[index].attendance = false;
      this.eventControls.members[index].absence = true;
    }
    this.updateAttendance({ index: index, attendance: false, absence: true });
  }

  /**
   *
   *
   * @param {{ index: number; attendance: boolean; absence: boolean }} member
   * @memberof EventProfilePage
   */
  updateAttendance(member: { index: number; attendance: boolean; absence: boolean }) {
    if (this.event.infiniteDates) {
      const currentDate = {
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        year: new Date().getFullYear()
      };
      this.db.insertOrUpdateRecord({
        id: this.event.members[member.index].id,
        attendance: member.attendance,
        absence: member.absence,
        date: currentDate,
        event: this.event.name
      });
    } else {
      this.event.members[member.index].attendance = member.attendance;
      this.event.members[member.index].absence = member.absence;
    }
    try {
      const response = this.db.updateEvent(this.event);
      if (!response.success) {
        const opts = {
          header: 'Error!',
          message: 'Attendance was not updated due to an unknown error. Please try again'
        };
        this.showSimpleAlert(opts);
      }
    } catch (error) {
      const opts = {
        header: 'Error!',
        message: error
      };
      this.showSimpleAlert(opts);
    }
  }

  /**
   *
   *
   * @private
   * @param {ISimpleAlertOptions} options
   * @memberof EventProfilePage
   */
  private async showSimpleAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl
      .create({
        header: options.header,
        message: options.message,
        buttons: options.buttons
      });
    alert.present();
  }

  /**
   *
   *
   * @memberof EventProfilePage
   */
  async editEvent() {
    const modal = await this.modal.create({
      component: EditEventPage,
      componentProps: { id: this.id }
    });
    modal.present();
    modal.onDidDismiss().then(res => {
      if (res.data === 'delete') {
        this.navCtrl.back();
      } else if (res.data) {
        this.getEventProfile(res.data);
      }
    });
  }

  /**
   *
   *
   * @memberof EventProfilePage
   */
  async goToCalendar() {
    // const modal = await this.modal.create({
    //   component: CalendarPage,
    //   componentProps: { event: this.event.name }
    // });
    // modal.present();
    // modal.onDidDismiss().then(_ => {
    //   this.getEventProfile(this.id);
    // });
    this.navCtrl.navigateForward(`${this.homeURL}/${this.id}/calendar/${this.event.name}/${this.studentIds}`);
  }

  /**
   *
   *
   * @memberof EventProfilePage
   */
  async goToStats() {
    //   const modal = await this.modal.create({
    //     component: StatsPage,
    //     componentProps: { event: this.event.name }
    //   });
    //   modal.present();
    this.navCtrl.navigateForward(`${this.homeURL}/${this.id}/stats/${this.event.name}/${this.studentIds}`);
  }
}
