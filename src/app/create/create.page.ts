import { ModalController, AlertController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { IStudent } from '../common/models';
import { trimText } from '../common/format';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';
import { handleError } from '../common/handleError';
import { toastController } from '@ionic/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  htmlControls = {
    toolbar: {
      title: '',
      buttons: {
        create: '',
      },
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
      relationship: '',
    },
  };

  LANGUAGE = {
    english: {
      toolbar: {
        title: 'Create Record',
        buttons: {
          create: 'Create',
        },
      },
      change: 'Change',
      reset: 'Reset',
      submit: 'Submit',
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
        relationship: 'Relationship',
      },
    },
    spanish: {
      toolbar: {
        title: 'Crear Record',
        buttons: {
          create: 'Crear',
        },
      },
      change: 'Cambiar',
      reset: 'Reiniciar',
      submit: 'Someter',
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
        relationship: 'Relación',
      },
    },
  };

  language;
  imgSrc;

  student: IStudent;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private dbService: DatabaseService,
    public platform: Platform,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get('language').then((value) => {
      if (value) {
        this.language = value;
        this.htmlControls = this.LANGUAGE[value];
      } else {
        this.language = 'english';
        this.htmlControls = this.LANGUAGE['english'];
      }
    });

    this.imgSrc = '/assets/profilePics/default.png';
    this.student = {
      id: this.generateId(),
      gender: 'male',
      picture: '/assets/profilePics/default.png',
      phoneNumber: '',
    } as IStudent;
  }
  /**
   * AutoGenerates ID
   */
  generateId() {
    return `XY${Math.ceil(Math.random() * 100000000)}`;
  }

  /**
   *
   * @param student Student data
   * Creates a student in database
   */
  async createStudent(student: IStudent) {
    let message;
    if (!student.firstName || !student.lastName || !student.id) {
      if (this.language === 'spanish') {
        message = 'Algunos campos no contienen la información requerida.';
      } else {
        message = "Some fields doesn't have the required info";
      }
      handleError(message);
    } else if (
      student.id.includes('#') ||
      student.id.includes('/') ||
      student.id.includes('%') ||
      student.id.includes(';')
    ) {
      if (this.language === 'spanish') {
        message = 'El campo de ID no puede contener "#" o "/" o "%".';
      } else {
        message = 'The ID field can\'t contain "#" or "/" or "%"';
      }
      handleError(message);
    } else {
      const studentTrimmed: IStudent = {
        ...trimText(student),
        picture: student.picture,
        gender: student.gender,
        isActive: true,
      };
      if (this.language === 'spanish') {
        const alert = await this.alertCtrl.create({
          header: '¡Advertencia!',
          message: `¿Estas seguro que quieres crear un récord para ${student.firstName} ${student.lastName}?`,
          buttons: [
            { text: 'No' },
            {
              text: 'Si',
              handler: async () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                const navTransition = alert.dismiss();
                try {
                  await this.dbService.insertStudent(studentTrimmed);
                  navTransition.then(async () => {
                    const message = `${student.firstName} ${student.lastName} ha sido creado.`;

                    const toast = await toastController.create({
                      message,
                      duration: 2000,
                      color: 'success',
                    });
                    toast.present();

                    await this.modalCtrl.dismiss();
                  });
                } catch (error) {
                  const message = `Se alcanzó el límite de 10 personas en la base de datos. Si desea deshacerse de este límite, ¡considere comprar la aplicación!`;
                  await alert.dismiss();
                  handleError(message);
                  this.generateId();
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
          message: `Are you sure you want to create a new record for ${student.firstName} ${student.lastName}?`,
          buttons: [
            { text: 'No' },
            {
              text: 'Yes',
              handler: async () => {
                try {
                  Promise.race([
                    await alert.dismiss(),
                    await this.dbService.insertStudent(studentTrimmed),
                  ]);

                  const message = `${student.firstName} ${student.lastName} was created.`;

                  const toast = await toastController.create({
                    message,
                    duration: 2000,
                    color: 'success',
                  });
                  toast.present();

                  await this.modalCtrl.dismiss();
                } catch (error) {
                  message = `Reached the limit of 10 persons in database. If you want to get rid of this limit, please consider buying the app!`;
                  await alert.dismiss();
                  handleError(message);
                  this.generateId();
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
}
