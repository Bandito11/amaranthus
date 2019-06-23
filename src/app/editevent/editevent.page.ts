import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Component, OnInit } from '@angular/core';
import { IStudent, IEvent, ISimpleAlertOptions } from '../common/models';
import { NavController, NavParams, Platform, ModalController, AlertController } from '@ionic/angular';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { handleError } from '../common/handleError';
import { CreatePage } from '../create/create.page';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { directory } from '../common/constants';

declare const fs;

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.page.html',
  styleUrls: ['./editevent.page.scss'],
})
export class EditEventPage implements OnInit {

  id;
  logo;
  students: IStudent[];
  STUDENTS: IStudent[];
  studentIds: string[];
  eventName;
  startDate;
  endDate;
  hasEndDate;
  event: IEvent;
  infiniteDates: boolean;

  htmlControls = {
    toolbar: {
      title: '',
      buttons: {
        add: '',
        edit: ''
      }
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
    delete: ''
  };

  LANGUAGE = {
    english: {
      toolbar: {
        title: 'Edit Event',
        buttons: {
          add: 'Add All',
          edit: 'Save'
        }
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
      delete: 'Delete'
    },
    spanish: {
      toolbar: {
        title: 'Editar Evento',
        buttons: {
          add: 'Añadir todos',
          edit: 'Editar'
        }
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
      delete: 'Borrar'
    }
  };
  language;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private camera: Camera,
    public platform: Platform,
    private modalCtrl: ModalController,
    private db: AmaranthusDBProvider,
    private alertCtrl: AlertController,
    private file: File,
    private storage: Storage,
    private webview: WebView,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getStudents();
    this.id = this.navParams.get('id');
    this.getEventProfile(this.id);
  }

  ionViewWillEnter() {
    this.storage.get('language').then(value => {
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
    this.logo = this.sanitizer.bypassSecurityTrustUrl(blob);
    if (chosenPic.files.length !== 0) {
      const reader = new FileReader();
      reader.onload = () => {
        fs.mkdir( directory, { recursive: true }, (err) => {
          if (err) {
            fs.writeFile(`${directory}${chosenPic.files[0].name}`, reader.result, {}, (err) => {
              if (err) {
                let options;
                if (this.language === 'spanish') {
                  options = {
                    header: '¡Información!',
                    message: err,
                    buttons: ['OK']
                  };
                } else {
                  options = {
                    header: 'Information!',
                    message: err,
                    buttons: ['OK']
                  };
                }
                this.showSimpleAlert(options);
              } else {
                this.logo = reader.result;
              }
            });
          } else {
            this.getPicture();
          }
        });
      };
      reader.readAsDataURL(chosenPic.files[0]);
      // const blob = window.URL.createObjectURL(chosenPic.files[0]);
      // this.picture = this.sanitizer.bypassSecurityTrustUrl(blob);
    }
  }

  addAll() {
    for (const student of this.STUDENTS) {
      this.addToEvent(student.id);
    }
  }

  getEventProfile(id) {
    this.studentIds = [];
    const response = this.db.getEvent(id);
    if (response.success) {
      this.event = { ...response.data };
      this.infiniteDates = this.event.infiniteDates;
      this.logo = response.data.logo;
      this.eventName = response.data.name;
      this.startDate = response.data.startDate;
      this.endDate = response.data.endDate;
      // this.students = members;
      this.studentIds = response.data.members.map(member => member.id);
    } else {
      handleError(response.error);
    }
  }

  resetEndDate() {
    this.endDate = '';
  }

  async editEvent() {
    try {
      if (this.studentIds.length < 1) {
        let opts: ISimpleAlertOptions;
        if (this.language === 'spanish') {
          opts = {
            header: 'Error',
            message: '¡Tienes que escoger por lo menos un usario de la lista!'
          };
        } else {
          opts = {
            header: 'Error',
            message: 'Have to choose at least one user from the list!'
          };
        }
        this.showSimpleAlert(opts);
        return;
      }
      if (!this.startDate && !this.infiniteDates) {
        let opts: ISimpleAlertOptions;
        if (this.language === 'spanish') {
          opts = {
            header: 'Error',
            message: 'Tienes que escoger una fecha de inicio!'
          };
        } else {
          opts = {
            header: 'Error',
            message: 'Have to choose a start date!'
          };
        }
        this.showSimpleAlert(opts);
        return;
      }
      if (!this.eventName) {
        let opts: ISimpleAlertOptions;
        if (this.language === 'spanish') {
          opts = {
            header: 'Error',
            message: '¡Tienes que escribir un nombre para el evento!'
          };
        } else {
          opts = {
            header: 'Error',
            message: 'Have to write a name for the event!'
          };
        }
        this.showSimpleAlert(opts);
        return;
      }
      if (this.eventName.includes('#') || this.eventName.includes('/') || this.eventName.includes('%')) {
        let options: ISimpleAlertOptions = {
          header: '',
          message: '',
          buttons: []
        }
        if (this.language === 'spanish') {
          options = {
            ...options,
            header: '¡Advertencia!',
            message: 'El campo de ID no puede contener "#" o "/" o "%".',
            buttons: ['Si']
          };

        } else {
          options = {
            ...options,
            header: 'Warning!',
            message: 'The ID field can\'t contain "#" or "/" or "%"',
            buttons: ['Ok']
          };
        }
        this.showSimpleAlert(options);
        return;
      }
      const members = this.studentIds.map(studentId => {
        const member = this.event.members.find(data => studentId === data.id);
        if (member) {
          return member;
        } else {
          return {
            id: studentId,
            attendance: false,
            absence: false
          };
        }
      });
      this.event = {
        ...this.event,
        logo: this.logo,
        name: this.eventName,
        startDate: '',
        members: [...members],
        endDate: '',
        infiniteDates: this.infiniteDates
      };
      if (!this.event.infiniteDates) {
        this.event = {
          ...this.event,
          startDate: this.startDate
        };
      }
      if (this.endDate && !this.event.infiniteDates) {
        this.event = {
          ...this.event,
          endDate: this.endDate
        };
      } else if (!this.hasEndDate) {
        this.resetEndDate();
      }
      if (this.language === 'spanish') {
        const alert = await this.alertCtrl.create({
          header: '¡Advertencia!',
          message: `¿Estás seguro que quieres editar el evento ${this.eventName}?`,
          buttons: [
            { text: 'No' },
            {
              text: 'Si',
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                const response = this.db.updateEvent(this.event);
                if (response.success === true) {
                  navTransition.then(() => {
                    const options = {
                      header: '¡Éxito!',
                      message: `${this.eventName} fue editado exitosamente.`
                    };
                    this.showAdvancedAlert(options);
                  });
                } else {
                  const options = {
                    header: 'Error',
                    message: 'Usuario no se pudo editar. Por favor trate de nuevo.'
                  };
                  navTransition.then(() => this.showAdvancedAlert(options));
                }
                return false;
              }
            }
          ]
        });
        alert.present();
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Warning!',
          message: `Are you sure you want to edit ${this.eventName} event?`,
          buttons: [
            { text: 'No' },
            {
              text: 'Yes',
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                const response = this.db.updateEvent(this.event);
                if (response.success === true) {
                  navTransition.then(() => {
                    const options = {
                      header: 'Success!',
                      message: `${this.eventName} was edited successfully.`
                    };
                    this.showAdvancedAlert(options);
                  });
                } else {
                  const options = {
                    header: 'Error',
                    message: 'User couldn\'t be edited. Please try again!'
                  };
                  navTransition.then(() => this.showAdvancedAlert(options));
                }
                return false;
              }
            }
          ]
        });
        alert.present();
      }
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
    const response = this.db.getAllStudents(true);
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
      if (student.id === query ||
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
    if (this.platform.is('cordova')) {
      const options: CameraOptions = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        destinationType: this.camera.DestinationType.FILE_URI,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.PNG,
        targetWidth: 250,
        targetHeight: 250
      };
      this.camera.getPicture(options)
        .then((imageData: string) => {
          if (this.platform.is('android')) {
            this.logo = this.webview.convertFileSrc(imageData);
            return 0;
          }
          const array = imageData.split('/');
          const fileName = array.pop();
          const directory = array.slice(0, array.length).join('/');
          const path = this.file.dataDirectory;
          const outDirectory = 'images';
          this.file.checkDir(path, outDirectory).then(() => {
            this.file.copyFile(directory, fileName, path + outDirectory, fileName)
              .then(image => this.logo = this.webview.convertFileSrc(image.nativeURL))
              .catch(e => {
                if (e.code === 12) {
                  this.logo = this.webview.convertFileSrc(path + outDirectory + fileName);
                  return 0;
                }
                const opts: ISimpleAlertOptions = {
                  header: 'Error!',
                  message: JSON.stringify(e)
                };
                this.showSimpleAlert(opts);
              });
          }).catch(() => {
            this.file.createDir(path, outDirectory, true).then(() => {
              this.file.copyFile(directory, fileName, path + outDirectory, fileName)
                .then(image => this.logo = this.webview.convertFileSrc(image.nativeURL))
                .catch(e => {
                  if (e.code === 12) {
                    this.logo = this.webview.convertFileSrc(path + outDirectory + fileName);
                    return 0;
                  }
                  const opts: ISimpleAlertOptions = {
                    header: 'Error',
                    message: JSON.stringify(e)
                  };
                  this.showSimpleAlert(opts);
                });
            });
          });
        },
          error => handleError(error)
        );
    } else {
      // Only for Dev Purposes
      // this.logo = `https://firebasestorage.googleapis.com/v0/b/ageratum-ec8a3.appspot.com
      // /o/cordova_logo_normal_dark.png?alt=media&token=3b89f56e-8685-4f56-b5d7-2441f8857
      // f97`;
    }
  }

  addToEvent(id) {
    if (this.studentIds.indexOf(id) === -1) { this.studentIds = [...this.studentIds, id]; }
  }

  removeFromEvent(id) {
    const newStudentIds = [
      ...this.studentIds.slice(0, this.studentIds.indexOf(id)),
      ...this.studentIds.slice(this.studentIds.indexOf(id) + 1,
        this.studentIds.length)
    ];
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

  /**
   *
   * @param options
   * Show a message on the screen
   */
  private async showSimpleAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl.create({
      header: options.header,
      message: options.message,
      buttons: options.buttons
    });
    alert.present();
  }

  async showAdvancedAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl.create({
      header: options.header,
      message: options.message,
      buttons: [{
        text: 'OK',
        handler: () => {
          // user has clicked the alert button
          // begin the alert's dismiss transition
          alert.dismiss()
            .then(() => {
              if (options['event'] === 'delete') {
                this.navCtrl.navigateRoot('/tabs/tabs/home/events').then(() => this.modalCtrl.dismiss());
              } else {
                this.modalCtrl.dismiss(this.id);
              }
            });
          return false;
        }
      }]
    });
    alert.present();
  }

  async removeEvent() {
    try {
      if (this.language === 'spanish') {
        const alert = await this.alertCtrl.create({
          header: '¡Advertencia!',
          message: `¿Estás seguro que quieres borrar el evento ${this.eventName}?`,
          buttons: [
            { text: 'No' },
            {
              text: 'Si',
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                const response = this.db.removeEvent(this.event);
                if (response.success === true) {
                  this.id = undefined;
                  navTransition.then(() => {
                    const opts = {
                      header: '¡éxisto!',
                      message: '¡El evento se borro exitosamente!',
                      event: 'delete'
                    };
                    this.showAdvancedAlert(opts);
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
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Warning!',
          message: `Are you sure you want to delete ${this.eventName} event?`,
          buttons: [
            { text: 'No' },
            {
              text: 'Yes',
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                const response = this.db.removeEvent(this.event);
                if (response.success === true) {
                  this.id = undefined;
                  navTransition.then(() => {
                    const opts = {
                      header: 'Success!',
                      message: 'Event was removed successfully!',
                      event: 'delete'
                    };
                    this.showAdvancedAlert(opts);
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
      }

    } catch (error) {
      handleError(error);
    }
  }

}
