import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from '../common/models';
import { Platform, ModalController, AlertController, NavController } from '@ionic/angular';
import { AmaranthusDBProvider } from '../services/amaranthus-db/amaranthus-db';
import { MONTHSLABELS } from '../common/constants';
import { handleError } from '../common/handleError';
import { EditPage } from '../edit/edit.page';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.page.html',
  styleUrls: ['./studentprofile.page.scss'],
})
export class StudentProfilePage implements OnInit {

  picture = '';
  gender = 'male';
  isActive = false;
  student: IStudent & LokiObj = <IStudent & LokiObj>{};
  headerName: string;
  notes: { note: string; date: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    public platform: Platform,
    private modalCtrl: ModalController,
    private db: AmaranthusDBProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController,

  ) { }

  ngOnInit() {
    this.student = { ...this.student, id: this.route.snapshot.paramMap.get('id') };
    this.getStudentFromDB(this.student);
    this.getNotesFromDB(this.student.id);
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
          gender: response.data.gender[0].toUpperCase() + response.data.gender.slice(1, response.data.gender.length)
        };
      }
    } catch (error) {
      handleError(error);
    }
  }
}

