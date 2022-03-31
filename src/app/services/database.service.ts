import { Injectable } from '@angular/core';
import { ICalendar, IEvent, INote, IRecord, IStudent } from '../common/models';
import { AmaranthusDBProvider } from '../repositories/amaranthus-db/amaranthus-db';

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

  getStudentsRecordsByDate(opts: { date: ICalendar; event?: string }) {
    return this.db.getStudentsRecordsByDate(opts);
  }

  getStudentById(id: string) {
    return this.db.getStudentById(id);
  }

  insertEvent(event: IEvent) {
    this.db.insertEvent(event);
  }

  getAllStudents(event: boolean) {
    return this.db.getAllStudents(event);
  }

  getEvent(id) {
    return this.getEvent(id);
  }

  updateEvent(event: IEvent) {
    this.db.updateEvent(event);
  }

  removeEvent(event: IEvent) {
    this.db.removeEvent(event);
  }

  getQueriedRecordsByCurrentDate(opts: {
    event?: string;
    studentId: string;
    day: number;
    year: number;
    month: number;
  }) {
    return this.db.getQueriedRecordsByCurrentDate(opts);
  }

  insertOrUpdateRecord(opts: {
    attendance: boolean;
    absence: boolean;
    date: ICalendar;
    id: string;
    event?: string;
  }) {
    this.db.insertOrUpdateRecord(opts);
  }
}
