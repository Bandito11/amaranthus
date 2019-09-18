import { Component, OnInit, ViewChild } from '@angular/core';
import { IStudent, ISimpleAlertOptions, IRecord } from '../common/models';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { handleError } from '../common/handleError';
import { sortStudentsbyId, sortStudentsName, filterStudentsList } from '../common/search';
import { CreatePage } from '../create/create.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {
  students: (IStudent & IRecord)[];
  private unfilteredStudents: (IStudent & IRecord)[];
  query: string;
  selectOptions;
  filterOptions: string[];
  @ViewChild('sort', {static: false}) sortElement;
  @ViewChild('filter', {static: false}) filterElement;

  htmlControls = {
    toolbar: {
      title: '',
      buttons: {
        event: '',
        add: ''
      }
    },
    sort: '',
    filter: '',
    class: '',
    phone: '',
    search: '',
    address: '',
    town: '',
    state: '',
    active: `Student is not active on the roster!`,
    contact: '',
    profile: 'Tap to see ',
    profile2: `'s profile!`
  };

  language = '';

  LANGUAGE = {
    english: {
      toolbar: {
        title: 'Roster',
        buttons: {
          add: 'Add'
        }
      },
      sort: 'Sort by: ',
      filter: 'Filter by: ',
      class: 'Class: ',
      phone: 'Phone: ',
      search: 'Search by ID or Name',
      address: 'Adress: ',
      town: 'Town: ',
      state: 'State: ',
      active: `Student is not active on the roster!`,
      contact: 'Emergency Contact: ',
      profile: 'Tap to see ',
      profile2: `'s profile!`
    },
    spanish: {
      toolbar: {
        title: 'Registro',
        buttons: {
          add: 'Crear'
        }
      },
      sort: 'Ordenar por: ',
      filter: 'Filtrar por: ',
      class: 'Clase: ',
      phone: 'Teléfono: ',
      attended: 'Asistió',
      absence: 'Ausente',
      present: ` está presente hoy.`,
      absent: ` está ausente hoy.`,
      search: 'Buscar por ID o Nombre',
      address: 'Dirección: ',
      town: 'Pueblo: ',
      state: 'Estado: ',
      active: `¡No esta activo en el registro!`,
      contact: 'Contacto de Emergencia: ',
      profile: 'Presiona para ver el perfil de ',
      profile2: ``
    }
  };

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private db: AmaranthusDBProvider,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.students = [];
    this.unfilteredStudents = [];
  }

  ionViewWillEnter() {
    this.sortElement.placeholder = 'None';
    this.query = 'None';
    this.storage.get('language').then(value => {
      if (value) {
        this.language = value;
      } else {
        this.language = 'english';
      }
      this.htmlControls = this.LANGUAGE[this.language];
      if (this.language === 'spanish') {
        this.selectOptions = ['ID', 'Nombre', 'Sin filtro'];
        this.sortElement.placeholder = 'Sin filtro';
        this.filterElement.placeholder = 'Sin filtro';
      } else {
        this.selectOptions = ['ID', 'Name', 'None'];
        this.sortElement.placeholder = 'None';
        this.filterElement.placeholder = 'None';
      }
      this.getStudents();
      this.filterOptions = this.getFilterOptions();
    });
  }

  private initializeStudentsList() {
    this.students = [...this.unfilteredStudents];
  }

  getFilterOptions() {
    let options = [];
    const checkIfHaveClass = this.students.filter(student => {
      if (student.class) {
        return true;
      }
    });
    for (const student of checkIfHaveClass) {
      if (options.indexOf(student.class) === -1) {
        options = [...options, student.class];
      }
    }
    if (this.language === 'spanish') {
      options = [...options, 'Activo', 'Inactivo', 'Masculino', 'Femenino', 'No revelado', 'Sin filtro'];
    } else {
      options = [...options, 'Active', 'Not Active', 'Male', 'Female', 'Undisclosed', 'None'];
    }
    return options;
  }

  goToProfile(id) {
    this.navCtrl.navigateForward(`/tabs/tabs/roster/profile/${id}`);
  }

  filterByClass(option: string) {
    let newQuery = [];
    switch (option) {
      case 'Male':
      case 'Female':
      case 'Undisclosed':
        const gender = option.toLowerCase();
        newQuery = this.unfilteredStudents.filter(student => {
          if (student.gender === gender) {
            return student;
          }
        });
        this.students = [...newQuery];
        break;
      case 'Masculino':
        this.filterByClass('Male');
        break;
      case 'Femenino':
        this.filterByClass('Female');
        break;
      case 'No revelado':
        this.filterByClass('Undisclosed');
        break;
      case 'Sin filtro':
        this.filterByClass('None');
        break;
      case 'None':
        this.initializeStudentsList();
        break;
      case 'Activo':
        this.filterByClass('Active');
        break;
      case 'Inactivo':
        this.filterByClass('Not Active');
        break;
      case 'Active':
        newQuery = this.unfilteredStudents.filter(student => {
          if (student.isActive) {
            return student;
          }
        });
        this.students = [...newQuery];
        break;
      case 'Not Active':
        newQuery = this.unfilteredStudents.filter(student => {
          if (!student.isActive) {
            return student;
          }
        });
        this.students = [...newQuery];
        break;
      case 'None':
        this.initializeStudentsList();
        break;
      default:
        newQuery = this.unfilteredStudents.filter(student => {
          if (student.class === option) {
            return student;
          }
        });
        this.students = [...newQuery];
    }
  }

  searchStudent(event) {
    const query: string = event.target.value;
    query ? this.queryStudentsList(query) : this.initializeStudentsList();
  }

  private getStudents() {
    try {
      const response = this.db.getAllStudents();
      if (response.success === true) {
        this.students = <any>response.data;
        this.unfilteredStudents = <any>response.data;
      } else {
        handleError(response.error);
      }
    } catch (error) {
      handleError(error);
    }
  }

  sortData(option: string) {
    switch (option) {
      case 'Id':
        this.sortStudentsbyId();
        break;
      case 'Name':
        this.sortStudentsName();
        break;
      default:
        this.students = [...this.unfilteredStudents];
    }
  }

  sortStudentsbyId() {
    this.students = <any>sortStudentsbyId(this.students);
  }

  sortStudentsName() {
    this.students = <any>sortStudentsName(this.students);
  }

  private queryStudentsList(query: string) {
    this.students = <any>filterStudentsList({ query: query, students: this.unfilteredStudents });
  }

  async goToCreate() {
    const modal = await this.modalCtrl.create({
      component: CreatePage
    });
    modal.present();
    modal.onDidDismiss().then(() => {
      this.getStudents();
      this.filterOptions = this.getFilterOptions();
    });
  }

  private async showSimpleAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl
      .create({
        header: options.header,
        message: options.message,
        buttons: options.buttons
      });
    alert.present();
  }

}
