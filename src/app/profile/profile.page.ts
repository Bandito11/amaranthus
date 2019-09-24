import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStudent } from '../common/models';
import {  ModalController } from '@ionic/angular';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { MONTHSLABELS } from '../common/constants';
import { handleError } from '../common/handleError';
import { EditPage } from '../edit/edit.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  picture = '';
  gender = 'male';
  isActive = false;
  student: IStudent = <IStudent>{};
  headerName: string;
  notes: { note: string; date: string }[] = [];
  htmlControls = {
    title: '',
    buttons: {
      edit: ''
    },
    name: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    class: '',
    gender: '',
    father: '',
    mother: '',
    emergency: {
      title: '',
      relationship: ''
    },
    active: '',
    inactive: '',
    notes: {
      title: '',
      date: '',
      notes: ''
    }
  };
  LANGUAGE = {
    english: {
      title: `'s Profile`,
      buttons: {
        edit: 'Edit'
      },
      name: 'Name: ',
      address: 'Address: ',
      phone: 'Phone Number: ',
      city: 'City: ',
      state: 'State: ',
      class: 'Class: ',
      gender: 'Gender: ',
      father: `Father's Name: `,
      mother: `Mother's Name: `,
      emergency: {
        title: 'Emergency Contact',
        relationship: 'Relationship: '
      },
      active: '*Student is currently active on the roster.*',
      inactive: '*Student is currently inactive on the roster.*',
      notes: {
        title: 'Notes: ',
        date: 'Date: ',
        notes: 'Notes: '
      }
    },
    spanish: {
      title: `Perfil de `,
      buttons: {
        edit: 'Editar'
      },
      name: 'Nombre: ',
      address: 'Dirección: ',
      phone: 'Teléfono: ',
      city: 'Ciudad: ',
      state: 'Estado: ',
      class: 'Clase: ',
      gender: 'Género: ',
      father: `Nombre del padre: `,
      mother: `Nombre de la madre: `,
      emergency: {
        title: 'Contacto de Emergencia',
        relationship: 'Relación: '
      },
      active: '*Estudiante esta activo en el registro*',
      inactive: '*Estudiante esta inactivo en el registro*',
      notes: {
        title: 'Notas: ',
        date: 'Fecha: ',
        notes: 'Notas: '
      }
    }
  };
  language: any;

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private db: AmaranthusDBProvider,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.student = { ...this.student, id: this.route.snapshot.paramMap.get('id') };
    this.getStudentFromDB(this.student);
    this.getNotesFromDB(this.student.id);
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

  /**
 *
 * @param id
 */
  async goToEdit(id: string) {
    const modal = await this.modalCtrl.create({
      component: EditPage,
      componentProps: { id: id }
    });
    modal.onWillDismiss().then(() => this.getStudentFromDB(this.student));
    modal.present();
  }

  getNotesFromDB(id: string) {
    try {
      const response = this.db.getAllNotesById(id);
      if (response.success) {
        let note: { note; date };
        let date;
        for (const data of response.data) {
          date = `${MONTHSLABELS[data.month]}, ${data.day} ${data.year}`;
          note = {
            note: data.notes,
            date: date
          };
          this.notes = [...this.notes, note];
        }
      }
    } catch (error) {
      handleError(error);
    }
  }

  getStudentFromDB(student: IStudent) {
    try {
      const response = this.db.getStudentById(student);
      if (response.success) {
        this.isActive = response.data.isActive;
        this.gender = response.data.gender;
        this.picture = response.data.picture;
        this.student = {
          ...response.data,
          gender: response.data.gender[0].toUpperCase() +
            response.data.gender.slice(1, response.data.gender.length)
        };
      }
    } catch (error) {
      handleError(error);
    }
  }
}

