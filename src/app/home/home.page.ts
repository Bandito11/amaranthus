import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, NavController, LoadingController, IonVirtualScroll } from '@ionic/angular';
import { CreatePage } from 'src/app/create/create.page';
import { IStudent, ICalendar, ISimpleAlertOptions } from 'src/app/common/models';
import { AmaranthusDBProvider } from 'src/app/services/amaranthus-db/amaranthus-db';
import { handleError } from 'src/app/common/handleError';
import { sortStudentsbyId, sortStudentsName, filterStudentsList } from 'src/app/common/search';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  students: IStudent[];
  private unfilteredStudents: IStudent[];
  selectOptions = ['Id', 'Name', 'None'];
  filterOptions: string[];
  date: ICalendar;
  toggle;
  timer;
  homeURL = '/tabs/tabs/home';
  appStart: boolean;
  @ViewChild('notes') notesElement;
  @ViewChild('sort') sortElement;

  constructor(
    private alertCtrl: AlertController,
    private db: AmaranthusDBProvider,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    const currentDate = new Date();
    this.date = {
      month: currentDate.getMonth(),
      day: currentDate.getDate(),
      year: currentDate.getFullYear()
    };
    this.students = [];
    this.unfilteredStudents = [];
    this.getStudents();
    this.filterOptions = this.getFilterOptions();
  }

  ionViewWillEnter() {
    this.timer = 0;
    this.sortElement.placeholder = 'None';
    if (this.appStart) {
      this.getStudents();
      this.filterOptions = this.getFilterOptions();
      //////////// Use for testing only!///////////
      // for (let i = 0; i < this.students.length; i++) {
      //   this.db.insertTest();
      // }
      /////////////////////////////////////////////
    }
  }

  private async getStudents() {
    const date = {
      ...this.date,
      month: this.date.month + 1
    };
    try {
      const studentResponse = this.db.getAllActiveStudents(date);
      if (studentResponse.success === true && studentResponse.data) {
        this.students = studentResponse.data;
        this.unfilteredStudents = studentResponse.data;
      } else {
        const loading = await this.loadingController.create();
        await loading.present();
        const studentTimeout = setTimeout(async () => {
          this.getStudents();
          if (this.students.length > 0) {
            await loading.dismiss();
            this.appStart = true;
            clearTimeout(studentTimeout);
          }
        }, 3000);
      }
    } catch (error) {
      handleError(error);
    }
  }

  showNotes(id) {
    if (this.toggle) {
      this.toggle = '';
    } else {
      this.toggle = id;
      setTimeout(() => {
        this.notesElement.nativeElement.focus();
      }, 0);
    }
  }

  addNotes(opts: { id: string; notes: string }) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const currentDate = new Date();
      const newNote = {
        ...opts,
        month: currentDate.getMonth(),
        day: currentDate.getDate(),
        year: currentDate.getFullYear()
      };
      this.db.insertNotes(newNote);
      this.updateNotes(opts);
    }, 1000);
  }

  updateNotes(opts: { id: string; notes: string }) {
    const index = this.students.findIndex(student => {
      if (student.id === opts.id) {
        return true;
      }
    });
    this.students[index].notes = opts.notes;
    this.unfilteredStudents[index].notes = opts.notes;
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
    options = [...options, 'None'];
    return options.sort();
  }

  filterByClass(option: string) {
    if (option === 'None') {
      this.initializeStudentsList();
      return;
    }
    const newQuery = this.unfilteredStudents.filter(student => {
      if (student.class === option) {
        return student;
      }
    });
    this.students = [...newQuery];
  }

  private initializeStudentsList() {
    this.students = [...this.unfilteredStudents];
  }

  searchStudent(event) {
    const query: string = event.target.value;
    query ? this.filterStudentsList(query) : this.initializeStudentsList();
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
        this.initializeStudentsList();
    }
  }

  private sortStudentsbyId() {
    this.students = sortStudentsbyId(this.students);
  }

  private sortStudentsName() {
    this.students = sortStudentsName(this.students);
  }

  private filterStudentsList(query: string) {
    this.students = filterStudentsList({ query: query, students: this.unfilteredStudents });
  }

  addAttendance(opts: { id: string }) {
    const response = this.db.addAttendance({ date: this.date, id: opts.id });
    if (response.success === true) {
      this.updateStudentAttendance({
        id: opts.id,
        absence: false,
        attendance: true
      });
      this.showSimpleAlert({
        header: 'Success!',
        message: 'Student was marked present!',
        buttons: ['OK']
      });
    } else {
      handleError(response.error);
    }
  }

  addAbsence(opts: { id: string }) {
    const response = this.db.addAbsence({ date: this.date, id: opts.id });
    if (response.success === true) {
      this.updateStudentAttendance({
        id: opts.id,
        absence: true,
        attendance: false
      });
      this.showSimpleAlert({
        header: 'Success!',
        message: 'Student was marked absent!',
        buttons: ['OK']
      });
    } else {
      handleError(response.error);
    }
  }

  private updateStudentAttendance(opts: { id: string; absence: boolean; attendance: boolean }) {
    const results = this.students.map(student => {
      if (student.id === opts.id) {
        return {
          ...student,
          attendance: opts.attendance,
          absence: opts.absence
        };
      } else {
        return student;
      }
    });
    this.unfilteredStudents = [...results];
    this.students = [...results];
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

  async goToCreate() {
    const modal = await this.modalCtrl.create({
      component: CreatePage
    });
    modal.present();
    modal.onDidDismiss().then(_ => {
      this.getStudents();
      this.filterOptions = this.getFilterOptions();
    });
  }

  goToProfile(id) {
    this.navCtrl.navigateForward(`${this.homeURL}/profile/${id}`);
  }

  goToEvents() {
    this.navCtrl.navigateForward(`${this.homeURL}/events`);
  }
}
