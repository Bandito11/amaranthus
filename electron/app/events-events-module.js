(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["events-events-module"],{

/***/ "./src/app/events/events.module.ts":
/*!*****************************************!*\
  !*** ./src/app/events/events.module.ts ***!
  \*****************************************/
/*! exports provided: EventsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsPageModule", function() { return EventsPageModule; });
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/components.module */ "./src/app/components/components.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _events_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./events.page */ "./src/app/events/events.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        component: _events_page__WEBPACK_IMPORTED_MODULE_6__["EventsPage"]
    }
];
var EventsPageModule = /** @class */ (function () {
    function EventsPageModule() {
    }
    EventsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_0__["ComponentsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_events_page__WEBPACK_IMPORTED_MODULE_6__["EventsPage"]]
        })
    ], EventsPageModule);
    return EventsPageModule;
}());



/***/ }),

/***/ "./src/app/events/events.page.html":
/*!*****************************************!*\
  !*** ./src/app/events/events.page.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>{{htmlControls.toolbar.title}}</ion-title>\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"goToCreateEvent()\">{{htmlControls.toolbar.buttons.add}}</ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item>\n    <ion-label>{{htmlControls.sort}}</ion-label>\n    <ion-select interface=\"popover\" multiple=\"false\" placeholder=\"None\" #sort (ionChange)=\"sortData(sort.value)\">\n      <ion-select-option *ngFor=\"let option of selectOptions\" value=\"{{option}}\">{{option}}</ion-select-option>\n    </ion-select>\n  </ion-item>\n  <ion-card *ngFor=\"let event of events\" (click)=\"goToEventProfile(event.$loki)\">\n    <img src={{event.logo}} />\n    <ion-card-content>\n      <ion-card-title>\n        {{event.name}}\n      </ion-card-title>\n      <div *ngIf=\"!event.infiniteDates; else: infiniteDatesIsTrue\">\n        <h3><span>{{htmlControls.start}}</span> {{event.startDate}}</h3>\n        <h3 *ngIf=\"event.endDate\"><span>{{htmlControls.end}}</span> {{event.endDate}}</h3>\n        <!-- <br> -->\n        <p><span>{{htmlControls.attended}}</span> {{event.totalAttendance}}</p>\n        <p><span>{{htmlControls.absence}}</span> {{event.totalAbsence}}</p>\n        <p><span>{{htmlControls.members}}</span> {{event.totalMembers}}</p>\n      </div>\n      <ng-template #infiniteDatesIsTrue>\n        <p><span>{{htmlControls.members}}</span> {{event.totalMembers}}</p>\n      </ng-template>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>"

/***/ }),

/***/ "./src/app/events/events.page.scss":
/*!*****************************************!*\
  !*** ./src/app/events/events.page.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2V2ZW50cy9ldmVudHMucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/events/events.page.ts":
/*!***************************************!*\
  !*** ./src/app/events/events.page.ts ***!
  \***************************************/
/*! exports provided: EventsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsPage", function() { return EventsPage; });
/* harmony import */ var _create_event_create_event_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../create-event/create-event.page */ "./src/app/create-event/create-event.page.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/amaranthus-db/amaranthus-db */ "./src/app/services/amaranthus-db/amaranthus-db.ts");
/* harmony import */ var _common_format__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/format */ "./src/app/common/format.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var EventsPage = /** @class */ (function () {
    function EventsPage(navCtrl, db, modal, storage) {
        this.navCtrl = navCtrl;
        this.db = db;
        this.modal = modal;
        this.storage = storage;
        this.selectOptions = ['Attendance', 'Absence', 'Name', 'Date', 'None'];
        this.events = [];
        this.unfilteredEvents = [];
        this.homeURL = '/tabs/tabs/home/events';
        this.htmlControls = {
            toolbar: {
                title: '',
                buttons: {
                    add: ''
                }
            },
            sort: '',
            start: '',
            end: '',
            attended: '',
            absence: '',
            members: ''
        };
        this.LANGUAGE = {
            english: {
                toolbar: {
                    title: 'Events',
                    buttons: {
                        add: 'Create event'
                    }
                },
                sort: 'Sort By: ',
                start: 'Start Date: ',
                end: 'End Date: ',
                attended: 'Total Attended: ',
                absence: 'Total Absence: ',
                members: 'Total Members: '
            },
            spanish: {
                toolbar: {
                    title: 'Eventos',
                    buttons: {
                        add: 'Crear evento'
                    }
                },
                sort: 'Ordenar por: ',
                start: 'Inicia en:',
                end: 'Termina en: ',
                attended: 'Asistencia Total: ',
                absence: 'Ausencia Total: ',
                members: 'Membresía Total: '
            }
        };
    }
    EventsPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    EventsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('language').then(function (value) {
            if (value) {
                _this.htmlControls = _this.LANGUAGE[value];
            }
            else {
                _this.htmlControls = _this.LANGUAGE['english'];
            }
        });
        this.getEvents();
    };
    EventsPage.prototype.sortData = function (option) {
        switch (option) {
            case 'Attendance':
                this.sortByAttendance();
                break;
            case 'Absence':
                this.sortByAbsence();
                break;
            case 'Name':
                this.sortByName();
                break;
            case 'Date':
                this.sortByDate();
                break;
            default:
                this.events = this.unfilteredEvents.slice();
        }
    };
    EventsPage.prototype.sortByAttendance = function () {
        this.events = this.events.sort(function (a, b) {
            if (a.attendance < b.attendance) {
                return -1;
            }
            if (a.attendance > b.attendance) {
                return 1;
            }
            return 0;
        }).slice();
    };
    EventsPage.prototype.sortByAbsence = function () {
        this.events = this.events.sort(function (a, b) {
            if (a.absence < b.absence) {
                return -1;
            }
            if (a.absence > b.absence) {
                return 1;
            }
            return 0;
        }).slice();
    };
    EventsPage.prototype.sortByName = function () {
        this.events = this.events.sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            return 0;
        }).slice();
    };
    EventsPage.prototype.sortByDate = function () {
        this.events = this.events.sort(function (a, b) {
            if (a.startDate < b.startDate) {
                return -1;
            }
            if (a.startDate > b.startDate) {
                return 1;
            }
            return 0;
        }).slice();
    };
    EventsPage.prototype.getEvents = function () {
        var _this = this;
        var response = this.db.getEvents();
        if (response.success) {
            this.events = response.data.map(function (data) {
                var attendance = 0, absence = 0;
                var totalMembers = 0;
                for (var _i = 0, _a = data.members; _i < _a.length; _i++) {
                    var member = _a[_i];
                    if (member.attendance) {
                        attendance += 1;
                    }
                    if (member.absence) {
                        absence += 1;
                    }
                    var studentExists = _this.db.studentExists(member.id);
                    if (studentExists) {
                        totalMembers++;
                    }
                    else {
                        _this.db.updateEventMembers({ name: data.name, member: member });
                    }
                }
                var event = __assign({}, data, { startDate: Object(_common_format__WEBPACK_IMPORTED_MODULE_4__["formatDate"])(data.startDate), totalMembers: totalMembers, totalAttendance: attendance, totalAbsence: absence });
                if (data.endDate) {
                    event = __assign({}, event, { endDate: Object(_common_format__WEBPACK_IMPORTED_MODULE_4__["formatDate"])(data.endDate) });
                }
                return event;
            });
            this.unfilteredEvents = this.events.slice();
        }
    };
    EventsPage.prototype.goToCreateEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modal.create({
                            component: _create_event_create_event_page__WEBPACK_IMPORTED_MODULE_0__["CreateEventPage"]
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.present();
                        modal.onDidDismiss().then(function (_) { return _this.getEvents(); });
                        return [2 /*return*/];
                }
            });
        });
    };
    EventsPage.prototype.goToEventProfile = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.navCtrl.navigateForward(this.homeURL + "/profile/" + id);
                return [2 /*return*/];
            });
        });
    };
    EventsPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-events',
            template: __webpack_require__(/*! ./events.page.html */ "./src/app/events/events.page.html"),
            styles: [__webpack_require__(/*! ./events.page.scss */ "./src/app/events/events.page.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
            src_app_services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_3__["AmaranthusDBProvider"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"]])
    ], EventsPage);
    return EventsPage;
}());



/***/ })

}]);
//# sourceMappingURL=events-events-module.js.map