import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { CreatePage } from 'src/app/create/create.page';
import { IStudent, ICalendar, IRecord } from 'src/app/common/models';
import { handleError } from 'src/app/common/handleError';
import { sortStudentsbyId, sortStudentsName } from 'src/app/common/search';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('sort', { static: true }) sortElement;
  @ViewChild('filter', { static: true }) filterElement;

  students: (IStudent & IRecord)[];
  private unfilteredStudents: (IStudent & IRecord)[];
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
    //TODO: Create a way to restore purchases for mobile
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
    this.unfilteredStudents = [];
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
      this.unfilteredStudents = [...this.students];
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

  filterByClass(option: string) {
    let newQuery = [];
    switch (option) {
      case 'Male':
      case 'Female':
      case 'Undisclosed':
        const gender = option.toLowerCase();
        newQuery = this.unfilteredStudents.filter((student) => {
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
      case 'Todos':
        this.filterByClass('All');
        break;
      case 'All':
        this.initializeStudentsList();
        break;
      case 'Activo':
        this.filterByClass('Active');
        break;
      case 'Inactivo':
        this.filterByClass('Not Active');
        break;
      case 'Active':
        newQuery = this.unfilteredStudents.filter((student) => {
          if (student.isActive) {
            return student;
          }
        });
        this.students = [...newQuery];
        break;
      case 'Not Active':
        newQuery = this.unfilteredStudents.filter((student) => {
          if (!student.isActive) {
            return student;
          }
        });
        this.students = [...newQuery];
        break;
      case 'All':
        this.initializeStudentsList();
        break;
      default:
        newQuery = this.unfilteredStudents.filter((student) => {
          if (student.class === option) {
            return student;
          }
        });
        this.students = [...newQuery];
    }
  }

  private initializeStudentsList() {
    this.students = [...this.unfilteredStudents];
  }

  async searchStudent(event) {
    const query = event.target.value;
    query
      ? (this.students = [...await this.dbService.getStudentWithRecord({
          query,
          date: this.date,
        })])
      : this.getStudents();
  }

  sortData(option: string) {
    switch (option) {
      case 'ID':
        this.sortStudentsbyId();
        break;
      case 'Name':
      case 'Nombre':
        this.sortStudentsName();
        break;
      default:
        this.initializeStudentsList();
    }
  }

  private sortStudentsbyId() {
    this.students = <any>sortStudentsbyId(this.students);
  }

  private sortStudentsName() {
    this.students = <any>sortStudentsName(this.students);
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
