import { Injectable } from '@angular/core';
import { ICalendar, IEvent, INote, IStudent } from '../common/models';
import { AmaranthusDBProvider } from '../repositories/amaranthus-db/amaranthus-db';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private db: AmaranthusDBProvider,
  ) {}

  async getAllActiveStudents(date: ICalendar) {
    const students = await this.db.getAllActiveStudents(date);

    return students;
  }

  async getStudentsRecordsByDate(opts: { date: ICalendar; event?: string }) {
    const records = await this.db.getStudentsRecordsByDate(opts);

    return records;
  }

  async getStudentById(id: string) {
    let student = await this.db.getStudentById(id) as IStudent;
   
    return student;
  }

  getQueriedRecordsByCurrentDate(opts: {
    event?: string;
    studentId: string;
    day: number;
    year: number;
    month: number;
  }) {
    const records = this.db.getQueriedRecordsByCurrentDate(opts);

    return records;
  }

  async getAllStudents(event: boolean) {
    const students = await this.db.getAllStudents(event) as IStudent[];
    return students;
  }

  async getEvent(id) {
    const event = await this.db.getEvent(id);
    return event;
  }

  async getEvents() {
    const events = this.db.getEvents();


    return events;
  }
  getAllStudentsRecords(opts: { event?: string; date: ICalendar }) {
    return this.db.getAllStudentsRecords(opts);
  }

  getQueriedRecords(opts: { event?: string; query: string; date?: ICalendar }) {
    return this.db.getQueriedRecords(opts);
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

  insertEvent(event: IEvent) {
    this.db.insertEvent(event);
  }

  updateEvent(event: IEvent) {
    this.db.updateEvent(event);
  }

  removeEvent(event: IEvent) {
    this.db.removeEvent(event);
  }

  removeStudent(student: IStudent) {
    this.db.removeStudent(student);
  }

  async insertStudent(student: IStudent) {
    await this.db.insertStudent(student);
  }

  async updateStudent(student: IStudent) {
    await this.db.updateStudent(student);
  }

  studentExists(id) {
    return this.db.studentExists(id);
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

  updateEventMembers(opts: { name: string; member: { id: any } }) {
    this.db.updateEventMembers(opts);
  }

  checkIfUserExists(opts: { username: string; password }) {
    return this.db.checkIfUserExists(opts);
  }

  getAllNotesById(id: string) {
    return this.db.getAllNotesById(id);
  }
}
