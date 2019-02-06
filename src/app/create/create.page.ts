import { ModalController, AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { handleError } from '../common/handleError';
import { IStudent, ISimpleAlertOptions } from '../common/models';
import { trimText } from '../common/formatted';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer
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
   * Browse phone gallery for a picture
   */
  browsePicture() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.PNG
    };
    this.camera.getPicture(options).then((imageData: string) => {
      this.picture = this.sanitizer.bypassSecurityTrustUrl(imageData);
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
      title: '',
      subTitle: '',
      buttons: []
    };
    if (!opts.firstName || !opts.lastName || !opts.id) {
      options = {
        ...options,
        title: 'Warning!',
        subTitle: 'Some fields doesn\'t have the required info',
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
                        title: 'Success!',
                        subTitle: `${opts.firstName} ${opts.lastName} was created.`
                      };
                      this.showAdvancedAlert(userCreatedMsg);
                    });
                  } else {
                    const errorMsg = {
                      title: 'Error',
                      subTitle: response.error
                    };
                    navTransition.then(() => this.showAdvancedAlert(errorMsg));
                  }
                })
                .catch(error => this.showSimpleAlert({ title: 'Error', subTitle: error.error }));
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
      header: options.title,
      message: options.subTitle,
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
      header: options.title,
      message: options.subTitle,
      buttons: options.buttons
    });
    alert.present();
  }
}
