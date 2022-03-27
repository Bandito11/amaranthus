import { Injectable } from '@angular/core';
import { ICalendar, INote, IRecord, IStudent } from '../common/models';
import { AmaranthusDBProvider } from './amaranthus-db/amaranthus-db';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private db: AmaranthusDBProvider) {}

  async getAllActiveStudents(date: ICalendar): Promise<(IStudent & IRecord)[]> {
    const students = await this.db.getAllActiveStudents(date);
    return students;
  }

  addAttendance(opts: { date: ICalendar; id: string; event?: string }) {
    this.db.addAttendance({ date: opts.date, id: opts.id });
    return true;
  }

  addAbsence(opts: { date: ICalendar; id: string; event?: string }) {
    this.db.addAbsence({ date: opts.date, id: opts.id });
    return true;
  }

  addNotes(note: INote) {
    this.db.insertNotes(note);
  }

  async insertStudent(student: IStudent) {
    await this.db.insertStudent(student);
  }
}
