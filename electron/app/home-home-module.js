(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../components/components.module */ "./src/app/components/components.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
    }
];
var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_0__["ComponentsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]]
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/home/home.page.html":
/*!*************************************!*\
  !*** ./src/app/home/home.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>{{htmlControls.toolbar.title}}</ion-title>\n    <ion-buttons slot=\"start\">\n      <app-menu-button></app-menu-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"goToEvents()\">{{htmlControls.toolbar.buttons.event}}</ion-button>\n      <ion-button (click)=\"goToCreate()\">{{htmlControls.toolbar.buttons.add}}</ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content id=\"home\">\n  <ion-searchbar placeholder=\"{{htmlControls.search}}\" (ionInput)=\"searchStudent($event)\" animated=\"true\" type=\"search\">\n  </ion-searchbar>\n  <ion-item lines=\"none\">\n    <ion-label>{{htmlControls.sort}}</ion-label>\n    <ion-select interface=\"popover\" multiple=\"false\" #sort (ionChange)=\"sortData(sort.value)\">\n      <ion-select-option *ngFor=\"let option of selectOptions\" value=\"{{option}}\">{{option}}</ion-select-option>\n    </ion-select>\n  </ion-item>\n  <ion-item lines=\"none\">\n    <ion-label>{{htmlControls.filter}}</ion-label>\n    <ion-select interface=\"popover\" multiple=\"false\" #filter (ionChange)=\"filterByClass(filter.value)\">\n      <ion-select-option *ngFor=\"let class of filterOptions\" value=\"{{class}}\">{{class}}</ion-select-option>\n    </ion-select>\n  </ion-item>\n  <ion-virtual-scroll [items]=\"students\">\n    <div class=\"bottom\" *virtualItem=\"let student\">\n      <ion-card>\n        <ion-card-header>\n          <ion-card-title>{{student.firstName}}\n            <span *ngIf=\"student.initial\">{{student.initial[0]}}.</span> {{student.lastName}}\n          </ion-card-title>\n          <ion-card-subtitle>\n            <span class=\"label\">ID: </span>{{student.id}}\n          </ion-card-subtitle>\n        </ion-card-header>\n        <ion-card-content>\n          <ion-grid>\n            <ion-row>\n              <ion-col size=\"3\">\n                <ion-thumbnail>\n                  <ion-img src=\"{{student.picture}}\" alt=\"{{student.firstName}}'s profile image\"></ion-img>\n                </ion-thumbnail>\n              </ion-col>\n              <ion-col size=\"9\">\n                <ion-item lines=\"none\" *ngIf=\"student.class\">\n                  <ion-label text-wrap>\n                    <span class=\"label\">{{htmlControls.class}}</span>{{student.class}}\n                  </ion-label>\n                </ion-item>\n                <ion-item lines=\"none\" *ngIf=\"student.phoneNumber\">\n                  <ion-label text-wrap>\n                    <span class=\"label\">{{htmlControls.phone}}</span>{{student.phoneNumber}}\n                  </ion-label>\n                </ion-item>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n          <ion-buttons>\n            <ion-button fill=\"solid\" color=\"primary\" (click)=\"addAttendance({id: student.id})\">\n              {{htmlControls.attended}}\n            </ion-button>\n            <ion-button fill=\"solid\" color=\"secondary\" (click)=\"addAbsence({id: student.id})\">\n              {{htmlControls.absence}}\n            </ion-button>\n            <ion-button fill=\"solid\" color=\"tertiary\" (click)=\"goToProfile(student.id)\">\n              {{htmlControls.profile}}\n            </ion-button>\n            <ion-button fill=\"solid\" color=\"dark\" (click)=\"showNotes(student.id)\">\n              <ion-icon name=\"paper\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n          <ion-item lines=\"none\" *ngIf=\"toggle == student.id\" class=\"top\">\n            <textarea #notes (keyup)=\"addNotes({id: student.id, notes:notes.value})\">{{student.notes}}</textarea>\n          </ion-item>\n          <ion-item lines=\"none\">\n            <ion-label class=\"attended\" *ngIf=\"student.attendance\" text-wrap>\n              {{student.firstName}}{{htmlControls.present}}\n            </ion-label>\n            <ion-label class=\"attended\" *ngIf=\"student.absence\" text-wrap>\n              {{student.firstName}}{{htmlControls.absent}}\n            </ion-label>\n          </ion-item>\n        </ion-card-content>\n      </ion-card>\n    </div>\n  </ion-virtual-scroll>\n</ion-content>"

/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#home .label {\n  font-weight: bolder; }\n\n#home .name {\n  font-size: 120%; }\n\n#home .left {\n  float: left; }\n\n#home .right {\n  font-size: 60%;\n  color: #8da2f7; }\n\n#home .attended {\n  color: #e6a4a4; }\n\n#home textarea {\n  width: 100%; }\n\n#home .top {\n  padding-top: 5px; }\n\n#home .bottom {\n  padding-bottom: 2.5em; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc3RlYmFubW9yYWxlcy9Qcm9qZWN0cy9hbWFyYW50aHVzMi9zcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFSSxtQkFBbUIsRUFBQTs7QUFGdkI7RUFLSSxlQUFlLEVBQUE7O0FBTG5CO0VBUUksV0FBVyxFQUFBOztBQVJmO0VBV0ksY0FBYztFQUNkLGNBQXlCLEVBQUE7O0FBWjdCO0VBZUksY0FBeUIsRUFBQTs7QUFmN0I7RUFrQkksV0FBVyxFQUFBOztBQWxCZjtFQXFCSSxnQkFBZSxFQUFBOztBQXJCbkI7RUF3QkkscUJBQXFCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2hvbWUge1xuICAubGFiZWwge1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG4gIH1cbiAgLm5hbWUge1xuICAgIGZvbnQtc2l6ZTogMTIwJTtcbiAgfVxuICAubGVmdCB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gIH1cbiAgLnJpZ2h0IHtcbiAgICBmb250LXNpemU6IDYwJTtcbiAgICBjb2xvcjogcmdiKDE0MSwgMTYyLCAyNDcpO1xuICB9XG4gIC5hdHRlbmRlZCB7XG4gICAgY29sb3I6IHJnYigyMzAsIDE2NCwgMTY0KTtcbiAgfVxuICB0ZXh0YXJlYSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLnRvcHtcbiAgICBwYWRkaW5nLXRvcDo1cHg7XG4gIH1cbiAgLmJvdHRvbXtcbiAgICBwYWRkaW5nLWJvdHRvbTogMi41ZW07XG4gIH1cblxuICBcbn1cblxuIl19 */"

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_create_create_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/create/create.page */ "./src/app/create/create.page.ts");
/* harmony import */ var src_app_services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/amaranthus-db/amaranthus-db */ "./src/app/services/amaranthus-db/amaranthus-db.ts");
/* harmony import */ var src_app_common_handleError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/handleError */ "./src/app/common/handleError.ts");
/* harmony import */ var src_app_common_search__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/search */ "./src/app/common/search.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
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







var HomePage = /** @class */ (function () {
    function HomePage(alertCtrl, db, modalCtrl, navCtrl, loadingController, storage) {
        this.alertCtrl = alertCtrl;
        this.db = db;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.loadingController = loadingController;
        this.storage = storage;
        this.homeURL = '/tabs/tabs/home';
        this.htmlControls = {
            toolbar: {
                title: '',
                buttons: {
                    event: '',
                    add: ''
                }
            },
            sort: '',
            filter: '',
            class: '',
            phone: '',
            attended: '',
            absence: '',
            profile: '',
            present: "",
            absent: "",
            search: ''
        };
        this.language = '';
        this.LANGUAGE = {
            english: {
                toolbar: {
                    title: 'Daily Attendance',
                    buttons: {
                        event: 'Events',
                        add: 'Add'
                    }
                },
                sort: 'Sort by: ',
                filter: 'Filter by: ',
                class: 'Class: ',
                phone: 'Phone: ',
                attended: 'Attended',
                absence: 'Absent',
                profile: 'Profile',
                present: "'s present today!",
                absent: "'s absent today!",
                search: 'Search by ID or Name'
            },
            spanish: {
                toolbar: {
                    title: 'Asistencia Diaria',
                    buttons: {
                        event: 'Evento',
                        add: 'Crear'
                    }
                },
                sort: 'Ordenar por: ',
                filter: 'Filtrar por: ',
                class: 'Clase: ',
                phone: 'Teléfono: ',
                attended: 'Asistió',
                absence: 'Ausente',
                profile: 'Perfil',
                present: " est\u00E1 presente hoy.",
                absent: " est\u00E1 ausente hoy.",
                search: 'Buscar por ID o Nombre'
            }
        };
    }
    HomePage.prototype.ngOnInit = function () {
        var currentDate = new Date();
        this.date = {
            month: currentDate.getMonth(),
            day: currentDate.getDate(),
            year: currentDate.getFullYear()
        };
        this.students = [];
        this.unfilteredStudents = [];
        this.getStudents();
    };
    HomePage.prototype.ionViewWillEnter = function () {
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
            if (_this.language === 'spanish') {
                _this.selectOptions = ['ID', 'Nombre', 'Ninguno'];
                _this.sortElement.value = 'Ninguno';
                _this.filterElement.value = 'Activo';
            }
            else {
                _this.selectOptions = ['ID', 'Name', 'None'];
                _this.sortElement.value = 'None';
                _this.filterElement.value = 'Active';
            }
            _this.getStudents();
            _this.filterOptions = _this.getFilterOptions();
            //////////// Use for testing only!///////////
            // for (let i = 0; i < this.students.length; i++) {
            //   this.db.insertTest();
            // }
            /////////////////////////////////////////////
        });
    };
    HomePage.prototype.getStudents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, studentResponse, loading_1, studentTimeout_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = __assign({}, this.date, { month: this.date.month + 1 });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        studentResponse = this.db.getAllActiveStudents(date);
                        if (!(studentResponse.success === true && studentResponse.data)) return [3 /*break*/, 2];
                        this.students = studentResponse.data.filter(function (student) {
                            if (student.isActive) {
                                return student;
                            }
                        });
                        // this.students = studentResponse.data; //Do not delete!
                        this.unfilteredStudents = studentResponse.data;
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.loadingController.create()];
                    case 3:
                        loading_1 = _a.sent();
                        return [4 /*yield*/, loading_1.present()];
                    case 4:
                        _a.sent();
                        studentTimeout_1 = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.getStudents();
                                        this.filterOptions = this.getFilterOptions();
                                        return [4 /*yield*/, loading_1.dismiss()];
                                    case 1:
                                        _a.sent();
                                        if (this.students.length > 0) {
                                            this.appStart = true;
                                            this.db.convertLegacyData();
                                            clearTimeout(studentTimeout_1);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 3000);
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        Object(src_app_common_handleError__WEBPACK_IMPORTED_MODULE_4__["handleError"])(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.showNotes = function (id) {
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
    HomePage.prototype.addNotes = function (opts) {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            var currentDate = new Date();
            var newNote = __assign({}, opts, { event: '', month: currentDate.getMonth(), day: currentDate.getDate(), year: currentDate.getFullYear() });
            _this.db.insertNotes(newNote);
            _this.updateNotes(opts);
        }, 1000);
    };
    HomePage.prototype.updateNotes = function (opts) {
        var index = this.students.findIndex(function (student) {
            if (student.id === opts.id) {
                return true;
            }
        });
        this.students[index].notes = opts.notes;
        this.unfilteredStudents[index].notes = opts.notes;
    };
    HomePage.prototype.getFilterOptions = function () {
        var options = [];
        var checkIfHaveClass = this.students.filter(function (student) {
            if (student.class) {
                return true;
            }
        });
        for (var _i = 0, checkIfHaveClass_1 = checkIfHaveClass; _i < checkIfHaveClass_1.length; _i++) {
            var student = checkIfHaveClass_1[_i];
            if (options.indexOf(student.class) === -1) {
                options = options.concat([student.class]);
            }
        }
        if (this.language === 'spanish') {
            options = options.concat(['Activo', 'Inactivo', 'Masculino', 'Femenino', 'No revelado', 'Todos']);
        }
        else {
            options = options.concat(['Active', 'Not Active', 'Male', 'Female', 'Undisclosed', 'All']);
        }
        return options;
    };
    HomePage.prototype.filterByClass = function (option) {
        var newQuery = [];
        switch (option) {
            case 'Male':
            case 'Female':
            case 'Undisclosed':
                var gender_1 = option.toLowerCase();
                newQuery = this.unfilteredStudents.filter(function (student) {
                    if (student.gender === gender_1) {
                        return student;
                    }
                });
                this.students = newQuery.slice();
                break;
            case 'Masculino':
                this.filterByClass('Male');
                break;
            case 'Femenino':
                this.filterByClass('Female');
                break;
            case 'No revelado':
                this.filterByClass('Undisclosed');
                break;
            case 'Todos':
                this.filterByClass('All');
                break;
            case 'All':
                this.initializeStudentsList();
                break;
            case 'Activo':
                this.filterByClass('Active');
                break;
            case 'Inactivo':
                this.filterByClass('Not Active');
                break;
            case 'Active':
                newQuery = this.unfilteredStudents.filter(function (student) {
                    if (student.isActive) {
                        return student;
                    }
                });
                this.students = newQuery.slice();
                break;
            case 'Not Active':
                newQuery = this.unfilteredStudents.filter(function (student) {
                    if (!student.isActive) {
                        return student;
                    }
                });
                this.students = newQuery.slice();
                break;
            case 'All':
                this.initializeStudentsList();
                break;
            default:
                newQuery = this.unfilteredStudents.filter(function (student) {
                    if (student.class === option) {
                        return student;
                    }
                });
                this.students = newQuery.slice();
        }
    };
    HomePage.prototype.initializeStudentsList = function () {
        this.students = this.unfilteredStudents.slice();
    };
    HomePage.prototype.searchStudent = function (event) {
        var query = event.target.value;
        query ? this.filterStudentsList(query) : this.initializeStudentsList();
    };
    HomePage.prototype.sortData = function (option) {
        switch (option) {
            case 'ID':
                this.sortStudentsbyId();
                break;
            case 'Name':
            case 'Nombre':
                this.sortStudentsName();
                break;
            default:
                this.initializeStudentsList();
        }
    };
    HomePage.prototype.sortStudentsbyId = function () {
        this.students = Object(src_app_common_search__WEBPACK_IMPORTED_MODULE_5__["sortStudentsbyId"])(this.students);
    };
    HomePage.prototype.sortStudentsName = function () {
        this.students = Object(src_app_common_search__WEBPACK_IMPORTED_MODULE_5__["sortStudentsName"])(this.students);
    };
    HomePage.prototype.filterStudentsList = function (query) {
        this.students = Object(src_app_common_search__WEBPACK_IMPORTED_MODULE_5__["filterStudentsList"])({ query: query, students: this.unfilteredStudents });
    };
    HomePage.prototype.addAttendance = function (opts) {
        var response = this.db.addAttendance({ date: this.date, id: opts.id });
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
            Object(src_app_common_handleError__WEBPACK_IMPORTED_MODULE_4__["handleError"])(response.error);
        }
    };
    HomePage.prototype.addAbsence = function (opts) {
        var response = this.db.addAbsence({ date: this.date, id: opts.id });
        if (response.success === true) {
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
            this.updateStudentAttendance({
                id: opts.id,
                absence: true,
                attendance: false
            });
        }
        else {
            Object(src_app_common_handleError__WEBPACK_IMPORTED_MODULE_4__["handleError"])(response.error);
        }
    };
    HomePage.prototype.updateStudentAttendance = function (opts) {
        // const results = this.students.map(student => {
        //   if (student.id === opts.id) {
        //     return {
        //       ...student,
        //       attendance: opts.attendance,
        //       absence: opts.absence
        //     };
        //   } else {
        //     return student;
        //   }
        // });
        // this.unfilteredStudents = [...results];
        // this.students = [...results];
        for (var i = 0; i < this.students.length; i++) {
            if (this.students[i].id === opts.id) {
                this.students[i].attendance = opts.attendance;
                this.students[i].absence = opts.absence;
                this.unfilteredStudents[i].attendance = opts.attendance;
                this.unfilteredStudents[i].absence = opts.absence;
            }
        }
    };
    HomePage.prototype.showSimpleAlert = function (options) {
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
    HomePage.prototype.goToCreate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: src_app_create_create_page__WEBPACK_IMPORTED_MODULE_2__["CreatePage"]
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.present();
                        modal.onDidDismiss().then(function (_) {
                            _this.getStudents();
                            _this.filterOptions = _this.getFilterOptions();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.goToProfile = function (id) {
        this.navCtrl.navigateForward(this.homeURL + "/profile/" + id);
    };
    HomePage.prototype.goToEvents = function () {
        this.navCtrl.navigateForward(this.homeURL + "/events");
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('notes'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "notesElement", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sort'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "sortElement", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('filter'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "filterElement", void 0);
    HomePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.page.html */ "./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            src_app_services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_3__["AmaranthusDBProvider"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["NavController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"]])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module.js.map