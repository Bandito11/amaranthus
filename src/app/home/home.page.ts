import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonContent,
  ModalController,
  NavController,
  Platform,
} from '@ionic/angular';
import { CreatePage } from 'src/app/create/create.page';
import { IStudent, ICalendar, IRecord } from 'src/app/common/models';
import { handleError } from 'src/app/common/handleError';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('sort') sortElement;
  @ViewChild('filter') filterElement;

  students: (IStudent & IRecord)[];
  selectOptions;
  filterOptions: string[];
  date: ICalendar;
  toggle;
  homeURL = '/tabs/tabs/home';
  htmlControls = {
    toolbar: {
      title: '',
      buttons: {
        event: '',
        add: '',
      },
    },
    sort: '',
    filter: '',
    class: '',
    phone: '',
    attended: '',
    absence: '',
    profile: '',
    present: '',
    absent: '',
    search: '',
  };

  language = '';

  LANGUAGE = {
    english: {
      toolbar: {
        title: 'Daily Attendance',
        buttons: {
          event: 'Events',
          add: 'Add',
        },
      },
      sort: 'Sort by: ',
      filter: 'Filter by: ',
      class: 'Class: ',
      phone: 'Phone: ',
      attended: 'Attended',
      absence: 'Absent',
      profile: 'Profile',
      present: `'s present today!`,
      absent: `'s absent today!`,
      search: 'Search by ID or Name',
    },
    spanish: {
      toolbar: {
        title: 'Asistencia Diaria',
        buttons: {
          event: 'Evento',
          add: 'Crear',
        },
      },
      sort: 'Ordenar por: ',
      filter: 'Filtrar por: ',
      class: 'Clase: ',
      phone: 'Teléfono: ',
      attended: 'Asistió',
      absence: 'Ausente',
      profile: 'Perfil',
      present: ` está presente hoy.`,
      absent: ` está ausente hoy.`,
      search: 'Buscar por ID o Nombre',
    },
  };

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private storage: Storage,
    private platform: Platform,
    private dbService: DatabaseService
  ) {}

  async ngOnInit() {
    if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
      this.storage.set('boughtMasterKey', true);
    }
    const currentDate = new Date();
    this.date = {
      month: currentDate.getMonth(),
      day: currentDate.getDate(),
      year: currentDate.getFullYear(),
    };
    this.students = [];
    this.getStudents();
  }

  ionViewWillEnter() {
    this.storage.get('language').then((value) => {
      if (value) {
        this.language = value;
      } else {
        this.language = 'english';
      }
      this.htmlControls = this.LANGUAGE[this.language];
      if (this.language === 'spanish') {
        this.selectOptions = ['ID', 'Nombre', 'Ninguno'];
        this.sortElement.value = 'Ninguno';
        this.filterElement.value = 'Activo';
      } else {
        this.selectOptions = ['ID', 'Name', 'None'];
        this.sortElement.value = 'None';
        this.filterElement.value = 'Active';
      }
      this.getStudents();
      this.filterOptions = this.getFilterOptions();
    });
  }

  private async getStudents() {
    const date = {
      ...this.date,
      month: this.date.month + 1,
    };
    try {
      this.students = await this.dbService.getAllActiveStudents(date);
    } catch (error) {
      this.students = [];
      handleError(error);
    }
    this.filterOptions = this.getFilterOptions();
  }

  getFilterOptions() {
    let options = [];
    const checkIfHaveClass = this.students.filter((student) => {
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
      options = [
        ...options,
        'Activo',
        'Inactivo',
        'Masculino',
        'Femenino',
        'No revelado',
        'Todos',
      ];
    } else {
      options = [
        ...options,
        'Active',
        'Not Active',
        'Male',
        'Female',
        'Undisclosed',
        'All',
      ];
    }
    return options;
  }

  async filterByClass(option: string) {
    switch (option) {
      case 'Male':
      case 'Masculino':
        this.students = await this.dbService.getStudentByGender({
          gender: 'male',
          date: this.date,
        });
        break;
      case 'Female':
      case 'Femenino':
        this.students = await this.dbService.getStudentByGender({
          gender: 'female',
          date: this.date,
        });

        break;
      case 'Undisclosed':
      case 'No revelado':
        this.students = await this.dbService.getStudentByGender({
          gender: 'undisclosed',
          date: this.date,
        });
        break;
      case 'Todos':
      case 'All':
        this.students = await this.dbService.getAllStudentRecords(this.date);
        break;
      case 'Activo':
      case 'Active':
        await this.getStudents();
        break;
      case 'Not Active':
      case 'Inactivo':
        this.students = await this.dbService.getAllInActiveStudents(this.date);
        break;
      default:
        //FIXME: Filter by student.class
        this.students = await this.dbService.getStudentByClass({
          date: this.date,
          class: option,
        });
    }
  }

  async searchStudent(event) {
    const query = event.target.value;
    query
      ? (this.students = [
          ...(await this.dbService.getStudentWithRecord({
            query,
            date: this.date,
          })),
        ])
      : this.getStudents();
  }

  async sortData(option: string) {
    switch (option) {
      case 'ID':
        this.students = await this.dbService.sortStudentData({
          date: this.date,
          prop: 'id',
        });
        break;
      case 'Name':
      case 'Nombre':
        this.students = await this.dbService.sortStudentData({
          date: this.date,
          prop: 'name',
        });
        break;
      default:
      // this.initializeStudentsList();
    }
  }

  async goToCreate() {
    const modal = await this.modalCtrl.create({
      component: CreatePage,
    });
    modal.present();
    modal.onDidDismiss().then((_) => {
      this.getStudents();
      this.filterOptions = this.getFilterOptions();
    });
  }

  goToEvents() {
    this.navCtrl.navigateForward(`${this.homeURL}/events`);
  }
}
