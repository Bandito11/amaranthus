(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["settings-settings-module"],{

/***/ "./src/app/services/app-purchase/app-purchase.ts":
/*!*******************************************************!*\
  !*** ./src/app/services/app-purchase/app-purchase.ts ***!
  \*******************************************************/
/*! exports provided: AppPurchaseProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppPurchaseProvider", function() { return AppPurchaseProvider; });
/* harmony import */ var _ionic_native_in_app_purchase_ngx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic-native/in-app-purchase/ngx */ "./node_modules/@ionic-native/in-app-purchase/ngx/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppPurchaseProvider = /** @class */ (function () {
    function AppPurchaseProvider(iap) {
        this.iap = iap;
    }
    AppPurchaseProvider.prototype.handleError = function (err) {
        var message = '';
        try {
            // tslint:disable-next-line:forin
            for (var prop in err) {
                try {
                    message += err[prop] + " ";
                }
                catch (error) { }
            }
        }
        catch (error) {
            message = err;
        }
        return message;
    };
    /**
     * Restore purchase
     */
    AppPurchaseProvider.prototype.restoreAndroidPurchase = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.iap.restorePurchases()
                .then(function (purchased) { return resolve(purchased); })
                .catch(function (err) {
                var message = _this.handleError(err);
                reject(message);
            });
        });
    };
    AppPurchaseProvider.prototype.restoreiOSPurchase = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.iap.getReceipt()
                .then(function (receipt) { return resolve(receipt); })
                .catch(function (error) { return reject(error); });
        });
    };
    /**
     * Buy Product
     */
    AppPurchaseProvider.prototype.buy = function (productId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.iap.buy(productId)
                .then(function (product) { return resolve(product); })
                .catch(function (err) {
                var message = _this.handleError(err);
                reject(message);
            });
        });
    };
    /**
     * Return an array of products.
     */
    AppPurchaseProvider.prototype.getProducts = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.iap.getProducts(['master.key'])
                .then(function (products) { return resolve(products); })
                .catch(function (err) {
                var message = _this.handleError(err);
                reject(message);
            });
        });
    };
    AppPurchaseProvider = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_ionic_native_in_app_purchase_ngx__WEBPACK_IMPORTED_MODULE_0__["InAppPurchase"]])
    ], AppPurchaseProvider);
    return AppPurchaseProvider;
}());



/***/ }),

/***/ "./src/app/settings/settings.module.ts":
/*!*********************************************!*\
  !*** ./src/app/settings/settings.module.ts ***!
  \*********************************************/
/*! exports provided: SettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _settings_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings.page */ "./src/app/settings/settings.page.ts");
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
        component: _settings_page__WEBPACK_IMPORTED_MODULE_5__["SettingsPage"]
    }
];
var SettingsPageModule = /** @class */ (function () {
    function SettingsPageModule() {
    }
    SettingsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_6__["ComponentsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_settings_page__WEBPACK_IMPORTED_MODULE_5__["SettingsPage"]]
        })
    ], SettingsPageModule);
    return SettingsPageModule;
}());



/***/ }),

/***/ "./src/app/settings/settings.page.html":
/*!*********************************************!*\
  !*** ./src/app/settings/settings.page.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>{{htmlControls.toolbar.title}}</ion-title>\n    <ion-buttons slot=\"start\">\n      <app-menu-button></app-menu-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding id=\"settings\">\n  <div *ngIf=\"this.platform.is('cordova')\">\n    <app-loader *ngIf=\"noProducts\"></app-loader>\n    <div *ngFor=\"let product of products\">\n      <ion-icon name=\"pricetag\"></ion-icon>\n      <div *ngIf=\"isIos\">\n        <span>\n          {{htmlControls.masterKey.title}}\n        </span>\n        <p>\n          {{htmlControls.masterKey.description}}\n        </p>\n      </div>\n      <div *ngIf=\"isAndroid\">\n        <span>\n          {{product.title}}\n        </span>\n        <p>\n          {{product.description}}\n        </p>\n      </div>\n      <ion-button *ngIf=\"isAndroid\" color=\"primary\"\n        (click)=\"buyProduct({productId: product.productId, productTitle: product.title})\">\n        {{htmlControls.buy}}{{product.priceAsDecimal}} {{product.currency}}!\n      </ion-button>\n      <ion-button *ngIf=\"isIos\" color=\"primary\"\n        (click)=\"buyProduct({productId: product.productId, productTitle: 'The Master Key!'})\">\n        {{htmlControls.buy}}{{product.priceAsDecimal}} {{product.currency}}!\n      </ion-button>\n      <br>\n      <ion-button color=\"secondary\" (click)=\"restorePurchases()\">\n        <div *ngIf=\"isAndroid\">\n          {{htmlControls.restoreAndroid}}{{product.title.slice(0,15)}}\n        </div>\n        <div *ngIf=\"isIos\">\n          {{htmlControls.restoreiOS}}\n        </div>\n        &nbsp;\n        <ion-icon name=\"happy\"> </ion-icon>\n      </ion-button>\n      <hr>\n    </div>\n  </div>\n  <div *ngIf=\"this.platform.is('cordova')\">\n    <h4>{{htmlControls.rate.title}}</h4>\n    <ion-button *ngIf=\"platform.is('ios')\" (click)=\"openMarketPage()\">\n      {{htmlControls.rate.iOS}}&nbsp; <ion-icon name=\"logo-apple\"></ion-icon>\n    </ion-button>\n    <ion-button *ngIf=\"platform.is('android')\" color=\"secondary\" (click)=\"openMarketPage()\">\n      {{htmlControls.rate.android}}&nbsp; <ion-icon name=\"logo-google\"></ion-icon>\n    </ion-button>\n  </div>\n  <div *ngIf=\"bought\">\n    <hr>\n    <h2>{{htmlControls.feedback.title}}</h2>\n    <p>\n      {{htmlControls.feedback.message}}\n    </p>\n    <textarea #message value=\"{{textArea}}\"></textarea>\n    <br>\n    <ion-button color=\"primary\" (click)=\"sendEmail(message.value)\">{{htmlControls.feedback.button}}</ion-button>\n    <hr>\n  </div>\n\n  <ion-list>\n    <ion-radio-group>\n      <ion-list-header>\n        <ion-label>\n          {{htmlControls.language.title}}\n        </ion-label>\n      </ion-list-header>\n      <ion-item *ngFor=\"let language of languages\">\n        <ion-label>\n          {{language.controls}}\n        </ion-label>\n        <ion-radio value=\"{{language.controls}}\" (ionSelect)=\"setLanguage(language)\"\n          checked=\"{{language.checked}}\"></ion-radio>\n      </ion-item>\n    </ion-radio-group>\n  </ion-list>\n</ion-content>"

/***/ }),

/***/ "./src/app/settings/settings.page.scss":
/*!*********************************************!*\
  !*** ./src/app/settings/settings.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#settings textarea {\n  width: 100%;\n  height: 100px; }\n\n#settings span p {\n  font-size: 12px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc3RlYmFubW9yYWxlcy9Qcm9qZWN0cy9hbWFyYW50aHVzMi9zcmMvYXBwL3NldHRpbmdzL3NldHRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVRLFdBQVc7RUFDWCxhQUFhLEVBQUE7O0FBSHJCO0VBTVEsZUFBZSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2V0dGluZ3Mvc2V0dGluZ3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI3NldHRpbmdzIHtcbiAgICB0ZXh0YXJlYXtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgfVxuICAgIHNwYW4gcCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICB9XG59Il19 */"

/***/ }),

/***/ "./src/app/settings/settings.page.ts":
/*!*******************************************!*\
  !*** ./src/app/settings/settings.page.ts ***!
  \*******************************************/
/*! exports provided: SettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPage", function() { return SettingsPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_email_composer_ngx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic-native/email-composer/ngx */ "./node_modules/@ionic-native/email-composer/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_app_purchase_app_purchase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/app-purchase/app-purchase */ "./src/app/services/app-purchase/app-purchase.ts");
/* harmony import */ var _ionic_native_market_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/market/ngx */ "./node_modules/@ionic-native/market/ngx/index.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/constants */ "./src/app/common/constants.ts");
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







var SettingsPage = /** @class */ (function () {
    function SettingsPage(emailComposer, loading, storage, platform, iap, alertCtrl, market) {
        this.emailComposer = emailComposer;
        this.loading = loading;
        this.storage = storage;
        this.platform = platform;
        this.iap = iap;
        this.alertCtrl = alertCtrl;
        this.market = market;
        this.products = [];
        this.noProducts = true;
        this.LANGUAGE = {
            spanish: {
                toolbar: {
                    title: 'Configuración'
                },
                buy: '¡Comprar por solo ',
                restoreAndroid: 'Restaurar',
                restoreiOS: 'Restaurar la llave Maestra',
                rate: {
                    title: '¡Si te gusta la aplicación por favor considera calificarla con 5 estrellas!',
                    rateiOS: 'Lanzar App Store',
                    rateAndroid: 'Lanzar Play Store'
                },
                feedback: {
                    title: 'Comentarios',
                    // tslint:disable-next-line: max-line-length
                    message: '¿Tienes algún problema o simplemente quieres darme algún comentario sobre cómo mejorar la aplicación? Envíame un correo electrónico y le responderé en unos días.',
                    button: '¡Mandar correo electronico!'
                },
                masterKey: {
                    title: '',
                    description: ''
                },
                language: {
                    title: 'Lenguaje'
                }
            },
            english: {
                toolbar: {
                    title: 'Settings'
                },
                buy: 'Buy now for only ',
                restoreAndroid: 'Restore ',
                restoreiOS: 'Restore The Master Key!',
                rate: {
                    title: 'If you like the app please consider rating it 5 stars!',
                    iOS: 'Open App Store ',
                    android: 'Open Play Store '
                },
                feedback: {
                    title: 'Feedback',
                    // tslint:disable-next-line: max-line-length
                    message: 'Have any issues or just want to give me some feedback on how to make the app better? Just sent me an email and I will answer accordingly!',
                    button: 'Send email!'
                },
                masterKey: {
                    title: '',
                    description: ''
                },
                language: {
                    title: 'Language'
                }
            }
        };
        this.htmlControls = {
            toolbar: {
                title: ''
            },
            buy: '',
            restoreAndroid: '',
            restoreiOS: '',
            rate: {
                title: '',
                iOS: '',
                android: ''
            },
            feedback: {
                title: '',
                message: '',
                button: ''
            },
            masterKey: {
                title: '',
                description: ''
            },
            language: {
                title: ''
            }
        };
    }
    SettingsPage.prototype.setTextArea = function () {
        if (this.language === 'spanish') {
            this.textArea = "\n      Hola,\n      Para problemas:\n      [Escriba el modelo del tel\u00E9fono]\n      Problema: [Escribe un resumen del problema!]\n      Para recomendaciones:\n      [Modelo del tel\u00E9fono]\n      Idea: [\u00A1Resumen de mi asombrosa idea!]\n\n      Notes:\n      ";
        }
        else {
            this.textArea = "\n      Hi,\n      For issues:\n      [Phone Model]\n      Issue: [Write a summary of my issue!]\n      For Feedback:\n      [Phone Model]\n      Idea: [Summary of my awesome idea!]\n\n      Notes:\n      ";
        }
    };
    SettingsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('language').then(function (value) {
            _this.languages = [
                {
                    language: 'english',
                    controls: 'English',
                    checked: true
                },
                {
                    language: 'spanish',
                    controls: 'Español',
                    checked: false
                }
            ];
            if (value === 'spanish') {
                _this.language = 'spanish';
            }
            else {
                _this.language = 'english';
            }
            _this.htmlControls = _this.LANGUAGE[_this.language];
            if (value === 'spanish') {
                _this.languages[0].checked = false;
                _this.languages[1].checked = true;
                _this.htmlControls = __assign({}, _this.htmlControls, { masterKey: {
                        title: 'La Llave Maestra!',
                        description: 'Elimina el límite de 10 usuarios a la base de datos.'
                    } });
            }
            else {
                _this.languages[0].checked = true;
                _this.htmlControls = __assign({}, _this.htmlControls, { masterKey: {
                        title: 'The Master Key!',
                        description: 'Unlock limit of 10 users to database.'
                    } });
            }
            _this.setTextArea();
        });
        if (this.platform.is('ios')) {
            this.isIos = true;
        }
        else if (this.platform.is('android')) {
            this.isAndroid = true;
        }
        this.storage.get('boughtMasterKey').then(function (boughtMasterKey) {
            if (boughtMasterKey) {
                _this.bought = true;
            }
            else {
                _this.bought = false;
            }
        });
        if (this.platform.is('cordova')) {
            this.getProducts();
        }
    };
    SettingsPage.prototype.setLanguage = function (language) {
        this.storage.set('language', language.language);
        if (language.language === 'spanish') {
            this.languages[0].checked = false;
            this.languages[1].checked = true;
        }
        else {
            this.languages[0].checked = true;
            this.languages[1].checked = false;
        }
        if (language.language === 'spanish') {
            this.language = 'spanish';
        }
        else {
            this.language = 'english';
        }
        this.setTextArea();
        this.htmlControls = this.LANGUAGE[this.language];
        if (language.language === 'spanish') {
            this.languages[0].checked = false;
            this.languages[1].checked = true;
            this.htmlControls = __assign({}, this.htmlControls, { masterKey: {
                    title: 'La Llave Maestra!',
                    description: 'Elimina el límite de 10 usuarios a la base de datos.'
                } });
        }
        else {
            this.languages[0].checked = true;
            this.htmlControls = __assign({}, this.htmlControls, { masterKey: {
                    title: 'The Master Key!',
                    description: 'Unlock limit of 10 users to database.'
                } });
        }
    };
    SettingsPage.prototype.openMarketPage = function () {
        if (this.platform.is('android')) {
            this.market.open('xyz.attendancelog.amaranthus');
        }
        if (this.platform.is('ios')) {
            this.market.open('id1366019347');
        }
    };
    SettingsPage.prototype.sendEmail = function (body) {
        var email = {
            to: 'attendancelogtracker@gmail.com',
            subject: 'Attendance Log: Browser',
            body: body,
            isHtml: false
        };
        if (this.platform.is('cordova')) {
            if (this.platform.is('android')) {
                email = __assign({}, email, { subject: 'Attendance Log: Android' });
            }
            if (this.platform.is('ios')) {
                email = __assign({}, email, { subject: 'Attendance Log: IPhone' });
            }
        }
        this.emailComposer.open(email);
    };
    SettingsPage.prototype.getProducts = function () {
        var _this = this;
        this.iap.getProducts().then(function (products) {
            _this.noProducts = false;
            _this.products = products.slice();
            _this.storage.set('products', products);
        })
            .catch(function (err) {
            _this.showSimpleAlert({
                buttons: ['OK'],
                header: 'Error!',
                message: err
            }).then(function (_) { return _this.noProducts = false; });
        });
    };
    SettingsPage.prototype.restorePurchases = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loading.create({
                            message: 'Restoring Purchases!'
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        if (this.platform.is('android')) {
                            this.iap.restoreAndroidPurchase().then(function (products) {
                                products.forEach(function (product) {
                                    var receipt = JSON.parse(product.receipt);
                                    if (product.productId === 'master.key' && _common_constants__WEBPACK_IMPORTED_MODULE_5__["stateAndroid"][receipt.purchaseState] === ('ACTIVE' || false)) {
                                        _this.storage.set('boughtMasterKey', true);
                                        _this.bought = true;
                                        var options = {
                                            header: 'Information',
                                            message: 'Restored the purchase!',
                                            buttons: ['OK']
                                        };
                                        _this.showSimpleAlert(options);
                                    }
                                });
                                loading.dismiss();
                            })
                                .catch(function (_) {
                                _this.showSimpleAlert({ buttons: ['OK'], header: 'Error!', message: "No receipts available in the App Store!" });
                                loading.dismiss();
                            });
                        }
                        else if (this.platform.is('ios')) {
                            this.iap.restoreiOSPurchase().then(function (receipt) {
                                if (receipt) {
                                    var options = {
                                        header: 'Information',
                                        message: 'Restored the purchase!',
                                        buttons: ['OK']
                                    };
                                    _this.storage.set('boughtMasterKey', true);
                                    _this.bought = true;
                                    _this.showSimpleAlert(options);
                                }
                                else {
                                    var options = {
                                        header: 'Information',
                                        message: "No receipts available in the App Store!",
                                        buttons: ['OK']
                                    };
                                    _this.showSimpleAlert(options);
                                }
                                loading.dismiss();
                            })
                                .catch(function (_) {
                                _this.showSimpleAlert({ buttons: ['OK'], header: 'Error!', message: 'No receipts available in the App Store!' });
                                loading.dismiss();
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsPage.prototype.buyProduct = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loading.create({
                            message: "Buying " + opts.productTitle + "!"
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        this.iap.buy(opts.productId).then(function (product) {
                            _this.showSimpleAlert({
                                buttons: ['OK'],
                                header: 'Success!',
                                message: product.transactionId + " was successfully bought."
                            });
                            _this.storage.set('boughtMasterKey', true);
                            _this.bought = true;
                            loading.dismiss();
                        })
                            .catch(function (err) {
                            _this.showSimpleAlert({
                                buttons: ['OK'],
                                header: 'Error!',
                                message: err
                            });
                            loading.dismiss();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsPage.prototype.showSimpleAlert = function (options) {
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
                        alert.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__(/*! ./settings.page.html */ "./src/app/settings/settings.page.html"),
            styles: [__webpack_require__(/*! ./settings.page.scss */ "./src/app/settings/settings.page.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_native_email_composer_ngx__WEBPACK_IMPORTED_MODULE_1__["EmailComposer"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _services_app_purchase_app_purchase__WEBPACK_IMPORTED_MODULE_3__["AppPurchaseProvider"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_native_market_ngx__WEBPACK_IMPORTED_MODULE_4__["Market"]])
    ], SettingsPage);
    return SettingsPage;
}());



/***/ })

}]);
//# sourceMappingURL=settings-settings-module.js.map