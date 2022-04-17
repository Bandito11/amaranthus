import { Component, Input, OnInit } from '@angular/core';
import { IStudent, IEvent } from '../common/models';
import {
  NavController,
  Platform,
  ModalController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { handleError } from '../common/handleError';
import { CreatePage } from '../create/create.page';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.page.html',
  styleUrls: ['./editevent.page.scss'],
})
export class EditEventPage implements OnInit {
  @Input() id;
  students: IStudent[];
  studentIds: string[];
  hasEndDate;
   event: IEvent;
  language;
  imgSrc;

  htmlControls = {
    toolbar: {
      title: '',
      buttons: {
        add: '',
        edit: '',
      },
    },
    picture: '',
    reset: '',
    optional: '',
    eventName: '',
    placeholder: '',
    start: '',
    hasEnd: '',
    end: '',
    run: '',
    search: '',
    studentName: '',
    add: '',
    remove: '',
    added: '',
    notAdded: '',
    delete: '',
  };

  LANGUAGE = {
    english: {
      toolbar: {
        title: 'Edit Event',
        buttons: {
          add: 'Add All',
          edit: 'Save',
        },
      },
      picture: 'Add a Picture',
      reset: 'Reset',
      optional: 'Image is not required.',
      eventName: 'Name',
      placeholder: 'Write your Event Name',
      start: 'Start Date:',
      hasEnd: 'Has End Date?',
      end: 'End Date:',
      run: 'Run Indefinitely',
      search: 'Search by ID or Name',
      studentName: 'Name: ',
      add: 'Add',
      remove: 'Remove',
      added: ' was added to events list!',
      notAdded: ` wasn't added to events list!`,
      delete: 'Delete',
    },
    spanish: {
      toolbar: {
        title: 'Editar Evento',
        buttons: {
          add: 'Añadir todos',
          edit: 'Editar',
        },
      },
      picture: 'Añadir imagen',
      reset: 'Reiniciar',
      optional: 'La imagen no es requerido.',
      eventName: 'Nombre',
      placeholder: 'Escribe un nombre para el evento',
      start: 'Inicia en:',
      hasEnd: '¿Tiene fecha final?',
      end: 'Termina en:',
      run: 'Corre indefinidamente',
      search: 'Busca por ID or nombre',
      studentName: 'Nombre: ',
      add: 'Añadir',
      remove: 'Remover',
      added: ' fue añadido al evento.',
      notAdded: ` no fue añadido al evento.`,
      delete: 'Borrar',
    },
  };
  

  constructor(
    private navCtrl: NavController,
    public platform: Platform,
    private modalCtrl: ModalController,
    private dbService: DatabaseService,
    private alertCtrl: AlertController,
    private storage: Storage,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.event = {infiniteDates: false, logo: '', name: '', startDate: '', endDate: '', members: []};
    await this.getStudents();
    await this.getEventProfile(this.id);
  }

  ionViewWillEnter() {
    this.storage.get('language').then((value) => {
      if (value) {
        this.htmlControls = this.LANGUAGE[value];
        this.language = value;
      } else {
        this.language = 'english';
        this.htmlControls = this.LANGUAGE['english'];
      }
    });
  }

  async searchStudent(event) {
    const query = event;
    query
      ? (this.students = [...(await this.dbService.getStudent(query))])
      : this.getStudents();
  }


  async getEventProfile(id) {
    this.studentIds = [];
    try {
      this.event = await this.dbService.getEvent(id);
      this.imgSrc = this.event.logo;
      try {
        this.studentIds = this.event.members.map((member) => member.id);
      } catch (error) {
        this.studentIds = [];
      }
    } catch (error) {
      handleError(error);
    }
  }

  async editEvent(eventData) {
    try {
      if (eventData.studentIds.length < 1) {
        let message;

        if (this.language === 'spanish') {
          message = '¡Tienes que escoger por lo menos un usario de la lista!';
        } else {
          message = 'Have to choose at least one user from the list!';
        }
        handleError(message);

        return;
      }
      if (!eventData.startDate && !eventData.infiniteDates) {
        let message;
        if (this.language === 'spanish') {
          message = 'Tienes que escoger una fecha de inicio!';
        } else {
          message = 'Have to choose a start date!';
        }
        handleError(message);
        return;
      }
      if (!eventData.name) {
        let message;
        if (this.language === 'spanish') {
          message = '¡Tienes que escribir un nombre para el evento!';
        } else {
          message = 'Have to write a name for the event!';
        }
        handleError(message);
        return;
      }
      if (
        eventData.name.includes('#') ||
        eventData.name.includes('/') ||
        eventData.name.includes('%')
      ) {
        let message;
        if (this.language === 'spanish') {
          message = 'El campo de ID no puede contener "#" o "/" o "%".';
        } else {
          message = 'The ID field can\'t contain "#" or "/" or "%"';
        }
        handleError(message);
        return;
      }
      const members = eventData.studentIds.map((studentId) => {
        const member = this.event.members.find((data) => studentId === data.id);
        if (member) {
          return member;
        } else {
          return {
            id: studentId,
            attendance: false,
            absence: false,
          };
        }
      });
      this.event = {
        ...this.event,
        logo: eventData.logo,
        name: eventData.name,
        startDate: '',
        members: [...members],
        endDate: '',
        infiniteDates: eventData.infiniteDates,
      };
      if (!this.event.infiniteDates) {
        this.event = {
          ...this.event,
          startDate: eventData.startDate,
        };
      }
      if (eventData.endDate && !this.event.infiniteDates) {
        this.event = {
          ...this.event,
          endDate: eventData.endDate,
        };
      } else if (!eventData.hasEndDate) {
        eventData.endDate = '';
      }
      if (this.language === 'spanish') {
        const alert = await this.alertCtrl.create({
          header: '¡Advertencia!',
          message: `¿Estás seguro que quieres editar el evento ${eventData.name}?`,
          buttons: [
            { text: 'No' },
            {
              text: 'Si',
              handler: async () => {
                try {
                  let message;
                  await alert.dismiss();
                  await this.dbService.updateEvent(this.event);
                  message = `${eventData.name} fue editado exitosamente.`;

                  const toast = await this.toastController.create({
                    message,
                    duration: 2000,
                    color: 'success',
                  });

                  await toast.present();
                  await this.modalCtrl.dismiss(this.id);
                } catch (error) {
                  const message =
                    'Usuario no se pudo editar. Por favor trate de nuevo.';

                  handleError(message);
                }
                return false;
              },
            },
          ],
        });
        alert.present();
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Warning!',
          message: `Are you sure you want to edit ${eventData.name} event?`,
          buttons: [
            { text: 'No' },
            {
              text: 'Yes',
              handler: async () => {
                let message;
                await alert.dismiss();
                try {
                  await this.dbService.updateEvent(this.event);

                  message = `${eventData.name} was edited successfully.`;
                  const toast = await this.toastController.create({
                    message,
                    duration: 2000,
                    color: 'success',
                  });
                  await toast.present();
                  await this.modalCtrl.dismiss(this.id);
                } catch (error) {
                  message = `User couldn't be edited. Please try again!`;
                  handleError(message);
                }
                return false;
              },
            },
          ],
        });
        alert.present();
      }
    } catch (error) {
      handleError(error);
    }
  }

  async getStudents() {
    try {
      this.students = await this.dbService.getAllStudents(true);
    } catch (error) {
      this.students = [];
    }
  }


  removeFromEvent(id) {
    const newStudentIds = [
      ...this.studentIds.slice(0, this.studentIds.indexOf(id)),
      ...this.studentIds.slice(
        this.studentIds.indexOf(id) + 1,
        this.studentIds.length
      ),
    ];
    this.studentIds = [...newStudentIds];
  }

  async addStudent() {
    const modal = await this.modalCtrl.create({
      component: CreatePage,
    });
    modal.present();
    modal.onDidDismiss().then((_) => this.getStudents());
  }

  ifOnEventList(id) {
    if (this.studentIds.indexOf(id) !== -1) {
      return true;
    }
    return false;
  }

  async deleteEvent(event: IEvent) {
    if (this.language === 'spanish') {
      const alert = await this.alertCtrl.create({
        header: '¡Advertencia!',
        message: `¿Estás seguro que quieres borrar el evento ${event.name}?`,
        buttons: [
          { text: 'No' },
          {
            text: 'Si',
            handler: async () => {
              let message;
              await alert.dismiss();
              try {
                this.dbService.removeEvent(event);

                message = '¡El evento se borro exitosamente!';
                const toast = await this.toastController.create({
                  message,
                  duration: 2000,
                  color: 'success',
                });
                await toast.present();
                this.navCtrl
                  .navigateRoot('/tabs/tabs/home/events')
                  .then(() => this.modalCtrl.dismiss());
              } catch (error) {
                handleError(error);
              }
              return false;
            },
          },
        ],
      });
      alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Warning!',
        message: `Are you sure you want to delete ${event.name} event?`,
        buttons: [
          { text: 'No' },
          {
            text: 'Yes',
            handler: async () => {
              let message;
              await alert.dismiss();
              try {
                this.dbService.removeEvent(event);

                message = 'Event was removed successfully!';

                const toast = await this.toastController.create({
                  message,
                  duration: 2000,
                  color: 'success',
                });
                await toast.present();
                // this.navCtrl
                //   .navigateRoot('/tabs/tabs/home/events')
                //   .then(() => this.modalCtrl.dismiss());
                 await this.modalCtrl.dismiss()
                 await this.navCtrl.pop();
              } catch (error) {
                handleError(error);
              }
              return false;
            },
          },
        ],
      });
      alert.present();
    }
  }
}
