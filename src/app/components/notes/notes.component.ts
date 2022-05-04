import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonTextarea, ModalController } from '@ionic/angular';
import { handleError } from 'src/app/common/handleError';
import { INote } from 'src/app/common/models';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  @Input() id: string;
  @Input() notes: string;
  edit: boolean;
  @ViewChild('textarea') textarea: IonTextarea;

  constructor(
    public dbService: DatabaseService,
    public modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.edit = false;
  }

  onEdit() {
    if (!this.edit) {
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.textarea.readonly = !this.edit;
  }

  async onSubmit(notesForm: NgForm) {
    const currentDate = new Date();
    const newNote: INote = {
      id: this.id,
      notes: notesForm.value.textarea,
      event: '',
      month: currentDate.getMonth(),
      day: currentDate.getDate(),
      year: currentDate.getFullYear(),
    };
    try {
      this.dbService.addNotes(newNote);
      const modal = await this.modalCtrl.getTop();
      await modal.dismiss(newNote);
    } catch (error) {
      handleError(error);
    }
  }
}
