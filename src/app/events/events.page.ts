import { DomSanitizer } from '@angular/platform-browser';
import { CreateEventPage } from './../create-event/create-event.page';
import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AmaranthusDBProvider } from 'src/app/services/amaranthus-db/amaranthus-db';
import { formatDate } from '../common/format';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage {

  selectOptions: string[] = ['Attendance', 'Absence', 'Name', 'Date', 'None'];
  events: any[] = [];
  unfilteredEvents: any[] = [];
  homeURL = '/tabs/tabs/home/events';
  htmlControls = {
    toolbar: {
      title: '',
      buttons: {
        add: ''
      }
    },
    sort: '',
    start: '',
    end: '',
    attended: '',
    absence: '',
    members: ''
  };
  LANGUAGE = {
    english: {
      toolbar: {
        title: 'Events',
        buttons: {
          add: 'Create event'
        }
      },
      sort: 'Sort By: ',
      start: 'Start Date: ',
      end: 'End Date: ',
      attended: 'Total Attended: ',
      absence: 'Total Absence: ',
      members: 'Total Members: '
    },
    spanish: {
      toolbar: {
        title: 'Eventos',
        buttons: {
          add: 'Crear evento'
        }
      },
      sort: 'Ordenar por: ',
      start: 'Inicia en:',
      end: 'Termina en: ',
      attended: 'Asistencia Total: ',
      absence: 'Ausencia Total: ',
      members: 'Membresía Total: '
    }
  };

  constructor(
    private navCtrl: NavController,
    private db: AmaranthusDBProvider,
    private modal: ModalController,
    private storage: Storage,
    private sanitizer: DomSanitizer
  ) { }

  goBack() {
    this.navCtrl.back();
  }


  ionViewDidEnter() {
    this.storage.get('language').then(value => {
      if (value) {
        this.htmlControls = this.LANGUAGE[value];
      } else {
        this.htmlControls = this.LANGUAGE['english'];
      }
    });
    this.getEvents();
  }

  sortData(option) {
    switch (option) {
      case 'Attendance':
        this.sortByAttendance();
        break;
      case 'Absence':
        this.sortByAbsence();
        break;
      case 'Name':
        this.sortByName();
        break;
      case 'Date':
        this.sortByDate();
        break;
      default:
        this.events = [...this.unfilteredEvents];
    }
  }

  sortByAttendance() {
    this.events = [
      ...this.events.sort((a, b) => {
        if (a.attendance < b.attendance) {
          return -1;
        }
        if (a.attendance > b.attendance) {
          return 1;
        }
        return 0;
      })
    ];
  }

  sortByAbsence() {
    this.events = [
      ...this.events.sort((a, b) => {
        if (a.absence < b.absence) {
          return -1;
        }
        if (a.absence > b.absence) {
          return 1;
        }
        return 0;
      })
    ];

  }

  sortByName() {
    this.events = [
      ...this.events.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
      })
    ];
  }

  sortByDate() {
    this.events = [
      ...this.events.sort((a, b) => {
        if (a.startDate < b.startDate) {
          return -1;
        }
        if (a.startDate > b.startDate) {
          return 1;
        }
        return 0;
      })
    ];
  }

  getEvents() {
    const response = this.db.getEvents();
    if (response.success) {
      this.events = response.data.map(data => {
        let attendance = 0, absence = 0;
        let totalMembers = 0;
        for (const member of data.members) {
          if (member.attendance) {
            attendance += 1;
          }
          if (member.absence) {
            absence += 1;
          }
          const studentExists = this.db.studentExists(member.id);
          if (studentExists) {
            totalMembers++;
          } else {
            this.db.updateEventMembers({ name: data.name, member: member });
          }
        }
        let event: any = {
          ...data,
          logo: this.sanitizer.bypassSecurityTrustUrl(data.logo),
          startDate: formatDate(data.startDate),
          totalMembers: totalMembers,
          totalAttendance: attendance,
          totalAbsence: absence
        };
        if (data.endDate) {
          event = {
            ...event,
            endDate: formatDate(data.endDate)
          };
        }
        return event;
      });
      this.unfilteredEvents = [...this.events];
    }
  }

  async goToCreateEvent() {
    const modal = await this.modal.create({
      component: CreateEventPage
    });
    modal.present();
    modal.onDidDismiss().then(_ => this.getEvents());
  }

  async goToEventProfile(id) {
    this.navCtrl.navigateForward(`${this.homeURL}/profile/${id}`);
  }

}
