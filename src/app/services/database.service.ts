import { Injectable } from '@angular/core';
import { ICalendar, IEvent, INote, IStudent } from '../common/models';
import { AmaranthusDBProvider } from '../repositories/amaranthus-db/amaranthus-db';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  async sortEventData(prop) {
    return await this.db.sortEventData(prop);
  }

  async sortStudentData(prop) {
    return await this.db.sortData(prop);
  }
  async getStudentByClass(opts: { class: string; date: ICalendar }) {
    const students = this.db.getStudentByClass(opts);
    return students;
  }
  constructor(private db: AmaranthusDBProvider) {}

  async initializeDatabase() {
    await this.db.initializeDatabase();
  }

  async getAllStudentRecords(date: ICalendar) {
    const records = await this.db.getStudentsRecords(date);
    return records;
  }

  async getStudent(query) {
    let students: IStudent[] = await this.db.getStudent(query);
    students = await this.db.getProfilePictures(students);
    return students;
  }

  async getStudentByGender({ gender, date }) {
    const students = this.db.getStudentByGender({ gender, date });
    return students;
  }

  async getStudentWithRecord(opts: { query: string; date: ICalendar }) {
    const student = await this.db.getStudentWithRecord(opts);
    return student;
  }

  async getAllActiveStudents(date: ICalendar) {
    const students = await this.db.getAllActiveStudents(date);

    return students;
  }

  async getAllInActiveStudents(date: ICalendar) {
    const students = await this.db.getAllInActiveStudents(date);

    return students;
  }

  async getStudentsRecordsByDate(opts: { date: ICalendar; event?: string }) {
    const records = await this.db.getStudentsRecordsByDate(opts);

    return records;
  }

  async getStudentById(id: string) {
    let student = (await this.db.getStudentById(id)) as IStudent;

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
    const students = (await this.db.getAllStudents(event)) as IStudent[];
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
    this.db.addAttendance(opts);
    return true;
  }

  addAbsence(opts: { date: ICalendar; id: string; event?: string }) {
    this.db.addAbsence(opts);
    return true;
  }

  addNotes(note: INote) {
    this.db.insertNotes(note);
  }

  insertEvent(event: IEvent) {
    this.db.insertEvent(event);
  }

  async updateEvent(event: IEvent) {
    await this.db.updateEvent(event);
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

  async updateEventMembers(opts: { name: string; member: { id: any } }) {
    await this.db.updateEventMembers(opts);
  }

  checkIfUserExists(credentials: string) {
    return this.db.checkIfUserExists(credentials);
  }

  getAllNotesById(id: string) {
    return this.db.getAllNotesById(id);
  }
}
