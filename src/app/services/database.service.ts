import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICalendar, IEvent, INote, IRecord, IStudent } from '../common/models';
import { AmaranthusDBProvider } from '../repositories/amaranthus-db/amaranthus-db';
import { CameraToolsService } from './camera-tools.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private db: AmaranthusDBProvider,
    public cameraTools: CameraToolsService,
    public sanitizer: DomSanitizer
  ) {}

  private async dataUrlToObjectUrl(dataUrl) {
    const blob = await this.cameraTools.readAsBlob(dataUrl);
    return this.sanitizer.bypassSecurityTrustUrl(blob) as unknown as string;
  }

  async getAllActiveStudents(date: ICalendar): Promise<(IStudent & IRecord)[]> {
    const students = await this.db.getAllActiveStudents(date);

    for (let i = 0; i < students.length; i++) {
      if (students[i].picture) {
        students[i] = {
          ...students[i],
          picture: await this.dataUrlToObjectUrl(students[i].picture),
        };
      }
    }

    return students;
  }

  async getStudentsRecordsByDate(opts: { date: ICalendar; event?: string }) {
    const records = await this.db.getStudentsRecordsByDate(opts);

    for (let i = 0; i < records.length; i++) {
      if (records[i].picture) {
        records[i].picture = await this.dataUrlToObjectUrl(records[i].picture);
      }
    }

    return records;
  }

  async getStudentById(id: string) {
    let student = this.db.getStudentById(id);
    if (student.picture) {
      student = {
        ...student,
        picture: await this.dataUrlToObjectUrl(student.picture),
      };
    }
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
    const students = this.db.getAllStudents(event);

    for (let i = 0; i < students.length; i++) {
      if (students[i].picture) {
        students[i] = {
          ...students[i],
          picture: await this.dataUrlToObjectUrl(students[i].picture),
        };
      }
    }

    return students;
  }

  async getEvent(id) {
    let event = this.db.getEvent(id);
    if (event.logo) {
      event = {
        ...event,
        logo: await this.dataUrlToObjectUrl(event.logo),
      };
    }
    return event;
  }

  async getEvents() {
    const events = this.db.getEvents();

    for (let i = 0; i < events.length; i++) {
      if (events[i].logo) {
        events[i] = {
          ...events[i],
          logo: await this.dataUrlToObjectUrl(events[i].logo),
        };
      }
    }

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

  async insertStudent(student: IStudent) {
    await this.db.insertStudent(student);
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

  updateStudent(student: IStudent) {
    this.db.updateStudent(student);
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
