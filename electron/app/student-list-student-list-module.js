(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["student-list-student-list-module"],{

/***/ "./src/app/student-list/student-list.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/student-list/student-list.module.ts ***!
  \*****************************************************/
/*! exports provided: StudentListPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentListPageModule", function() { return StudentListPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _student_list_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./student-list.page */ "./src/app/student-list/student-list.page.ts");
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
        component: _student_list_page__WEBPACK_IMPORTED_MODULE_5__["StudentListPage"]
    }
];
var StudentListPageModule = /** @class */ (function () {
    function StudentListPageModule() {
    }
    StudentListPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_6__["ComponentsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_student_list_page__WEBPACK_IMPORTED_MODULE_5__["StudentListPage"]]
        })
    ], StudentListPageModule);
    return StudentListPageModule;
}());



/***/ }),

/***/ "./src/app/student-list/student-list.page.html":
/*!*****************************************************!*\
  !*** ./src/app/student-list/student-list.page.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>{{htmlControls.toolbar.title}}</ion-title>\n    <ion-buttons slot=\"start\">\n      <app-menu-button></app-menu-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"goToCreate()\">\n          {{htmlControls.toolbar.buttons.add}}\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content id=\"student-list\">\n  <ion-searchbar placeholder=\"{{htmlControls.search}}\" (ionInput)=\"searchStudent($event)\" animated=\"true\" type=\"search\">\n  </ion-searchbar>\n  <ion-item>\n    <ion-label>{{htmlControls.sort}}</ion-label>\n    <ion-select interface=\"popover\" multiple=\"false\" #sort (ionChange)=\"sortData(sort.value)\">\n      <ion-select-option *ngFor=\"let option of selectOptions\" value=\"{{option}}\">{{option}}</ion-select-option>\n    </ion-select>\n  </ion-item>\n  <ion-item>\n    <ion-label>{{htmlControls.filter}}</ion-label>\n    <ion-select interface=\"popover\" multiple=\"false\" placeholder=\"None\" #filter\n      (ionChange)=\"filterByClass(filter.value)\">\n      <ion-select-option *ngFor=\"let class of filterOptions\" value=\"{{class}}\">{{class}}</ion-select-option>\n    </ion-select>\n  </ion-item>\n  <ion-list lines=\"none\">\n    <ion-virtual-scroll [items]=\"students\" approxHeaderHeight=\"44px\" approxItemHeight=\"270px\">\n      <ion-card *virtualItem=\"let student\" (click)=\"goToProfile(student.id)\">\n        <ion-card-header>\n          <ion-card-title>{{student.firstName}}\n            <span *ngIf=\"student.initial\">{{student.initial[0]}}.</span> {{student.lastName}}\n          </ion-card-title>\n          <ion-card-subtitle><span class=\"label\">ID: </span>{{student.id}}</ion-card-subtitle>\n        </ion-card-header>\n        <ion-card-content>\n          <ion-grid>\n            <ion-row>\n              <ion-col size=\"3\">\n                <ion-thumbnail>\n                  <ion-img src=\"{{student.picture}}\" alt=\"An image of user\"></ion-img>\n                </ion-thumbnail>\n              </ion-col>\n              <ion-col size=\"9\">\n                <ion-item>\n                  <ion-label text-wrap>\n                    <span class=\"label\">{{htmlControls.address}}</span>{{student.address}}\n                  </ion-label>\n                </ion-item>\n                <ion-item>\n                  <ion-label text-wrap>\n                    <span class=\"label\">{{htmlControls.town}}</span>{{student.town}}\n                  </ion-label>\n                </ion-item>\n                <ion-item>\n                  <ion-label text-wrap>\n                    <span class=\"label\">{{htmlControls.state}}</span>{{student.state}}\n                  </ion-label>\n                </ion-item>\n                <ion-item *ngIf=\"student.class\">\n                  <ion-label text-wrap>\n                    <span class=\"label\">{{htmlControls.class}}</span>{{student.class}}\n                  </ion-label>\n                </ion-item>\n                <ion-item *ngIf=\"student.phoneNumber\">\n                  <ion-label text-wrap>\n                    <span class=\"label\">{{htmlControls.phone}}</span>{{student.phoneNumber}}\n                  </ion-label>\n                </ion-item>\n                <ion-item *ngIf=\"student.emergencyContactName\">\n                  <ion-label text-wrap>\n                    <span class=\"label\">{{htmlControls.contact}}</span>{{student.emergencyContactName}}\n                  </ion-label>\n                </ion-item>\n                <ion-item *ngIf=\"student.emergencyContactPhoneNumber\">\n                  <ion-label text-wrap>\n                    <span class=\"label\">{{htmlControls.phone}}</span>{{student.emergencyContactPhoneNumber}}\n                  </ion-label>\n                </ion-item>\n                <ion-item *ngIf=\"!student.isActive\">\n                  <ion-label text-wrap>\n                    <p>\n                      {{htmlControls.active}}\n                    </p>\n                  </ion-label>\n                </ion-item>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n          <p class=\"attended\">\n            {{htmlControls.profile}}{{student.firstName}}{{htmlControls.profile2}}\n          </p>\n        </ion-card-content>\n      </ion-card>\n    </ion-virtual-scroll>\n  </ion-list>\n\n</ion-content>"

/***/ }),

/***/ "./src/app/student-list/student-list.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/student-list/student-list.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#student-list .label {\n  font-weight: bolder; }\n\n#student-list .name {\n  font-size: 130%; }\n\n.attended {\n  color: #e6a4a4; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc3RlYmFubW9yYWxlcy9Qcm9qZWN0cy9hbWFyYW50aHVzMi9zcmMvYXBwL3N0dWRlbnQtbGlzdC9zdHVkZW50LWxpc3QucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRUksbUJBQW1CLEVBQUE7O0FBRnZCO0VBS0ksZUFBZSxFQUFBOztBQUduQjtFQUNFLGNBQXlCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zdHVkZW50LWxpc3Qvc3R1ZGVudC1saXN0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNzdHVkZW50LWxpc3Qge1xuICAubGFiZWwge1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG4gIH1cbiAgLm5hbWUge1xuICAgIGZvbnQtc2l6ZTogMTMwJTtcbiAgfVxufVxuLmF0dGVuZGVkIHtcbiAgY29sb3I6IHJnYigyMzAsIDE2NCwgMTY0KTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/student-list/student-list.page.ts":
/*!***************************************************!*\
  !*** ./src/app/student-list/student-list.page.ts ***!
  \***************************************************/
/*! exports provided: StudentListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentListPage", function() { return StudentListPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/amaranthus-db/amaranthus-db */ "./src/app/services/amaranthus-db/amaranthus-db.ts");
/* harmony import */ var _common_handleError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/handleError */ "./src/app/common/handleError.ts");
/* harmony import */ var _common_search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/search */ "./src/app/common/search.ts");
/* harmony import */ var _create_create_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../create/create.page */ "./src/app/create/create.page.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
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







var StudentListPage = /** @class */ (function () {
    function StudentListPage(alertCtrl, navCtrl, modalCtrl, db, storage) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.db = db;
        this.storage = storage;
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
            search: '',
            address: '',
            town: '',
            state: '',
            active: "Student is not active on the roster!",
            contact: '',
            profile: 'Tap to see ',
            profile2: "'s profile!"
        };
        this.language = '';
        this.LANGUAGE = {
            english: {
                toolbar: {
                    title: 'Roster',
                    buttons: {
                        add: 'Add'
                    }
                },
                sort: 'Sort by: ',
                filter: 'Filter by: ',
                class: 'Class: ',
                phone: 'Phone: ',
                search: 'Search by ID or Name',
                address: 'Adress: ',
                town: 'Town: ',
                state: 'State: ',
                active: "Student is not active on the roster!",
                contact: 'Emergency Contact: ',
                profile: 'Tap to see ',
                profile2: "'s profile!"
            },
            spanish: {
                toolbar: {
                    title: 'Registro',
                    buttons: {
                        add: 'Crear'
                    }
                },
                sort: 'Ordenar por: ',
                filter: 'Filtrar por: ',
                class: 'Clase: ',
                phone: 'Teléfono: ',
                attended: 'Asistió',
                absence: 'Ausente',
                present: " est\u00E1 presente hoy.",
                absent: " est\u00E1 ausente hoy.",
                search: 'Buscar por ID o Nombre',
                address: 'Dirección: ',
                town: 'Pueblo: ',
                state: 'Estado: ',
                active: "\u00A1No esta activo en el registro!",
                contact: 'Contacto de Emergencia: ',
                profile: 'Presiona para ver el perfil de ',
                profile2: ""
            }
        };
    }
    StudentListPage.prototype.ngOnInit = function () {
        this.students = [];
        this.unfilteredStudents = [];
    };
    StudentListPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.sortElement.placeholder = 'None';
        this.query = 'None';
        this.storage.get('language').then(function (value) {
            if (value) {
                _this.language = value;
            }
            else {
                _this.language = 'english';
            }
            _this.htmlControls = _this.LANGUAGE[_this.language];
            if (_this.language === 'spanish') {
                _this.selectOptions = ['ID', 'Nombre', 'Sin filtro'];
                _this.sortElement.placeholder = 'Sin filtro';
                _this.filterElement.placeholder = 'Sin filtro';
            }
            else {
                _this.selectOptions = ['ID', 'Name', 'None'];
                _this.sortElement.placeholder = 'None';
                _this.filterElement.placeholder = 'None';
            }
            _this.getStudents();
            _this.filterOptions = _this.getFilterOptions();
        });
    };
    StudentListPage.prototype.initializeStudentsList = function () {
        this.students = this.unfilteredStudents.slice();
    };
    StudentListPage.prototype.getFilterOptions = function () {
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
            options = options.concat(['Activo', 'Inactivo', 'Masculino', 'Femenino', 'No revelado', 'Sin filtro']);
        }
        else {
            options = options.concat(['Active', 'Not Active', 'Male', 'Female', 'Undisclosed', 'None']);
        }
        return options;
    };
    StudentListPage.prototype.goToProfile = function (id) {
        this.navCtrl.navigateForward("/tabs/tabs/roster/profile/" + id);
    };
    StudentListPage.prototype.filterByClass = function (option) {
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
            case 'Sin filtro':
                this.filterByClass('None');
                break;
            case 'None':
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
            case 'None':
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
    StudentListPage.prototype.searchStudent = function (event) {
        var query = event.target.value;
        query ? this.queryStudentsList(query) : this.initializeStudentsList();
    };
    StudentListPage.prototype.getStudents = function () {
        try {
            var response = this.db.getAllStudents();
            if (response.success === true) {
                this.students = response.data;
                this.unfilteredStudents = response.data;
            }
            else {
                Object(_common_handleError__WEBPACK_IMPORTED_MODULE_3__["handleError"])(response.error);
            }
        }
        catch (error) {
            Object(_common_handleError__WEBPACK_IMPORTED_MODULE_3__["handleError"])(error);
        }
    };
    StudentListPage.prototype.sortData = function (option) {
        switch (option) {
            case 'Id':
                this.sortStudentsbyId();
                break;
            case 'Name':
                this.sortStudentsName();
                break;
            default:
                this.students = this.unfilteredStudents.slice();
        }
    };
    StudentListPage.prototype.sortStudentsbyId = function () {
        this.students = Object(_common_search__WEBPACK_IMPORTED_MODULE_4__["sortStudentsbyId"])(this.students);
    };
    StudentListPage.prototype.sortStudentsName = function () {
        this.students = Object(_common_search__WEBPACK_IMPORTED_MODULE_4__["sortStudentsName"])(this.students);
    };
    StudentListPage.prototype.queryStudentsList = function (query) {
        this.students = Object(_common_search__WEBPACK_IMPORTED_MODULE_4__["filterStudentsList"])({ query: query, students: this.unfilteredStudents });
    };
    StudentListPage.prototype.goToCreate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: _create_create_page__WEBPACK_IMPORTED_MODULE_5__["CreatePage"]
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.present();
                        modal.onDidDismiss().then(function () {
                            _this.getStudents();
                            _this.filterOptions = _this.getFilterOptions();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    StudentListPage.prototype.showSimpleAlert = function (options) {
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
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sort'),
        __metadata("design:type", Object)
    ], StudentListPage.prototype, "sortElement", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('filter'),
        __metadata("design:type", Object)
    ], StudentListPage.prototype, "filterElement", void 0);
    StudentListPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-student-list',
            template: __webpack_require__(/*! ./student-list.page.html */ "./src/app/student-list/student-list.page.html"),
            styles: [__webpack_require__(/*! ./student-list.page.scss */ "./src/app/student-list/student-list.page.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["NavController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_2__["AmaranthusDBProvider"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"]])
    ], StudentListPage);
    return StudentListPage;
}());



/***/ })

}]);
//# sourceMappingURL=student-list-student-list-module.js.map