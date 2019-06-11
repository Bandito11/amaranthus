(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["calendar-calendar-module"],{

/***/ "./src/app/calendar/calendar.module.ts":
/*!*********************************************!*\
  !*** ./src/app/calendar/calendar.module.ts ***!
  \*********************************************/
/*! exports provided: CalendarPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarPageModule", function() { return CalendarPageModule; });
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../components/components.module */ "./src/app/components/components.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _calendar_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./calendar.page */ "./src/app/calendar/calendar.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        component: _calendar_page__WEBPACK_IMPORTED_MODULE_6__["CalendarPage"]
    }
];
var CalendarPageModule = /** @class */ (function () {
    function CalendarPageModule() {
    }
    CalendarPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_0__["ComponentsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_calendar_page__WEBPACK_IMPORTED_MODULE_6__["CalendarPage"]]
        })
    ], CalendarPageModule);
    return CalendarPageModule;
}());



/***/ }),

/***/ "./src/app/calendar/calendar.page.html":
/*!*********************************************!*\
  !*** ./src/app/calendar/calendar.page.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>{{htmlControls.toolbar.title}}</ion-title>\n    <ion-buttons slot=\"start\">\n      <ion-back-button *ngIf=\"event\"></ion-back-button>\n      <app-menu-button *ngIf=\"!event\"></app-menu-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding class=\"calendar\">\n  <calendar-component [language]=\"language\" (getDate)=\"getDate($event)\"></calendar-component>\n  <h4>{{currentDate}}</h4>\n  <ion-searchbar [(ngModel)]=\"search\" (ionInput)=\"searchStudent()\" animated=\"true\" type=\"search\">\n  </ion-searchbar>\n  <ion-list *ngIf=\"students\" lines=\"none\">\n    <ion-virtual-scroll [items]=\"students\" approxHeaderWidth=\"380px\" approxHeaderHeight=\"44px\" approxItemWidth=\"380px\"\n      approxItemHeight=\"240px\">\n      <!-- <ion-item-sliding *ngFor=\"let student of students\" #slidingUser> -->\n      <div *virtualItem=\"let student\" class=\"bottom\">\n        <ion-item>\n          <ion-avatar slot=\"start\">\n            <ion-img src=\"{{student.picture}}\" alt=\"no image\"></ion-img>\n          </ion-avatar>\n          <ion-label>\n            <p>\n              <span class=\"label name\">{{htmlControls.name}}</span>\n              <span class=\"name\">{{student.fullName}}</span>\n            </p>\n            <p>\n              <span class=\"label\">ID: </span>{{student.id}}\n            </p>\n            <ion-buttons>\n              <ion-button fill=\"solid\" color=\"primary\" (click)=\"addAttendance({id: student.id})\">\n                {{htmlControls.attended}}\n              </ion-button>\n              <ion-button fill=\"solid\" color=\"secondary\" (click)=\"addAbsence({id: student.id})\">\n                {{htmlControls.absence}}\n              </ion-button>\n              <ion-button fill=\"solid\" color=\"dark\" (click)=\"showNotes(student.id)\">\n                <ion-icon name=\"paper\"></ion-icon>\n              </ion-button>\n            </ion-buttons>\n            <ion-item *ngIf=\"toggle == student.id\" class=\"top\">\n            <textarea #notes (keyup)=\"addNotes({id: student.id, notes:notes.value})\"\n              padding>{{student.notes}}</textarea>\n            </ion-item>\n            <div class=\"pad\">\n              <p class=\"left attended\" *ngIf=\"student.attendance\">\n                {{student.firstName}}{{htmlControls.present}}\n              </p>\n              <p class=\"left attended\" *ngIf=\"student.absence\">\n                {{student.firstName}}{{htmlControls.absent}}\n              </p>\n            </div>\n          </ion-label>\n        </ion-item>\n      </div>\n    </ion-virtual-scroll>\n  </ion-list>\n</ion-content>"

/***/ }),

/***/ "./src/app/calendar/calendar.page.scss":
/*!*********************************************!*\
  !*** ./src/app/calendar/calendar.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".calendar h4 {\n  text-align: center; }\n\n.calendar .label {\n  font-weight: bolder; }\n\n.calendar .name {\n  font-size: 130%; }\n\n.calendar .left {\n  float: left; }\n\n.calendar .right {\n  float: right;\n  color: #8da2f7; }\n\n.calendar .attended {\n  color: #e6a4a4; }\n\n.calendar textarea {\n  width: 100%; }\n\n.calendar .top {\n  padding-top: 5px; }\n\n.calendar .pad {\n  padding-bottom: 1em; }\n\n.calendar .bottom {\n  padding-bottom: 4.7em; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc3RlYmFubW9yYWxlcy9Qcm9qZWN0cy9hbWFyYW50aHVzMi9zcmMvYXBwL2NhbGVuZGFyL2NhbGVuZGFyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVJLGtCQUFrQixFQUFBOztBQUZ0QjtFQUtJLG1CQUFtQixFQUFBOztBQUx2QjtFQVFJLGVBQWUsRUFBQTs7QUFSbkI7RUFXSSxXQUFXLEVBQUE7O0FBWGY7RUFjSSxZQUFZO0VBQ1osY0FBeUIsRUFBQTs7QUFmN0I7RUFrQkksY0FBeUIsRUFBQTs7QUFsQjdCO0VBcUJJLFdBQVcsRUFBQTs7QUFyQmY7RUF3QkksZ0JBQWUsRUFBQTs7QUF4Qm5CO0VBMkJJLG1CQUFtQixFQUFBOztBQTNCdkI7RUE4QkkscUJBQXFCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jYWxlbmRhci9jYWxlbmRhci5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FsZW5kYXIge1xuICBoNCB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG4gIC5sYWJlbCB7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbiAgfVxuICAubmFtZSB7XG4gICAgZm9udC1zaXplOiAxMzAlO1xuICB9XG4gIC5sZWZ0IHtcbiAgICBmbG9hdDogbGVmdDtcbiAgfVxuICAucmlnaHQge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBjb2xvcjogcmdiKDE0MSwgMTYyLCAyNDcpO1xuICB9XG4gIC5hdHRlbmRlZCB7XG4gICAgY29sb3I6IHJnYigyMzAsIDE2NCwgMTY0KTtcbiAgfVxuICB0ZXh0YXJlYSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLnRvcHtcbiAgICBwYWRkaW5nLXRvcDo1cHg7XG4gIH1cbiAgLnBhZHtcbiAgICBwYWRkaW5nLWJvdHRvbTogMWVtO1xuICB9XG4gIC5ib3R0b217XG4gICAgcGFkZGluZy1ib3R0b206IDQuN2VtO1xuICB9XG59XG5cbiJdfQ== */"

/***/ }),

/***/ "./src/app/calendar/calendar.page.ts":
/*!*******************************************!*\
  !*** ./src/app/calendar/calendar.page.ts ***!
  \*******************************************/
/*! exports provided: CalendarPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarPage", function() { return CalendarPage; });
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_common_handleError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/handleError */ "./src/app/common/handleError.ts");
/* harmony import */ var src_app_common_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/search */ "./src/app/common/search.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/amaranthus-db/amaranthus-db */ "./src/app/services/amaranthus-db/amaranthus-db.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
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









var CalendarPage = /** @class */ (function () {
    function CalendarPage(route, alertCtrl, db, storage) {
        this.route = route;
        this.alertCtrl = alertCtrl;
        this.db = db;
        this.storage = storage;
        this.htmlControls = {
            attended: '',
            absence: '',
            present: "",
            absent: '',
            toolbar: {
                title: ''
            },
            name: ''
        };
        this.LANGUAGE = {
            spanish: {
                attended: 'Asistió',
                absence: 'Ausente',
                present: " est\u00E1 presente hoy.",
                absent: ' está ausente hoy.',
                toolbar: {
                    title: 'Calendario'
                },
                name: 'Nombre: '
            },
            english: {
                attended: 'Attended',
                absence: 'Absent',
                present: "'s is present today!",
                absent: "'s is absent today",
                toolbar: {
                    title: 'Calendar'
                },
                name: 'Name: '
            }
        };
    }
    CalendarPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.timer = 0;
        this.storage.get('language').then(function (value) {
            if (value) {
                _this.language = value;
            }
            else {
                _this.language = 'english';
            }
            _this.htmlControls = _this.LANGUAGE[_this.language];
        });
        this.event = this.route.snapshot.paramMap.get('event');
        if (!this.event) {
            this.event = '';
        }
        try {
            this.studentIds = this.route.snapshot.paramMap.get('ids').split(',');
        }
        catch (error) {
            this.studentIds = [];
        }
        this.getStudentsRecords(this.date);
    };
    CalendarPage.prototype.showNotes = function (id) {
        var _this = this;
        if (this.toggle) {
            this.toggle = '';
        }
        else {
            this.toggle = id;
            setTimeout(function () {
                _this.notesElement.nativeElement.focus();
            }, 0);
        }
    };
    CalendarPage.prototype.addNotes = function (opts) {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            var newNote = __assign({}, opts, { month: _this.date.month, day: _this.date.day, year: _this.date.year, event: _this.event });
            _this.db.insertNotes(newNote);
            _this.updateNotes(opts);
        }, 1000);
    };
    CalendarPage.prototype.updateNotes = function (opts) {
        var index = this.students.findIndex(function (student) {
            if (student.id === opts.id) {
                return true;
            }
        });
        this.students[index].notes = opts.notes;
        this.unfilteredStudents[index].notes = opts.notes;
    };
    /**
     *
     * @param {ICalendar} opts
     * Will get all Students queried by today's date.
     */
    CalendarPage.prototype.getStudentsRecords = function (opts) {
        var date = __assign({}, opts, { month: opts.month + 1 });
        this.students = [];
        this.unfilteredStudents = [];
        try {
            var response = this.db.getStudentsRecordsByDate({
                date: date,
                event: this.event
            });
            if (response.success === true) {
                if (this.studentIds.length > 0) {
                    var list = [];
                    var _loop_1 = function (id) {
                        var found = response.data.find(function (student) { return id === student.id; });
                        if (found) {
                            list = list.concat([found]);
                        }
                    };
                    for (var _i = 0, _a = this.studentIds; _i < _a.length; _i++) {
                        var id = _a[_i];
                        _loop_1(id);
                    }
                    this.students = list;
                    this.unfilteredStudents = list;
                }
                else {
                    this.students = response.data;
                    this.unfilteredStudents = response.data;
                }
            }
            else {
                Object(src_app_common_handleError__WEBPACK_IMPORTED_MODULE_2__["handleError"])(response.error);
            }
        }
        catch (error) {
            Object(src_app_common_handleError__WEBPACK_IMPORTED_MODULE_2__["handleError"])(error);
        }
    };
    /**
     *
     * @param date
     */
    CalendarPage.prototype.getDate = function (date) {
        this.search = '';
        this.date = date;
        var currentDay = date.day;
        var currentYear = date.year;
        if (this.language === 'spanish') {
            var currentMonth = _common_constants__WEBPACK_IMPORTED_MODULE_0__["MESESLABELS"][date.month];
            var currentWeekDay = _common_constants__WEBPACK_IMPORTED_MODULE_0__["DIASHEADER"][date.weekDay];
            this.currentDate = currentWeekDay + " " + currentDay + " de " + currentMonth + " de " + currentYear;
        }
        else {
            var currentMonth = _common_constants__WEBPACK_IMPORTED_MODULE_0__["MONTHSLABELS"][date.month];
            var currentWeekDay = _common_constants__WEBPACK_IMPORTED_MODULE_0__["WEEKDAYSHEADER"][date.weekDay];
            this.currentDate = currentWeekDay + ", " + currentDay + " " + currentMonth + ", " + currentYear;
        }
        this.getStudentsRecords(date);
    };
    CalendarPage.prototype.addAttendance = function (opts) {
        var response = this.db.addAttendance({
            event: this.event,
            date: this.date,
            id: opts.id
        });
        if (response.success === true) {
            this.updateStudentAttendance({
                id: opts.id,
                absence: false,
                attendance: true
            });
            var options = void 0;
            if (this.language === 'spanish') {
                options = {
                    header: 'Éxito',
                    message: '¡El estudiante se marcó presente!',
                    buttons: ['Aprobar']
                };
            }
            else {
                options = {
                    header: 'Success!',
                    message: 'Student was marked present!',
                    buttons: ['OK']
                };
            }
            this.showSimpleAlert(options);
        }
        else {
            Object(src_app_common_handleError__WEBPACK_IMPORTED_MODULE_2__["handleError"])(response.error);
        }
    };
    CalendarPage.prototype.addAbsence = function (opts) {
        var response = this.db.addAbsence({
            event: this.event,
            date: this.date,
            id: opts.id
        });
        if (response.success === true) {
            this.updateStudentAttendance({
                id: opts.id,
                absence: true,
                attendance: false
            });
            var options = void 0;
            if (this.language === 'spanish') {
                options = {
                    header: 'Éxito',
                    message: '¡El estudiante se marcó ausente!',
                    buttons: ['Aprobar']
                };
            }
            else {
                options = {
                    header: 'Success!',
                    message: 'Student was marked absent!',
                    buttons: ['OK']
                };
            }
            this.showSimpleAlert(options);
        }
        else {
            Object(src_app_common_handleError__WEBPACK_IMPORTED_MODULE_2__["handleError"])(response.error);
        }
    };
    CalendarPage.prototype.updateStudentAttendance = function (opts) {
        for (var i = 0; i < this.students.length; i++) {
            if (this.students[i].id === opts.id) {
                this.students[i].attendance = opts.attendance;
                this.students[i].absence = opts.absence;
                this.unfilteredStudents[i].attendance = opts.attendance;
                this.unfilteredStudents[i].absence = opts.absence;
            }
        }
    };
    CalendarPage.prototype.showSimpleAlert = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: options.header,
                            message: options.message,
                            buttons: options.buttons
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CalendarPage.prototype.searchStudent = function () {
        var query = this.search;
        query ? this.filterStudentsList(query) : this.initializeStudentsList();
    };
    CalendarPage.prototype.initializeStudentsList = function () {
        this.students = this.unfilteredStudents.slice();
    };
    CalendarPage.prototype.filterStudentsList = function (query) {
        var students = this.unfilteredStudents;
        this.students = Object(src_app_common_search__WEBPACK_IMPORTED_MODULE_3__["filterStudentsList"])({ query: query, students: students });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('notes'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], CalendarPage.prototype, "notesElement", void 0);
    CalendarPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-calendar',
            template: __webpack_require__(/*! ./calendar.page.html */ "./src/app/calendar/calendar.page.html"),
            styles: [__webpack_require__(/*! ./calendar.page.scss */ "./src/app/calendar/calendar.page.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"],
            src_app_services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_5__["AmaranthusDBProvider"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"]])
    ], CalendarPage);
    return CalendarPage;
}());



/***/ })

}]);
//# sourceMappingURL=calendar-calendar-module.js.map