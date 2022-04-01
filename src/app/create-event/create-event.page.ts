import { Component, OnInit } from '@angular/core';
import { IStudent, ISimpleAlertOptions, IEvent } from '../common/models';
import {
  NavController,
  Platform,
  ModalController,
  AlertController,
} from '@ionic/angular';
import { addZeroInFront } from '../common/validation';
import { handleError } from '../common/handleError';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseService } from '../services/database.service';

declare const fs;
declare const process;

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
    public camera: Camera,
    public platform: Platform,
    public modalCtrl: ModalController,
    public dbService: DatabaseService,
    public alertCtrl: AlertController,
    private file: File,
    private storage: Storage,
    private webview: WebView,
    private sanitizer: DomSanitizer
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

  getPicture() {
    const chosenPic: HTMLInputElement = document.querySelector('#inputFile');
    const blob = window.URL.createObjectURL(chosenPic.files[0]);
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(blob);
    let directory = '';
    if (navigator.userAgent.match('Mac')) {
      directory = `${process.env.HOME}/Attendance-Log-Tracker/`;
    } else if (navigator.userAgent.match('Windows')) {
      directory = `${process.env.USERPROFILE}/Attendance-Log-Tracker/`;
    }
    if (chosenPic.files.length !== 0) {
      const reader = new FileReader();
      reader.onload = () => {
        fs.mkdir(directory, { recursive: true }, (err) => {
          if (err) {
            fs.writeFile(
              `${directory}${chosenPic.files[0].name}`,
              reader.result,
              {},
              (error) => {
                if (error) {
                  let options;
                  if (this.language === 'spanish') {
                    options = {
                      header: '¡Información!',
                      message: error,
                      buttons: ['OK'],
                    };
                  } else {
                    options = {
                      header: 'Information!',
                      message: error,
                      buttons: ['OK'],
                    };
                  }
                  this.showSimpleAlert(options);
                } else {
                  this.logo = reader.result;
                }
              }
            );
          } else {
            this.getPicture();
          }
        });
      };
      reader.readAsDataURL(chosenPic.files[0]);
    }
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
      if (eventData.studentIds.length < 1) {
        let opts: ISimpleAlertOptions;
        if (this.language === 'spanish') {
          opts = {
            header: 'Error',
            message: '¡Tienes que escoger por lo menos un usario de la lista!',
          };
        } else {
          opts = {
            header: 'Error',
            message: 'Have to choose at least one user from the list!',
          };
        }
        this.showSimpleAlert(opts);
        return;
      }
      if (!eventData.startDate && !eventData.infiniteDates) {
        let opts: ISimpleAlertOptions;
        if (this.language === 'spanish') {
          opts = {
            header: 'Error',
            message: 'Tienes que escoger una fecha de inicio!',
          };
        } else {
          opts = {
            header: 'Error',
            message: 'Have to choose a start date!',
          };
        }
        this.showSimpleAlert(opts);
        return;
      }
      if (!eventData.name) {
        let opts: ISimpleAlertOptions;
        if (this.language === 'spanish') {
          opts = {
            header: 'Error',
            message: '¡Tienes que escribir un nombre para el evento!',
          };
        } else {
          opts = {
            header: 'Error',
            message: 'Have to write a name for the event!',
          };
        }
        this.showSimpleAlert(opts);
        return;
      }
      if (
        eventData.name.includes('#') ||
        eventData.name.includes('/') ||
        eventData.name.includes('%')
      ) {
        let options: ISimpleAlertOptions = {
          header: '',
          message: '',
          buttons: [],
        };
        if (this.language === 'spanish') {
          options = {
            ...options,
            header: '¡Advertencia!',
            message: 'El campo de ID no puede contener "#" o "/" o "%".',
            buttons: ['Si'],
          };
        } else {
          options = {
            ...options,
            header: 'Warning!',
            message: 'The ID field can\'t contain "#" or "/" or "%"',
            buttons: ['Ok'],
          };
        }
        this.showSimpleAlert(options);
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
          let opts: ISimpleAlertOptions;
          if (this.language === 'spanish') {
            opts = {
              header: '¡Error!',
              message:
                'Si el evento tiene una fecha final entonces tambien debe de tener una fecha de inicio.',
            };
          } else {
            opts = {
              header: 'Error!',
              message:
                'If the event had an end date it has to have a start date.',
            };
          }
          this.showSimpleAlert(opts);
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
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                try {
                  this.dbService.insertEvent(newEvent);
                  navTransition.then(() => {
                    const options = {
                      header: '¡Éxito!',
                      message: `${eventData.name} fue creado.`,
                    };
                    this.showAdvancedAlert(options, false);
                  });
                } catch (error) {
                  const options = {
                    header: 'Error',
                    message: 'Evento ya existe.',
                  };
                  this.showAdvancedAlert(options, true);
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
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                try {
                  this.dbService.insertEvent(newEvent);
                  navTransition.then(() => {
                    const options = {
                      header: 'Success!',
                      message: `${eventData.name} was created.`,
                    };
                    this.showAdvancedAlert(options, false);
                  });
                } catch (error) {
                  const options = {
                    header: 'Error',
                    message: 'Event already exits! ',
                  };
                  this.showAdvancedAlert(options, true);
                }
                return false;
              },
            },
          ],
        });
        alert.present();
      }
    } catch (error) {
      const opts: ISimpleAlertOptions = {
        header: 'Error',
        message: error,
      };
      this.showSimpleAlert(opts);
    }
  }

  getStudents() {
    try {
      const students = this.dbService.getAllStudents(true);
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

  addLogo() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 250,
      targetHeight: 250,
    };
    this.camera.getPicture(options).then(
      (imageData: string) => {
        if (this.platform.is('android')) {
          this.logo = this.webview.convertFileSrc(imageData);
          return 0;
        }
        const array = imageData.split('/');
        const fileName = array.pop();
        const directory = array.slice(0, array.length).join('/');
        const path = this.file.dataDirectory;
        const outDirectory = 'images';
        this.file
          .checkDir(path, outDirectory)
          .then(() => {
            this.file
              .copyFile(directory, fileName, path + outDirectory, fileName)
              .then((image) => {
                this.logo = this.webview.convertFileSrc(image.nativeURL);
                this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(
                  this.webview.convertFileSrc(image.nativeURL)
                );
              })
              .catch((e) => {
                if (e.code === 12) {
                  this.logo = this.webview.convertFileSrc(
                    path + outDirectory + fileName
                  );
                  this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(
                    this.webview.convertFileSrc(path + outDirectory + fileName)
                  );
                  return 0;
                }
                const opts: ISimpleAlertOptions = {
                  header: 'Error!',
                  message: JSON.stringify(e),
                };
                this.showSimpleAlert(opts);
              });
          })
          .catch(() => {
            this.file.createDir(path, outDirectory, true).then(() => {
              this.file
                .copyFile(directory, fileName, path + outDirectory, fileName)
                .then((image) => {
                  this.logo = this.webview.convertFileSrc(image.nativeURL);
                  this.logo = this.sanitizer.bypassSecurityTrustUrl(
                    this.webview.convertFileSrc(image.nativeURL)
                  );
                })
                .catch((e) => {
                  if (e.code === 12) {
                    this.logo = this.webview.convertFileSrc(
                      path + outDirectory + fileName
                    );
                    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(
                      this.webview.convertFileSrc(
                        path + outDirectory + fileName
                      )
                    );
                    return 0;
                  }
                  const opts: ISimpleAlertOptions = {
                    header: 'Error',
                    message: JSON.stringify(e),
                  };
                  this.showSimpleAlert(opts);
                });
            });
          });
      },
      (error) => handleError(error)
    );
  }

  private async showSimpleAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl.create({
      header: options.header,
      message: options.message,
      buttons: options.buttons,
    });
    alert.present();
  }

  private async showAdvancedAlert(options: ISimpleAlertOptions, fail: boolean) {
    const alert = await this.alertCtrl.create({
      header: options.header,
      message: options.message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // user has clicked the alert button
            // begin the alert's dismiss transition
            if (!fail) {
              alert.dismiss().then(() => {
                this.modalCtrl.dismiss();
              });
              return false;
            }
          },
        },
      ],
    });
    alert.present();
  }
}
