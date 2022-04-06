import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStudent } from '../common/models';
import { ModalController } from '@ionic/angular';
import { MONTHSLABELS } from '../common/constants';
import { handleError } from '../common/handleError';
import { EditPage } from '../edit/edit.page';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  picture;
  gender = 'male';
  isActive = false;
  student: IStudent = <IStudent>{};
  headerName: string;
  notes: { note: string; date: string }[] = [];
  htmlControls = {
    title: '',
    buttons: {
      edit: '',
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
      relationship: '',
    },
    active: '',
    inactive: '',
    notes: {
      title: '',
      date: '',
      notes: '',
    },
  };
  LANGUAGE = {
    english: {
      title: `'s Profile`,
      buttons: {
        edit: 'Edit',
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
        relationship: 'Relationship: ',
      },
      active: '*Student is currently active on the roster.*',
      inactive: '*Student is currently inactive on the roster.*',
      notes: {
        title: 'Notes: ',
        date: 'Date: ',
        notes: 'Notes: ',
      },
    },
    spanish: {
      title: `Perfil de `,
      buttons: {
        edit: 'Editar',
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
        relationship: 'Relación: ',
      },
      active: '*Estudiante esta activo en el registro*',
      inactive: '*Estudiante esta inactivo en el registro*',
      notes: {
        title: 'Notas: ',
        date: 'Fecha: ',
        notes: 'Notas: ',
      },
    },
  };
  language;

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private dbService: DatabaseService,
    private storage: Storage,
    private sanitizer: DomSanitizer,
    
  ) {}

  ngOnInit() {
    this.getStudentFromDB(this.route.snapshot.paramMap.get('id'));
    this.getNotesFromDB(this.student.id);
    this.storage.get('language').then((value) => {
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
      componentProps: { id: id },
    });
    modal.onWillDismiss().then(() => this.getStudentFromDB(id));
    modal.present();
  }

  getNotesFromDB(id: string) {
    try {
      const notes = this.dbService.getAllNotesById(id);
      if (notes['length']) {
        let note: { note; date };
        let date;
        for (const data of notes) {
          date = `${MONTHSLABELS[data.month]}, ${data.day} ${data.year}`;
          note = {
            note: data.notes,
            date: date,
          };
          this.notes = [...this.notes, note];
        }
      }
    } catch (error) {
      handleError(error);
    }
  }

  getStudentFromDB(id: string) {
    try {
      const student = this.dbService.getStudentById(id);
      if (student) {
        this.isActive = student.isActive;
        this.gender = student.gender;
        this.picture = this.sanitizer.bypassSecurityTrustUrl(student.picture);
        this.student = {
          ...student,
          gender:
            student.gender[0].toUpperCase() +
            student.gender.slice(1, student.gender.length),
        };
      }
    } catch (error) {
      handleError(error);
    }
  }
}
