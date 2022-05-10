import { CreateEventPage } from "./../create-event/create-event.page";
import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
import { formatDate } from "../common/format";
import { Storage } from "@ionic/storage";
import { DatabaseService } from "../services/database.service";
import { IEvent } from "../common/models";

@Component({
  selector: "app-events",
  templateUrl: "./events.page.html",
  styleUrls: ["./events.page.scss"],
})
export class EventsPage implements OnInit {
  selectOptions: string[] = ["Attendance", "Absence", "Name", "Date", "None"];
  events: (IEvent & LokiObj & { attendance; absence; totalMembers })[];
  homeURL = "/tabs/tabs/home/events";
  htmlControls = {
    toolbar: {
      title: "",
      buttons: {
        add: "",
      },
    },
    sort: "",
    start: "",
    end: "",
    attended: "",
    absence: "",
    members: "",
  };
  LANGUAGE = {
    english: {
      toolbar: {
        title: "Events",
        buttons: {
          add: "Create event",
        },
      },
      sort: "Sort By: ",
      start: "Start Date: ",
      end: "End Date: ",
      attended: "Total Attended: ",
      absence: "Total Absence: ",
      members: "Total Members: ",
    },
    spanish: {
      toolbar: {
        title: "Eventos",
        buttons: {
          add: "Crear evento",
        },
      },
      sort: "Ordenar por: ",
      start: "Inicia en:",
      end: "Termina en: ",
      attended: "Asistencia Total: ",
      absence: "Ausencia Total: ",
      members: "Membresía Total: ",
    },
  };

  constructor(
    private navCtrl: NavController,
    private dbService: DatabaseService,
    private modal: ModalController,
    private storage: Storage
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.navCtrl.back();
  }

  ionViewDidEnter() {
    this.storage.get("language").then((value) => {
      if (value) {
        this.htmlControls = this.LANGUAGE[value];
      } else {
        this.htmlControls = this.LANGUAGE["english"];
      }
    });
    this.getEvents();
  }

  async sortData(prop: string) {
    const events = await this.dbService.sortEventData(prop);
    if (events["length"]) {
      this.events = this.calculateTotalAttendance(events);
    }
  }

  async getEvents() {
    const events = await this.dbService.getEvents();
    if (events["length"]) {
      this.events = this.calculateTotalAttendance(events);
    } else {
      this.events = [];
    }
  }

  calculateTotalAttendance(events) {
    return events.map((data) => {
      let attendance = 0;
      let absence = 0;
      let totalMembers = 0;
      for (const member of data.members) {
        if (member.attendance) {
          attendance += 1;
        }
        if (member.absence) {
          absence += 1;
        }
        // Sometimes the student are erased from the database
        // This will check if the student is still in the database
        // and delete the student from the event collection
        // if it is not
        const studentExists = this.dbService.studentExists(member.id);
        if (studentExists) {
          totalMembers++;
        } else {
          this.dbService.updateEventMembers({
            name: data.name,
            member: member,
          });
        }
      }
      let event: any = {
        ...data,
        startDate: formatDate(data.startDate),
        totalMembers: totalMembers,
        attendance: attendance,
        absence: absence,
      };
      if (data.endDate) {
        event = {
          ...event,
          endDate: formatDate(data.endDate),
        };
      }
      return event;
    });
  }

  async goToCreateEvent() {
    const modal = await this.modal.create({
      component: CreateEventPage,
    });
    modal.present();
    modal.onDidDismiss().then((_) => this.getEvents());
  }

  async goToEventProfile(id) {
    this.navCtrl.navigateForward(`${this.homeURL}/profile/${id}`);
  }
}
