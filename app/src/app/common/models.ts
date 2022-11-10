export interface IStudent {
  firstName: string;
  initial?: string;
  lastName: string;
  id: string;
  address: string;
  phoneNumber: string;
  town: string;
  state: string;
  picture: string;
  gender: string;
  fatherName: string;
  motherName: string;
  emergencyContactName: string;
  emergencyRelationship: string;
  emergencyContactPhoneNumber: string;
  isActive: boolean;
  class: string;
  fullName?: string;
  notes?: string;
}

export interface IEventControls {
  members;
  endDate;
  startDate;
}

export interface INote {
  id: any;
  notes: string;
  month: number;
  day: number;
  year: number;
  event: string;
}

export interface IEvent {
  logo;
  name: string;
  startDate: string;
  endDate: string;
  infiniteDates: boolean;
  members: {
    id: any;
    attendance: boolean;
    absence: boolean;
  }[];
}

export interface IStudentEvent {
  id: any;
  attendance: boolean;
  absence: boolean;
}

export interface IAssistance {
  date: string;
  attendance: boolean;
  studentId: number;
}

export interface IResponse<T> {
  success: boolean;
  error: string;
  data: T;
  dateStamp?: string;
}

export interface ISimpleAlertOptions {
  header: string;
  message: string;
  buttons?: any[];
  event?: string;
}

export interface IRecord {
  id: any;
  attendance: boolean;
  absence: boolean;
  year: number;
  month: number;
  day: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  picture?: string;
  percent?: number;
  notes?: string;
  event?: string;
}

export interface ICalendar {
  weekDay?: number;
  day: number;
  month: number;
  year: number;
}
