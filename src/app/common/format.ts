import { MONTHSLABELS } from './constants';
import { IStudent, IEvent } from './models';

export const capitalizeFirstLetter = (word) =>
  (word[0].toUpperCase() + word.slice(1, word.length)).trim();

export function trimEvent(event: IEvent) {
  const formattedEvent: IEvent = {
    ...event,
    name: event.name.trim(),
  };
  return formattedEvent;
}

export function getTodayFullDate() {
  const date = new Date();
  const month = MONTHSLABELS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

export function formatDate(date: string) {
  const year = date.slice(0, 4);
  const month = parseInt(date.slice(5, 7));
  const day = date.slice(8, 10);
  const formattedDate = `${MONTHSLABELS[month - 1]} ${day}, ${year}`;
  return formattedDate;
}

export function trimText(student: IStudent) {
  for (const key in student) {
    if (Object.prototype.hasOwnProperty.call(student, key)) {
      const element = student[key];
      try {
        if (typeof element === 'string') {
          student[key] = element.trim();
        }
      } catch (error) {
        if (typeof element !== 'boolean') console.error(error);
      }
    }
  }
  return student;
}

export function formatStudentName(opts: IStudent) {
  const firstName =
    opts.firstName.split('')[0].toUpperCase() +
    opts.firstName.slice(1, opts.firstName.length);
  const lastName =
    opts.lastName.split('')[0].toUpperCase() +
    opts.lastName.slice(1, opts.lastName.length);
  let student = {
    ...opts,
    firstName: firstName,
    lastName: lastName,
  };
  if (opts.initial) {
    const initial =
      opts.initial.split('')[0].toUpperCase() +
      opts.initial.slice(1, opts.initial.length);
    student = {
      ...student,
      initial: initial,
    };
    return student;
  } else {
    return student;
  }
}
