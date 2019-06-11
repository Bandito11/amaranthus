(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["eventprofile-eventprofile-module"],{

/***/ "./src/app/eventprofile/eventprofile.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/eventprofile/eventprofile.module.ts ***!
  \*****************************************************/
/*! exports provided: EventProfilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventProfilePageModule", function() { return EventProfilePageModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _eventprofile_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventprofile.page */ "./src/app/eventprofile/eventprofile.page.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/components.module */ "./src/app/components/components.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        component: _eventprofile_page__WEBPACK_IMPORTED_MODULE_1__["EventProfilePage"]
    }
];
var EventProfilePageModule = /** @class */ (function () {
    function EventProfilePageModule() {
    }
    EventProfilePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_6__["ComponentsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)
            ],
            declarations: [_eventprofile_page__WEBPACK_IMPORTED_MODULE_1__["EventProfilePage"]]
        })
    ], EventProfilePageModule);
    return EventProfilePageModule;
}());



/***/ }),

/***/ "./src/app/eventprofile/eventprofile.page.html":
/*!*****************************************************!*\
  !*** ./src/app/eventprofile/eventprofile.page.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>{{eventControls.name}}</ion-title>\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-buttons *ngIf=\"!eventControls.infiniteDates\" slot=\"end\">\n      <ion-button (click)=\"editEvent()\">\n        {{htmlControls.toolbar.buttons.edit}}\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n  <ion-toolbar *ngIf=\"eventControls.infiniteDates\" color=\"primary\">\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"goToCalendar()\">\n        {{htmlControls.toolbar.buttons.calendar}}\n      </ion-button>\n      <ion-button (click)=\"goToStats()\">\n        {{htmlControls.toolbar.buttons.stats}}\n      </ion-button>\n      <ion-button (click)=\"editEvent()\">\n        {{htmlControls.toolbar.buttons.edit}}\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding id=\"event-profile\">\n  <img src=\"{{eventControls.logo}}\" />\n  <div *ngIf=\"!eventControls.infiniteDates; else: infiniteDatesIsTrue\">\n    <h5>\n      {{htmlControls.from}}{{eventControls.startDate}} &nbsp; <span\n        *ngIf=\"eventControls.endDate\">{{htmlControls.to}}{{eventControls.endDate}}</span>\n    </h5>\n  </div>\n  <ng-template #infiniteDatesIsTrue>\n    <h5>{{htmlControls.today}}{{currentDate}}</h5>\n  </ng-template>\n  <ion-list lines=\"none\" *ngFor=\"let member of eventControls.members\">\n    <ion-item>\n      <ion-avatar> <img src=\"{{member.picture}}\" alt=\"An image of user\" /> </ion-avatar>\n      <div class=\"amaranthus\">\n        <p>\n          <span class=\"label name\">{{htmlControls.name}}</span>\n          <span class=\"name\">{{member.firstName}} <span *ngIf=\"member.initial\">{{member.initial}}</span>\n            {{member.lastName}}</span>\n        </p>\n        <p><span class=\"label\">ID: </span>{{member.id}}</p>\n        <p *ngIf=\"member.phoneNumber\"><span class=\"label\">{{htmlControls.phone}}</span>{{member.phoneNumber}}</p>\n        <p *ngIf=\"member.class\"><span class=\"label\">{{htmlControls.class}}</span>{{member.class}}</p>\n        <div *ngIf=\"!eventControls.infiniteDates; else: infiniteDatesIsTrue\">\n          <ion-button size=\"small\" color=\"primary\" (click)=\"addAttendance(member.id)\">\n            {{htmlControls.attended}}\n          </ion-button>\n          <ion-button size=\"small\" color=\"secondary\" (click)=\"addAbsence(member.id)\">\n            {{htmlControls.absence}}\n          </ion-button>\n          <p class=\"left attended\" *ngIf=\"member.attendance\">{{member.firstName}}{{htmlControls.present}}</p>\n          <p class=\"left attended\" *ngIf=\"member.absence\">{{member.firstName}}{{htmlControls.absent}}</p>\n        </div>\n        <ng-template #infiniteDatesIsTrue>\n          <ion-button size=\"small\" color=\"primary\" (click)=\"addAttendance(member.id)\">\n            {{htmlControls.attended}}\n          </ion-button>\n          <ion-button size=\"small\" color=\"secondary\" (click)=\"addAbsence(member.id)\">\n            {{htmlControls.absence}}\n          </ion-button>\n          <p class=\"left attended\" *ngIf=\"member.record.attendance\">{{member.firstName}}{{htmlControls.present}}</p>\n          <p class=\"left attended\" *ngIf=\"member.record.absence\">{{member.firstName}}{{htmlControls.absent}}</p>\n        </ng-template>\n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>"

/***/ }),

/***/ "./src/app/eventprofile/eventprofile.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/eventprofile/eventprofile.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#event-profile .label {\n  font-weight: bolder; }\n\n#event-profile .name {\n  font-size: 130%; }\n\n#event-profile .attended {\n  color: #e6a4a4; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc3RlYmFubW9yYWxlcy9Qcm9qZWN0cy9hbWFyYW50aHVzMi9zcmMvYXBwL2V2ZW50cHJvZmlsZS9ldmVudHByb2ZpbGUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRUksbUJBQW1CLEVBQUE7O0FBRnZCO0VBS0ksZUFBZSxFQUFBOztBQUxuQjtFQVFJLGNBQXlCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ldmVudHByb2ZpbGUvZXZlbnRwcm9maWxlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNldmVudC1wcm9maWxlIHtcbiAgLmxhYmVsIHtcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xuICB9XG4gIC5uYW1lIHtcbiAgICBmb250LXNpemU6IDEzMCU7XG4gIH1cbiAgLmF0dGVuZGVkIHtcbiAgICBjb2xvcjogcmdiKDIzMCwgMTY0LCAxNjQpO1xuICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/eventprofile/eventprofile.page.ts":
/*!***************************************************!*\
  !*** ./src/app/eventprofile/eventprofile.page.ts ***!
  \***************************************************/
/*! exports provided: EventProfilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventProfilePage", function() { return EventProfilePage; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/amaranthus-db/amaranthus-db */ "./src/app/services/amaranthus-db/amaranthus-db.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _common_format__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/format */ "./src/app/common/format.ts");
/* harmony import */ var _common_handleError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/handleError */ "./src/app/common/handleError.ts");
/* harmony import */ var _editevent_editevent_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../editevent/editevent.page */ "./src/app/editevent/editevent.page.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
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









var EventProfilePage = /** @class */ (function () {
    function EventProfilePage(navCtrl, route, db, alertCtrl, modal, storage) {
        this.navCtrl = navCtrl;
        this.route = route;
        this.db = db;
        this.alertCtrl = alertCtrl;
        this.modal = modal;
        this.storage = storage;
        /**
         * This is the data show on the Page
         */
        this.eventControls = {};
        /**
         * This is the data that is to be used for CRUD
         */
        this.event = {};
        this.studentIds = [];
        this.homeURL = '/tabs/tabs/home/events/profile';
        this.htmlControls = {
            toolbar: {
                buttons: {
                    edit: '',
                    calendar: '',
                    stats: ''
                }
            },
            from: '',
            to: '',
            today: '',
            name: '',
            phone: '',
            class: '',
            attended: '',
            absence: '',
            present: '',
            absent: ''
        };
        this.LANGUAGE = {
            english: {
                toolbar: {
                    buttons: {
                        edit: 'Edit',
                        calendar: 'Calendar',
                        stats: 'Stats'
                    }
                },
                from: 'From to: ',
                to: 'to: ',
                today: 'Today is: ',
                name: 'Name: ',
                phone: 'Phone Number: ',
                class: 'Class: ',
                attended: 'Attended',
                absence: 'Absent',
                present: "'s present today!",
                absent: "'s absent today!"
            },
            spanish: {
                toolbar: {
                    buttons: {
                        edit: 'Editar',
                        calendar: 'Calendario',
                        stats: 'Estadísticas'
                    }
                },
                from: 'Desde: ',
                to: 'hasta: ',
                today: 'Hoy es: ',
                name: 'Nombre: ',
                phone: 'Teléfono: ',
                class: 'Clase: ',
                attended: 'Asistió',
                absence: 'Ausente',
                present: " est\u00E1 presente hoy.",
                absent: " est\u00E1 ausente hoy."
            }
        };
    }
    EventProfilePage.prototype.ngOnInit = function () {
        this.id = this.route.snapshot.paramMap.get('id');
        var date = new Date();
        this.currentDate = _common_constants__WEBPACK_IMPORTED_MODULE_4__["MONTHSLABELS"][date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    };
    EventProfilePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('language').then(function (value) {
            if (value) {
                _this.language = value;
                _this.htmlControls = _this.LANGUAGE[value];
            }
            else {
                _this.language = 'english';
                _this.htmlControls = _this.LANGUAGE['english'];
            }
            _this.getEventProfile(_this.id);
        });
    };
    /**
     *
     *
     * @param {*} id
     * @memberof EventProfilePage
     */
    EventProfilePage.prototype.getEventProfile = function (id) {
        this.eventControls = {};
        var date = new Date();
        var response = this.db.getEvent(id);
        if (response.success) {
            this.event = __assign({}, response.data);
            var members = [];
            this.studentIds = [];
            for (var _i = 0, _a = response.data.members; _i < _a.length; _i++) {
                var member = _a[_i];
                this.studentIds = this.studentIds.concat([member.id]);
                var studentResponse = this.db.getStudentById(member);
                if (studentResponse.success) {
                    if (this.event.infiniteDates) {
                        var record = this.db.getQueriedRecordsByCurrentDate({
                            event: this.event.name,
                            studentId: studentResponse.data.id,
                            day: date.getDate(),
                            month: date.getMonth() + 1,
                            year: date.getFullYear()
                        });
                        if (!record) {
                            record = {
                                id: '',
                                year: 0,
                                month: 0,
                                day: 0,
                                attendance: false,
                                absence: false
                            };
                        }
                        members = members.concat([
                            {
                                id: studentResponse.data.id,
                                firstName: studentResponse.data.firstName,
                                initial: studentResponse.data.initial,
                                lastName: studentResponse.data.lastName,
                                phoneNumber: studentResponse.data.phoneNumber,
                                picture: studentResponse.data.picture,
                                class: studentResponse.data.class,
                                attendance: member.attendance,
                                absence: member.absence,
                                record: record
                            }
                        ]);
                    }
                    else {
                        members = members.concat([
                            {
                                id: studentResponse.data.id,
                                firstName: studentResponse.data.firstName,
                                initial: studentResponse.data.initial,
                                lastName: studentResponse.data.lastName,
                                phoneNumber: studentResponse.data.phoneNumber,
                                picture: studentResponse.data.picture,
                                class: studentResponse.data.class,
                                attendance: member.attendance,
                                absence: member.absence
                            }
                        ]);
                    }
                }
            }
            if (response.data.startDate) {
                this.eventControls = __assign({}, response.data, { startDate: Object(_common_format__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(response.data.startDate) });
            }
            else {
                this.eventControls = __assign({}, response.data, { startDate: '' });
            }
            if (response.data.endDate) {
                this.eventControls = __assign({}, this.eventControls, { endDate: Object(_common_format__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(response.data.endDate) });
            }
            this.eventControls = __assign({}, response.data, { members: members.slice() });
        }
        else {
            Object(_common_handleError__WEBPACK_IMPORTED_MODULE_6__["handleError"])(response.error);
        }
    };
    /**
     *
     *
     * @param {*} id
     * @memberof EventProfilePage
     */
    EventProfilePage.prototype.addAttendance = function (id) {
        var index = this.event.members.findIndex(function (member) { return member.id === id; });
        if (this.event.infiniteDates) {
            this.eventControls.members[index].record.attendance = true;
            this.eventControls.members[index].record.absence = false;
        }
        else {
            this.eventControls.members[index].attendance = true;
            this.eventControls.members[index].absence = false;
        }
        this.updateAttendance({ index: index, attendance: true, absence: false });
    };
    /**
     *
     *
     * @param {*} id
     * @memberof EventProfilePage
     */
    EventProfilePage.prototype.addAbsence = function (id) {
        var index = this.event.members.findIndex(function (member) { return member.id === id; });
        if (this.event.infiniteDates) {
            this.eventControls.members[index].record.attendance = false;
            this.eventControls.members[index].record.absence = true;
        }
        else {
            this.eventControls.members[index].attendance = false;
            this.eventControls.members[index].absence = true;
        }
        this.updateAttendance({ index: index, attendance: false, absence: true });
    };
    /**
     *
     *
     * @param {{ index: number; attendance: boolean; absence: boolean }} member
     * @memberof EventProfilePage
     */
    EventProfilePage.prototype.updateAttendance = function (member) {
        if (this.event.infiniteDates) {
            var currentDate = {
                month: new Date().getMonth() + 1,
                day: new Date().getDate(),
                year: new Date().getFullYear()
            };
            this.db.insertOrUpdateRecord({
                id: this.event.members[member.index].id,
                attendance: member.attendance,
                absence: member.absence,
                date: currentDate,
                event: this.event.name
            });
        }
        else {
            this.event.members[member.index].attendance = member.attendance;
            this.event.members[member.index].absence = member.absence;
        }
        try {
            var response = this.db.updateEvent(this.event);
            if (!response.success) {
                var opts = {
                    header: 'Error!',
                    message: 'Attendance was not updated due to an unknown error. Please try again'
                };
                this.showSimpleAlert(opts);
            }
        }
        catch (error) {
            var opts = {
                header: 'Error!',
                message: error
            };
            this.showSimpleAlert(opts);
        }
    };
    /**
     *
     *
     * @private
     * @param {ISimpleAlertOptions} options
     * @memberof EventProfilePage
     */
    EventProfilePage.prototype.showSimpleAlert = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl
                            .create({
                            header: options.header,
                            message: options.message,
                            buttons: options.buttons
                        })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     *
     * @memberof EventProfilePage
     */
    EventProfilePage.prototype.editEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modal.create({
                            component: _editevent_editevent_page__WEBPACK_IMPORTED_MODULE_7__["EditEventPage"],
                            componentProps: { id: this.id }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.present();
                        modal.onDidDismiss().then(function (res) {
                            if (res.data === 'delete') {
                                _this.navCtrl.back();
                            }
                            else if (res.data) {
                                _this.getEventProfile(res.data);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     *
     * @memberof EventProfilePage
     */
    EventProfilePage.prototype.goToCalendar = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // const modal = await this.modal.create({
                //   component: CalendarPage,
                //   componentProps: { event: this.event.name }
                // });
                // modal.present();
                // modal.onDidDismiss().then(_ => {
                //   this.getEventProfile(this.id);
                // });
                this.navCtrl.navigateForward(this.homeURL + "/" + this.id + "/calendar/" + this.event.name + "/" + this.studentIds);
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     *
     * @memberof EventProfilePage
     */
    EventProfilePage.prototype.goToStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //   const modal = await this.modal.create({
                //     component: StatsPage,
                //     componentProps: { event: this.event.name }
                //   });
                //   modal.present();
                this.navCtrl.navigateForward(this.homeURL + "/" + this.id + "/stats/" + this.event.name + "/" + this.studentIds);
                return [2 /*return*/];
            });
        });
    };
    EventProfilePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-eventprofile',
            template: __webpack_require__(/*! ./eventprofile.page.html */ "./src/app/eventprofile/eventprofile.page.html"),
            styles: [__webpack_require__(/*! ./eventprofile.page.scss */ "./src/app/eventprofile/eventprofile.page.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["ActivatedRoute"],
            _services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_3__["AmaranthusDBProvider"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"]])
    ], EventProfilePage);
    return EventProfilePage;
}());



/***/ })

}]);
//# sourceMappingURL=eventprofile-eventprofile-module.js.map