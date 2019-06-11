(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "./src/app/login/login.module.ts":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../components/components.module */ "./src/app/components/components.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "./src/app/login/login.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]
    }
];
var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_0__["ComponentsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());



/***/ }),

/***/ "./src/app/login/login.page.html":
/*!***************************************!*\
  !*** ./src/app/login/login.page.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>{{htmlControls.toolbar.title}}</ion-title>\n    <ion-buttons slot=\"start\">\n      <ion-button *ngIf=\"modalVal\" (click)=\"cancel()\">\n        {{htmlControls.toolbar.buttons.cancel}}\n      </ion-button>\n      <app-menu-button *ngIf=\"!modalVal\"></app-menu-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-button *ngIf=\"!modalVal\" (click)=\"goToLogin()\">\n        {{htmlControls.toolbar.buttons.password}}\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding id=\"clientlogin\">\n  <div id=\"card\">\n    <img src=\"assets/cartoon-desk.jpg\" alt=\"A cluttered desk\">\n    <form #clientLoginForm (ngSubmit)=\"checkUser({username: username.value, password: password.value} )\">\n      <ion-item>\n        <ion-label position=\"stacked\">{{htmlControls.id}}</ion-label>\n        <ion-input #username type=\"text\" value=\"\"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label position=\"stacked\">{{htmlControls.phone}}</ion-label>\n        <ion-input #password type=\"password\"></ion-input>\n      </ion-item>\n\n      <ion-button type=\"submit\" full large>{{htmlControls.submit}}</ion-button>\n    </form>\n  </div>\n</ion-content>"

/***/ }),

/***/ "./src/app/login/login.page.scss":
/*!***************************************!*\
  !*** ./src/app/login/login.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#clientlogin #card {\n  position: absolute;\n  top: 15%;\n  right: 0;\n  bottom: 0;\n  left: 20%;\n  width: 60%;\n  height: 200px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc3RlYmFubW9yYWxlcy9Qcm9qZWN0cy9hbWFyYW50aHVzMi9zcmMvYXBwL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVNLGtCQUFrQjtFQUVsQixRQUFRO0VBQ1IsUUFBUTtFQUNSLFNBQVM7RUFDVCxTQUFTO0VBQ1QsVUFBVTtFQUNWLGFBQWEsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNjbGllbnRsb2dpbiB7XG4gICAgI2NhcmQge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgLy8gbWFyZ2luOiBhdXRvO1xuICAgICAgdG9wOiAxNSU7XG4gICAgICByaWdodDogMDtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIGxlZnQ6IDIwJTtcbiAgICAgIHdpZHRoOiA2MCU7XG4gICAgICBoZWlnaHQ6IDIwMHB4O1xuICAgICAgLy8gYm9yZGVyOiAycHggc29saWQgI2U2ZTZlNjtcbiAgICAgIC8vIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICB9XG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/login/login.page.ts":
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/amaranthus-db/amaranthus-db */ "./src/app/services/amaranthus-db/amaranthus-db.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
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




var LoginPage = /** @class */ (function () {
    function LoginPage(alertCtrl, db, navCtrl, modalCtrl, storage) {
        this.alertCtrl = alertCtrl;
        this.db = db;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.homeURL = '/tabs/tabs/login';
        this.htmlControls = {
            toolbar: {
                title: '',
                buttons: {
                    cancel: '',
                    password: ''
                }
            },
            id: '',
            phone: '',
            submit: ''
        };
        this.LANGUAGE = {
            english: {
                toolbar: {
                    title: 'Login',
                    buttons: {
                        cancel: 'Cancel',
                        password: 'Set Password'
                    }
                },
                id: 'ID or Full Name with a space in between',
                phone: 'Phone Number',
                submit: 'Submit'
            },
            spanish: {
                toolbar: {
                    title: 'Sesión',
                    buttons: {
                        cancel: 'Cancelar',
                        password: 'Contraseña'
                    }
                },
                id: 'Id o nombre completo con espacio entre medio',
                phone: 'Teléfono',
                submit: 'Someter'
            }
        };
    }
    LoginPage_1 = LoginPage;
    LoginPage.prototype.ionViewWillEnter = function () {
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
        });
    };
    LoginPage.prototype.cancel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert_1, alert_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.language === 'spanish')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Información',
                                subHeader: "Entra la contrase\u00F1a para volver a la pantalla principal.",
                                inputs: [
                                    {
                                        name: 'password',
                                        type: 'password',
                                        placeholder: 'Contraseña'
                                    }
                                ],
                                buttons: [
                                    {
                                        text: 'Cancelar',
                                        role: 'cancel',
                                        cssClass: 'secondary'
                                    },
                                    {
                                        text: 'Ok',
                                        handler: function (val) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                if (val['password'] === this.modalVal) {
                                                    this.modalCtrl.dismiss();
                                                }
                                                return [2 /*return*/];
                                            });
                                        }); }
                                    }
                                ]
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Information',
                            subHeader: "Enter password to go back to Main Screen.",
                            inputs: [
                                {
                                    name: 'password',
                                    type: 'password',
                                    placeholder: 'Password'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary'
                                },
                                {
                                    text: 'Ok',
                                    handler: function (val) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            if (val['password'] === this.modalVal) {
                                                this.modalCtrl.dismiss();
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); }
                                }
                            ]
                        })];
                    case 4:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.checkUser = function (opts) {
        var options;
        if (!opts.username) {
            if (this.language === 'spanish') {
                options = {
                    header: 'Error',
                    message: "El campo de Usuario no puede estar vacio."
                };
            }
            else {
                options = {
                    header: 'Error',
                    message: "Username field can't be empty."
                };
            }
        }
        if (!opts.password) {
            if (this.language === 'spanish') {
                options = {
                    header: 'Error',
                    message: "El campo de Contrase\u00F1a no puede estar vacio."
                };
            }
            else {
                options = {
                    header: 'Error',
                    message: "El campo de Contrase\u00F1a no puede estar vacio."
                };
            }
            this.showSimpleAlert(options);
            return;
        }
        var response = this.db.checkIfUserExists(opts);
        if (response.success) {
            if (this.language === 'spanish') {
                options = {
                    header: '¡Éxito!',
                    message: "\u00A1" + response.data + " esta presente hoy!"
                };
            }
            else {
                options = {
                    header: 'Success!',
                    message: response.data + " is present today!"
                };
            }
        }
        else {
            if (this.language === 'spanish') {
                options = {
                    header: '¡Error!',
                    message: "El usuario no existe! Por favor, compruebe que sus entradas fueron escritas correctamente y vuelva a intentarlo\n          Si se us\u00F3 el nombre, verifique que haya un espacio entre el nombre y el apellido y\n          Compruebe el uso correcto de may\u00FAsculas."
                };
            }
            else {
                options = {
                    header: 'Error!',
                    message: "User does not exist! Please check that your entries were written correctly and try again!\n          If the name was used please check that there is one space between the first name and last name and\n          check for correct capitalization."
                };
            }
        }
        this.showSimpleAlert(options);
    };
    LoginPage.prototype.showSimpleAlert = function (options) {
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
    LoginPage.prototype.goToLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert_3, alert_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.language === 'spanish')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Information',
                                subHeader: "Este componente crear\u00E1 una nueva pantalla de inicio de sesi\u00F3n que no se puede cancelar\n        a menos que se ingrese una contrase\u00F1a cuando se presiona el bot\u00F3n CANCELAR en la siguiente pantalla.\n         Si olvida la contrase\u00F1a simplemente cierre la aplicaci\u00F3n. Ninguno de los datos de asistencia\n         se perder\u00E1 si se ingresa correctamente.",
                                inputs: [
                                    {
                                        name: 'password',
                                        type: 'password',
                                        placeholder: 'Password'
                                    }
                                ],
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary'
                                    },
                                    {
                                        text: 'Ok',
                                        handler: function (val) { return __awaiter(_this, void 0, void 0, function () {
                                            var modal;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!val['password']) return [3 /*break*/, 2];
                                                        return [4 /*yield*/, this.modalCtrl.create({
                                                                component: LoginPage_1,
                                                                backdropDismiss: false,
                                                                componentProps: { modalVal: val.password }
                                                            })];
                                                    case 1:
                                                        modal = _a.sent();
                                                        modal.present();
                                                        _a.label = 2;
                                                    case 2: return [2 /*return*/];
                                                }
                                            });
                                        }); }
                                    }
                                ]
                            })];
                    case 1:
                        alert_3 = _a.sent();
                        return [4 /*yield*/, alert_3.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Information',
                            subHeader: "This component will create a new Login Screen that cannot be canceled\n        unless a password is entered when the CANCEL button is pressed in the next screen.\n         If you forget the password simply close the app. None of the attendance data will\n         be lost if properly entered.",
                            inputs: [
                                {
                                    name: 'password',
                                    type: 'password',
                                    placeholder: 'Password'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary'
                                },
                                {
                                    text: 'Ok',
                                    handler: function (val) { return __awaiter(_this, void 0, void 0, function () {
                                        var modal;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!val['password']) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, this.modalCtrl.create({
                                                            component: LoginPage_1,
                                                            backdropDismiss: false,
                                                            componentProps: { modalVal: val.password }
                                                        })];
                                                case 1:
                                                    modal = _a.sent();
                                                    modal.present();
                                                    _a.label = 2;
                                                case 2: return [2 /*return*/];
                                            }
                                        });
                                    }); }
                                }
                            ]
                        })];
                    case 4:
                        alert_4 = _a.sent();
                        return [4 /*yield*/, alert_4.present()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    var LoginPage_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], LoginPage.prototype, "modalVal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "htmlControls", void 0);
    LoginPage = LoginPage_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.page.html */ "./src/app/login/login.page.html"),
            styles: [__webpack_require__(/*! ./login.page.scss */ "./src/app/login/login.page.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_2__["AmaranthusDBProvider"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["NavController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"]])
    ], LoginPage);
    return LoginPage;
}());



/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map