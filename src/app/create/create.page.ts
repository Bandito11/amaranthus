import { ModalController, AlertController, Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { handleError } from '../common/handleError';
import { IStudent, ISimpleAlertOptions } from '../common/models';
import { trimText } from '../common/format';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {

  gender: string;
  picture;
  phoneNumber: string;
  idInput: string;

  counter = 0;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private db: AmaranthusDBProvider,
    private camera: Camera,
    private webview: WebView,
    private file: File,
    private platform: Platform
  ) { }

  ionViewWillEnter() {
    this.generateId();
    this.gender = 'male';
    this.picture = './assets/profilePics/default.png';
    this.phoneNumber = '';
  }
  /**
   * AutoGenerates ID
   */
  generateId() {
    this.idInput = `XY${Math.ceil(Math.random() * 100000000)}`;
    try {
      const value = this.db.checkIfStudentExists({ id: this.idInput });
      if (!value) {
        this.generateId();
      }
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * Browse phone gallery
   *
   * @memberof EditPage
   */
  browsePicture() {
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
          this.picture = this.webview.convertFileSrc(imageData);
          return 0;
        }
        const array = imageData.split('/');
        const fileName = array.pop();
        const directory = array.slice(0, array.length).join('/');
        const path = this.file.dataDirectory;
        const outDirectory = 'images';
        this.file.checkDir(path, outDirectory).then(() => {
          this.file.copyFile(directory, fileName, path + outDirectory, fileName)
            .then(image => this.picture = this.webview.convertFileSrc(image.nativeURL))
            .catch(e => {
              if (e.code === 12) {
                this.picture = this.webview.convertFileSrc(path + outDirectory + fileName);
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
              .then(image => this.picture = this.webview.convertFileSrc(image.nativeURL))
              .catch(e => {
                if (e.code === 12) {
                  this.picture = this.webview.convertFileSrc(path + outDirectory + fileName);
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

  /**
   *
   * @param opts Student data
   * Creates a student in database
   */
  async createStudent(opts: IStudent) {
    let options: ISimpleAlertOptions = {
      header: '',
      message: '',
      buttons: []
    };
    if (!opts.firstName || !opts.lastName || !opts.id) {
      options = {
        ...options,
        header: 'Warning!',
        message: 'Some fields doesn\'t have the required info',
        buttons: [...['OK']]
      };
      this.showSimpleAlert(options);
    } else {
      const picture = this.validatePicture({ gender: this.gender, picture: this.picture });
      const student: IStudent = {
        ...trimText(opts),
        picture: picture,
        gender: this.gender,
        isActive: true
      };
      const alert = await this.alertCtrl.create({
        header: 'Warning!',
        message: `Are you sure you want to create a new record for ${opts.firstName} ${opts.lastName}?`,
        buttons: [
          { text: 'No' },
          {
            text: 'Yes',
            handler: () => {
              // user has clicked the alert button
              // begin the alert's dismiss transition
              const navTransition = alert.dismiss();
              this.db.insertStudent(student)
                .then((response) => {
                  if (response.success === true) {
                    navTransition.then(() => {
                      const userCreatedMsg = {
                        header: 'Success!',
                        message: `${opts.firstName} ${opts.lastName} was created.`
                      };
                      this.showAdvancedAlert(userCreatedMsg);
                    });
                  } else {
                    const errorMsg = {
                      header: 'Error',
                      message: response.error
                    };
                    navTransition.then(() => this.showAdvancedAlert(errorMsg));
                  }
                })
                .catch(error => this.showSimpleAlert({ header: 'Error', message: error.error }));
              return false;
            }
          }
        ]
      });
      alert.present();
    }

  }

  /**
   *
   * @param options
   * Display a message on the screen
   */
  async showAdvancedAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl.create({
      header: options.header,
      message: options.message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // user has clicked the alert button
            // begin the alert's dismiss transition
            alert.dismiss()
              .then(() => {
                this.modalCtrl.dismiss();
              });
            return false;
          }
        }
      ]
    });
    alert.present();
  }

  /**
   *
   * @param opts
   * Validates user's gender in order to choose a picture.
   */
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
}
