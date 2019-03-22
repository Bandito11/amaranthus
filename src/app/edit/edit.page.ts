import { OnInit, Component } from '@angular/core';
import { IStudent, IResponse, ISimpleAlertOptions } from '../common/models';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { AlertController, NavController, NavParams, Platform, ModalController } from '@ionic/angular';
import { handleError } from '../common/handleError';
import { trimText } from '../common/format';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';

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

  constructor(
    private db: AmaranthusDBProvider,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private camera: Camera,
    private modalCtrl: ModalController,
    private webview: WebView,
    private file: File,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.student = { ...this.student, id: this.navParams.get('id') };
    try {
      const response = this.getStudentFromDB(this.student);
      if (response.success) {
        this.isActive = response.data.isActive;
        this.gender = response.data.gender;
        this.picture = response.data.picture;
        this.student = { ...response.data };
      }
    } catch (error) {
      handleError(error);
    }
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

  async editStudent(opts: IStudent) {
    let options: ISimpleAlertOptions = { header: '', message: '', buttons: [] };
    if (!opts.firstName || !opts.lastName || !opts.id) {
      options = {
        ...options, header: 'Warning!',
        message: 'Some fields doesn\'t have the required info',
        buttons: [...['OK']]
      };
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
      const alert = await this.alertCtrl.create({
        header: 'Warning!',
        message: `Are you sure you want to edit ${opts.firstName} ${opts.lastName} record?`,
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
                    message: `${opts.firstName} ${opts.lastName} was edited.`
                  };
                  this.showAdvancedAlert(options);
                });
              } else {
                options = {
                  header: 'Error',
                  message: 'There was an error trying to edit the record. Please try again.'
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
                this.navCtrl.navigateRoot('/tabs/tabs/home').then(() => this.modalCtrl.dismiss());
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
