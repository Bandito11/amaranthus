import { Component, OnInit, ViewChild } from '@angular/core';
import { IStudent, ISimpleAlertOptions } from '../common/models';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { handleError } from '../common/handleError';
import { sortStudentsbyId, sortStudentsName, filterStudentsList } from '../common/search';
import { CreatePage } from '../create/create.page';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {
  students: IStudent[] = [];
  private unfilteredStudents: IStudent[] = [];
  query: string;
  selectOptions = [
    'Id',
    'Name',
    'None'
  ];
  filterOptions: string[];
  @ViewChild('sort') sortElement;
  appStart: boolean;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public db: AmaranthusDBProvider
  ) { }

  ngOnInit() {
    this.students = [];
    this.unfilteredStudents = [];
    this.getStudents();
    this.filterOptions = this.getFilterOptions();
    this.appStart = true;
  }

  ionViewWillEnter() {
    this.sortElement.placeholder = 'None';
    this.query = 'None';
    if (this.appStart) {
      this.getStudents();
      this.filterOptions = this.getFilterOptions();
    }
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
    options = [...options, 'Active', 'Not Active', 'Male', 'Female', 'Undisclosed', 'None'];
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
        this.students = [...response.data];
        this.unfilteredStudents = [...response.data];
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
    this.students = sortStudentsbyId(this.students);
  }

  sortStudentsName() {
    this.students = sortStudentsName(this.students);
  }

  private queryStudentsList(query: string) {
    this.students = filterStudentsList({ query: query, students: this.unfilteredStudents });
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
