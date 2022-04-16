import { Component, OnInit } from '@angular/core';
import { IStudent, ISimpleAlertOptions, IEvent } from '../common/models';
import {
  NavController,
  Platform,
  ModalController,
  AlertController,
} from '@ionic/angular';
import { addZeroInFront } from '../common/validation';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';
import { handleError } from '../common/handleError';
import { toastController } from '@ionic/core';

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
  language;
  imgSrc;

  htmlControls = {
    toolbar: {
      title: '',
      buttons: {
        add: '',
        create: '',
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
  };

  LANGUAGE = {
    english: {
      toolbar: {
        title: 'Create Event',
        buttons: {
          add: 'Add All',
          create: 'Create',
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
    },
    spanish: {
      toolbar: {
        title: 'Crear Evento',
        buttons: {
          add: 'Añadir todos',
          create: 'Crear',
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
    },
  };

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public dbService: DatabaseService,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.logo = '';
    this.studentIds = [];
    this.getStudents();
    const currentDate = new Date();
    this.startDate = `${currentDate.getFullYear()}-${addZeroInFront(
      currentDate.getMonth() + 1
    )}-${addZeroInFront(currentDate.getDate())}`;
    this.endDate = ``;
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

  resetEndDate() {
    this.endDate = '';
  }

  addAll() {
    for (const student of this.STUDENTS) {
      // this.addToEvent(student.id);
    }
  }

  async createNewEvent(eventData) {
    try {
      let message;
      if (eventData.studentIds.length < 1) {
        if (this.language === 'spanish') {
          message = '¡Tienes que escoger por lo menos un usario de la lista!';
        } else {
          message = 'Have to choose at least one user from the list!';
        }
        handleError(message);
        return;
      }
      if (!eventData.startDate && !eventData.infiniteDates) {
        if (this.language === 'spanish') {
          message = 'Tienes que escoger una fecha de inicio!';
        } else {
          message = 'Have to choose a start date!';
        }
        handleError(message);
        return;
      }
      if (!eventData.name) {
        let opts: ISimpleAlertOptions;
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
        if (this.language === 'spanish') {
          message = 'El campo de ID no puede contener "#" o "/" o "%".';
        } else {
          message = 'The ID field can\'t contain "#" or "/" or "%"';
        }
        handleError(message);
        return;
      }
      const members = eventData.studentIds.map((studentId) => {
        return {
          id: studentId,
          attendance: false,
          absence: false,
          record: [],
        };
      });
      let newEvent: IEvent = {
        logo: eventData.logo,
        name: eventData.name,
        startDate: '',
        members: members,
        endDate: '',
        infiniteDates: eventData.infiniteDates,
      };
      if (!newEvent.infiniteDates) {
        newEvent = {
          ...newEvent,
          startDate: eventData.startDate,
        };
      }
      if (eventData.endDate && !newEvent.infiniteDates) {
        if (!eventData.startDate) {
          if (this.language === 'spanish') {
            message =
              'Si el evento tiene una fecha final entonces tambien debe de tener una fecha de inicio.';
          } else {
            message =
              'If the event had an end date it has to have a start date.';
          }
          handleError(message);
        } else {
          newEvent = {
            ...newEvent,
            endDate: eventData.endDate,
          };
        }
      } else if (!eventData.hasEndDate) {
        this.resetEndDate();
      }
      if (this.language === 'spanish') {
        const alert = await this.alertCtrl.create({
          header: '¡Advertencia!',
          message: `¿Estás seguro que quieres crear un nuevo evento ${eventData.name}?`,
          buttons: [
            { text: 'No' },
            {
              text: 'Si',
              handler: async () => {
                alert.dismiss();
                try {
                  this.dbService.insertEvent(newEvent);
                  message = `${eventData.name} fue creado.`;
                  const toast = await toastController.create({
                    message,
                    duration: 2000,
                    color: 'success',
                  });
                  toast.present();
                } catch (error) {
                  message = 'Evento ya existe.';

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
          message: `Are you sure you want to create a new ${eventData.name}?`,
          buttons: [
            { text: 'No' },
            {
              text: 'Yes',
              handler: async () => {
                alert.dismiss();
                try {
                  this.dbService.insertEvent(newEvent);
                  message = `${eventData.name} was created.`;
                  const toast = await toastController.create({
                    message,
                    duration: 2000,
                    color: 'success',
                  });
                  toast.present();
                } catch (error) {
                  message = 'Event already exits! ';
                  handleError(error);
                }
                await this.modalCtrl.dismiss();
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
      const students = await this.dbService.getAllStudents(true);
      this.students = students;
      this.STUDENTS = students;
    } catch (error) {
      this.students = [];
      this.STUDENTS = [];
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
    const newQuery = students.filter((student) => {
      fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      if (
        student.id === query ||
        student.firstName.toLowerCase().includes(query.toLowerCase()) ||
        student.lastName.toLowerCase().includes(query.toLowerCase()) ||
        fullName === query.toLowerCase()
      ) {
        return student;
      }
    });
    this.students = [...newQuery];
  }
}
