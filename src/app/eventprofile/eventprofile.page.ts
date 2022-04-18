import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IEvent, IEventControls } from '../common/models';
import {
  NavController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { MONTHSLABELS } from '../common/constants';
import { formatDate } from '../common/format';
import { EditEventPage } from '../editevent/editevent.page';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';
import { handleError } from '../common/handleError';

@Component({
  selector: 'app-eventprofile',
  templateUrl: './eventprofile.page.html',
  styleUrls: ['./eventprofile.page.scss'],
})
export class EventProfilePage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private toastController: ToastController,
    private modal: ModalController,
    private storage: Storage
  ) {}

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

  htmlControls = {
    toolbar: {
      buttons: {
        edit: '',
        calendar: '',
        stats: '',
      },
    },
    from: '',
    to: '',
    today: '',
    name: '',
    phone: '',
    class: '',
    attended: '',
    absence: '',
    present: '',
    absent: '',
  };

  LANGUAGE = {
    english: {
      toolbar: {
        buttons: {
          edit: 'Edit',
          calendar: 'Calendar',
          stats: 'Stats',
        },
      },
      from: 'From to: ',
      to: 'to: ',
      today: 'Today is: ',
      name: 'Name: ',
      phone: 'Phone Number: ',
      class: 'Class: ',
      attended: 'Attended',
      absence: 'Absent',
      present: `'s present today!`,
      absent: `'s absent today!`,
    },
    spanish: {
      toolbar: {
        buttons: {
          edit: 'Editar',
          calendar: 'Calendario',
          stats: 'Estadísticas',
        },
      },
      from: 'Desde: ',
      to: 'hasta: ',
      today: 'Hoy es: ',
      name: 'Nombre: ',
      phone: 'Teléfono: ',
      class: 'Clase: ',
      attended: 'Asistió',
      absence: 'Ausente',
      present: ` está presente hoy.`,
      absent: ` está ausente hoy.`,
    },
  };

  language;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const date = new Date();
    this.currentDate = `${
      MONTHSLABELS[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  ionViewWillEnter() {
    this.storage.get('language').then((value) => {
      if (value) {
        this.language = value;
        this.htmlControls = this.LANGUAGE[value];
      } else {
        this.language = 'english';
        this.htmlControls = this.LANGUAGE['english'];
      }
      this.getEventProfile(this.id);
    });
  }

  /**
   *
   *
   * @param {*} id
   * @memberof EventProfilePage
   */
  async getEventProfile(id) {
    this.eventControls = <IEvent & LokiObj>{};
    const date = new Date();
    const event = await this.dbService.getEvent(id);
    if (!event) {
      throw new Error(`Couldn't find this event in db.`);
    }
    this.event = { ...event };
    const members = [];
    this.studentIds = [];
    try {
    for (const member of this.event.members) {
      this.studentIds = [...this.studentIds, member.id];
      const student = await this.dbService.getStudentById(member.id);
      if (student) {
        if (this.event.infiniteDates) {
          let record = this.dbService.getQueriedRecordsByCurrentDate({
            event: this.event.name,
            studentId: student.id,
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
          });
          if (!record) {
            record = {
              id: '',
              year: 0,
              month: 0,
              day: 0,
              attendance: false,
              absence: false,
            };
          }
          members.push({
            id: student.id,
            firstName: student.firstName,
            initial: student.initial,
            lastName: student.lastName,
            phoneNumber: student.phoneNumber,
            picture: student.picture,
            class: student.class,
            attendance: member.attendance,
            absence: member.absence,
            record: record,
          });
        } else {
          members.push({
            id: student.id,
            firstName: student.firstName,
            initial: student.initial,
            lastName: student.lastName,
            phoneNumber: student.phoneNumber,
            picture: student.picture,
            class: student.class,
            attendance: member.attendance,
            absence: member.absence,
          });
        }
      }
    }
    } catch (error) {
     // I dont know what to do here
    }
    this.eventControls = {
      ...event,
      members: members,
    };
    if (event.startDate) {
      this.eventControls = {
        ...this.eventControls,
        startDate: formatDate(event.startDate),
      };
    } else {
      this.eventControls = {
        ...this.eventControls,
        startDate: '',
      };
    }
    if (event.endDate) {
      this.eventControls = {
        ...this.eventControls,
        endDate: formatDate(event.endDate),
      };
    }
    this.eventControls = {
      ...this.eventControls,
      logo: event.logo,
    };
  }

  /**
   *
   *
   * @param {*} id
   * @memberof EventProfilePage
   */
  addAttendance(id) {
    const index = this.event.members.findIndex((member) => member.id === id);
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
    const index = this.event.members.findIndex((member) => member.id === id);
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
  async updateAttendance(member: {
    index: number;
    attendance: boolean;
    absence: boolean;
  }) {
    if (this.event.infiniteDates) {
      const currentDate = {
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        year: new Date().getFullYear(),
      };
      this.dbService.insertOrUpdateRecord({
        id: this.event.members[member.index].id,
        attendance: member.attendance,
        absence: member.absence,
        date: currentDate,
        event: this.event.name,
      });
    } else {
      this.event.members[member.index].attendance = member.attendance;
      this.event.members[member.index].absence = member.absence;
    }
    try {
      await this.dbService.updateEvent(this.event);
      const language = await this.storage.get('language');
      if (language === 'spanish') {
        const toast = await this.toastController.create({
          message: 'Asistencia actualizada',
          duration: 3000,
          color: 'success',
          position: 'top'
        });
        await toast.present();
      } else {
        const toast = await this.toastController.create({
          message: 'Attendance updated',
          duration: 3000,
          color: 'success',
          position: 'top'
        });
        await toast.present();
      }
    } catch (error) {
      handleError(error);
    }
  }

  /**
   *
   *
   * @memberof EventProfilePage
   */
  async editEvent() {
    const modal = await this.modal.create({
      component: EditEventPage,
      componentProps: { id: this.id },
    });
    modal.present();
    modal.onDidDismiss().then((res) => {
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
    this.navCtrl.navigateForward(
      `${this.homeURL}/${this.id}/calendar/${this.event.name}/${this.studentIds}`
    );
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
    this.navCtrl.navigateForward(
      `${this.homeURL}/${this.id}/stats/${this.event.name}/${this.studentIds}`
    );
  }
}
