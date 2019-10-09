import { DomSanitizer } from '@angular/platform-browser';
import { OnInit, Component } from '@angular/core';
import { IStudent, IResponse, ISimpleAlertOptions } from '../common/models';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { AlertController, NavController, NavParams, Platform, ModalController } from '@ionic/angular';
import { handleError } from '../common/handleError';
import { trimText } from '../common/format';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';

declare const fs;
declare const process;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {


  // HTML controls
  picture;
  gender: string;
  isActive: boolean;

  // HTML values
  student: IStudent = {
    id: '',
    firstName: '',
    initial: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    town: '',
    state: '',
    class: '',
    fatherName: '',
    motherName: '',
    emergencyContactName: '',
    emergencyContactPhoneNumber: '',
    emergencyRelationship: '',
    picture: '',
    gender: '',
    isActive: false
  };

  htmlControls = {
    toolbar: {
      title: '',
      buttons: {
        save: ''
      }
    },
    change: '',
    reset: '',
    firstName: '',
    initial: '',
    lastName: '',
    gender: '',
    male: '',
    female: '',
    undisclosed: '',
    optional: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    class: '',
    father: '',
    mother: '',
    name: '',
    emergency: {
      title: '',
      relationship: ''
    },
    delete: ''
  };

  LANGUAGE = {
    english: {
      toolbar: {
        title: 'Edit Record',
        buttons: {
          save: 'Save'
        }
      },
      change: 'Change',
      reset: 'Reset',
      firstName: 'First Name',
      initial: 'Middle Name',
      lastName: 'Last Name',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      undisclosed: 'Undisclosed',
      optional: 'Optional',
      address: 'Address',
      phone: 'Phone Number',
      city: 'City',
      state: 'State',
      class: 'Class',
      father: 'Father',
      mother: 'Mother',
      name: 'Name',
      emergency: {
        title: 'Emergency Contact',
        relationship: 'Relationship'
      },
      delete: 'Delete'
    },
    spanish: {
      toolbar: {
        title: 'Editar Record',
        buttons: {
          save: 'Grabar'
        }
      },
      change: 'Cambiar',
      reset: 'Reiniciar',
      firstName: 'Nombre',
      initial: 'Segundo Nombre',
      lastName: 'Apellidos',
      gender: 'Género',
      male: 'Masculino',
      female: 'Femenino',
      undisclosed: 'No revelado',
      optional: 'Opcional',
      address: 'Dirección',
      phone: 'Teléfono',
      city: 'Ciudad',
      state: 'Estado',
      class: 'Clase',
      father: 'Padre',
      mother: 'Madre',
      name: 'Nombre',
      emergency: {
        title: 'Contacto de Emergencia',
        relationship: 'Relación'
      },
      delete: 'Borrar'
    }
  };

  language;
  imgSrc;

  constructor(
    private db: AmaranthusDBProvider,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private camera: Camera,
    private modalCtrl: ModalController,
    private webview: WebView,
    private file: File,
    public platform: Platform,
    private storage: Storage,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.student = { ...this.student, id: this.navParams.get('id') };
    try {
      const response = this.getStudentFromDB(this.student);
      if (response.success) {
        this.isActive = response.data.isActive;
        this.gender = response.data.gender;
        this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(response.data.picture);
        this.picture = response.data.picture;
        this.student = { ...response.data };
      }
    } catch (error) {
      handleError(error);
    }
  }

  ionViewWillEnter() {
    this.storage.get('language').then(value => {
      if (value) {
        this.language = value;
        this.htmlControls = this.LANGUAGE[value];
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
            fs.writeFile(`${directory}${chosenPic.files[0].name}`, reader.result, {}, error => {
              if (error) {
                let options;
                if (this.language === 'spanish') {
                  options = {
                    header: '¡Información!',
                    message: error,
                    buttons: ['OK']
                  };
                } else {
                  options = {
                    header: 'Information!',
                    message: error,
                    buttons: ['OK']
                  };
                }
                this.showSimpleAlert(options);
              } else {
                this.picture = reader.result;
              }
            });
          } else {
            fs.writeFile(`${directory}${chosenPic.files[0].name}`, reader.result, {}, error => {
              if (error) {
                let options;
                if (this.language === 'spanish') {
                  options = {
                    header: '¡Información!',
                    message: error,
                    buttons: ['OK']
                  };
                } else {
                  options = {
                    header: 'Information!',
                    message: error,
                    buttons: ['OK']
                  };
                }
                this.showSimpleAlert(options);
              } else {
                this.picture = reader.result;
              }
            });
          }
        });
      };
      reader.readAsDataURL(chosenPic.files[0]);
      // const blob = window.URL.createObjectURL(chosenPic.files[0]);
      // this.picture = this.sanitizer.bypassSecurityTrustUrl(blob);
    }
  }

  /**
   * Browse phone gallery
   *
   * @memberof EditPage
   */
  async browsePicture() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 250,
      targetHeight: 250
    };
    const alert = await this.alertCtrl.create({
      header: 'Information!',
      message: 'Get picture from photo album or camera.',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary'
      }, {
        text: 'Browse Photo Album',
        handler: () => {
          options = {
            ...options,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
          };
          this.getPictureFromNativeCamera(options);
        }
      }, {
        text: 'Take a picture!',
        handler: () => {
          options = {
            ...options,
            sourceType: this.camera.PictureSourceType.CAMERA,
          };
          this.getPictureFromNativeCamera(options);
        }
      }]
    });
    await alert.present();
  }

  getPictureFromNativeCamera(options: CameraOptions) {
    this.camera.getPicture(options)
      .then((imageData: string) => {
        if (this.platform.is('android')) {
          this.picture = this.webview.convertFileSrc(imageData);
          this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(this.picture);
          return 0;
        }
        const array = imageData.split('/');
        const fileName = array.pop();
        const directory = array.slice(0, array.length).join('/');
        const path = this.file.dataDirectory;
        const outDirectory = 'images';
        this.file.checkDir(path, outDirectory).then(() => {
          this.file.copyFile(directory, fileName, path + outDirectory, fileName)
            .then(image => {
              this.picture = this.webview.convertFileSrc(image.nativeURL);
              this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(this.picture);
            })
            .catch(e => {
              if (e.code === 12) {
                this.picture = this.webview.convertFileSrc(path + outDirectory + fileName);
                this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(this.picture);
                return 0;
              }
              const opts: ISimpleAlertOptions = {
                header: 'Error!',
                message: JSON.stringify(e)
              };
              this.showSimpleAlert(opts);
            });
        })
          .catch(() => {
            this.file.createDir(path, outDirectory, true).then(() => {
              this.file.copyFile(directory, fileName, path + outDirectory, fileName)
                .then(image => {
                  this.picture = this.webview.convertFileSrc(image.nativeURL);
                  this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(this.picture);
                })
                .catch(e => {
                  if (e.code === 12) {
                    this.picture = this.webview.convertFileSrc(path + outDirectory + fileName);
                    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(this.picture);
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
  }

  getStudentFromDB(student: IStudent): IResponse<IStudent> {
    try {
      const response = this.db.getStudentById(student);
      return response;
    } catch (error) {
      handleError(error);
    }
  }

  async deleteStudent(opts) {
    if (this.language === 'spanish') {
      const alert = await this.alertCtrl.create({
        header: '¡Advertencia!',
        message: '¿Estas seguro que quieres borrar este récord?',
        buttons: [
          {
            text: 'No'
          },
          {
            text: 'Si',
            handler: () => {
              let options: ISimpleAlertOptions = {
                header: '¡Éxito!',
                message: 'El estudiante fue borrado.'
              };
              // user has clicked the alert button
              // begin the alert's dismiss transition
              const navTransition = alert.dismiss();
              const response = {
                ...this.db.removeStudent(opts)
              };
              if (response.success === true) {
                options = {
                  ...options,
                  event: 'delete'
                };
                navTransition.then(() => this.showAdvancedAlert(options));
              } else {
                handleError(response.error);
                options = {
                  header: 'Error',
                  message: 'Hubo un error tratando de borrar este récord. Por favor trate de nuevo.'
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
        message: 'Are you sure you want to delete this record?',
        buttons: [
          {
            text: 'No'
          },
          {
            text: 'Yes',
            handler: () => {
              let options: ISimpleAlertOptions = {
                header: 'Success!',
                message: 'Student was deleted.'
              };
              // user has clicked the alert button
              // begin the alert's dismiss transition
              const navTransition = alert.dismiss();
              const response = {
                ...this.db.removeStudent(opts)
              };
              if (response.success === true) {
                options = {
                  ...options,
                  event: 'delete'
                };
                navTransition.then(() => this.showAdvancedAlert(options));
              } else {
                handleError(response.error);
                options = {
                  header: 'Error',
                  message: 'There was an error trying to delete the record. Please try again.'
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
  }

  async editStudent(opts: IStudent) {
    let options: ISimpleAlertOptions = { header: '', message: '', buttons: [] };
    if (!opts.firstName || !opts.lastName || !opts.id) {
      if (this.language === 'spanish') {
        options = {
          ...options,
          header: '¡Advertencia!',
          message: 'Algunos campos no están llenos.',
          buttons: ['Si']
        };

      } else {
        options = {
          ...options, header: 'Warning!',
          message: 'Some fields doesn\'t have the required info',
          buttons: ['Ok']
        };

      }
      this.showSimpleAlert(options);
    } else {
      opts = { ...opts, phoneNumber: opts.phoneNumber, emergencyContactPhoneNumber: opts.emergencyContactPhoneNumber };
      const picture = this.validatePicture({ gender: this.gender, picture: this.picture });
      const student: IStudent = {
        ...trimText(opts),
        picture: picture,
        gender: this.gender,
        isActive: this.isActive
      };
      if (this.language === 'spanish') {
        const alert = await this.alertCtrl.create({
          header: '¡Advertencia!',
          message: `¿Estas seguro que quieres editar el récord de ${opts.firstName} ${opts.lastName}?`,
          buttons: [
            {
              text: 'No'
            },
            {
              text: 'Yes',
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                const response = {
                  ...this.db.updateStudent(student)
                };
                if (response.success === true) {
                  navTransition.then(() => {
                    options = {
                      header: '¡Éxito!',
                      message: `${opts.firstName} ${opts.lastName} ha sido editado.`
                    };
                    this.showAdvancedAlert(options);
                  });
                } else {
                  options = {
                    header: 'Error',
                    message: `Hubo un error tratando de editar el récord de ${opts.firstName} ${opts.lastName}. Por favor intente de nuevo.`
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
          message: `Are you sure you want to edit ${opts.firstName} ${opts.lastName}'s record?`,
          buttons: [
            {
              text: 'No'
            },
            {
              text: 'Yes',
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                const response = {
                  ...this.db.updateStudent(student)
                };
                if (response.success === true) {
                  navTransition.then(() => {
                    options = {
                      header: 'Success!',
                      message: `${opts.firstName} ${opts.lastName} record was edited.`
                    };
                    this.showAdvancedAlert(options);
                  });
                } else {
                  options = {
                    header: 'Error',
                    message: `There was an error trying to edit the ${opts.firstName}'s record. Please try again.`
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
    }
  }


  private validatePicture(opts: { gender: string, picture: string }) {
    if (opts.gender === 'male' && opts.picture === '') {
      opts.picture = './assets/profilePics/defaultMale.png';
    } else if (opts.gender === 'female' && opts.picture === '') {
      opts.picture = './assets/profilePics/defaultFemale.png';
    } else if (opts.gender === 'undisclosed' && opts.picture === '') {
      opts.picture = './assets/profilePics/defaultUndisclosed.png';
    }
    return opts.picture;
  }

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
                this.modalCtrl.dismiss().then(() => this.navCtrl.pop());
              } else {
                this.modalCtrl.dismiss();
              }
            });
          return false;
        }
      }]
    });
    alert.present();
  }

}
