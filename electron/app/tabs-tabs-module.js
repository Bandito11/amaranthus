(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tabs-tabs-module"],{

/***/ "./src/app/tabs/tabs.module.ts":
/*!*************************************!*\
  !*** ./src/app/tabs/tabs.module.ts ***!
  \*************************************/
/*! exports provided: TabsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageModule", function() { return TabsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tabs.page */ "./src/app/tabs/tabs.page.ts");
/* harmony import */ var _tabs_router_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tabs.router.module */ "./src/app/tabs/tabs.router.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var TabsPageModule = /** @class */ (function () {
    function TabsPageModule() {
    }
    TabsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _tabs_router_module__WEBPACK_IMPORTED_MODULE_5__["TabsPageRoutingModule"]
            ],
            declarations: [_tabs_page__WEBPACK_IMPORTED_MODULE_4__["TabsPage"]]
        })
    ], TabsPageModule);
    return TabsPageModule;
}());



/***/ }),

/***/ "./src/app/tabs/tabs.page.html":
/*!*************************************!*\
  !*** ./src/app/tabs/tabs.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-split-pane contentId=\"menu-content\">\n  <!--  Side menu  -->\n  <ion-menu menuId=\"main\" swipeGesture=\"false\" contentId=\"menu-content\" >\n\n    <ion-header>\n      <ion-toolbar color=\"primary\">\n        <ion-title>{{htmlControls.menu}}</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n      <ion-content>\n        <ion-list lines=\"none\">\n          <ion-item *ngFor=\"let page of pages\" routerLink=\"{{page.route}}\" (click)=\"setSelectedTab(page.text)\">\n            <ion-label>{{page.text}}</ion-label>\n          </ion-item>\n        </ion-list>\n      </ion-content>\n \n  </ion-menu>\n\n  <ion-tabs id=\"menu-content\">\n\n    <ion-tab-bar *ngIf=\"!viewIsLarge\" slot=\"bottom\" color=\"primary\">\n     \n      <!--was MainPage in v3-->\n      <ion-tab-button tab=\"home\">\n        <ion-icon name=\"home\"></ion-icon>\n        <ion-label *ngIf=\"this.platform.is('tablet') || this.platform.is('ipad') || this.platform.is('desktop')\">\n          {{htmlControls.home}}\n        </ion-label>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"calendar\">\n        <ion-icon name=\"calendar\"></ion-icon>\n        <ion-label *ngIf=\"this.platform.is('tablet') || this.platform.is('ipad') || this.platform.is('desktop')\">\n          {{htmlControls.calendar}}\n        </ion-label>\n      </ion-tab-button>\n\n      <!--WaÎs TablePage in v3-->\n      <ion-tab-button tab=\"stats\">\n        <ion-icon name=\"stats\"></ion-icon>\n        <ion-label *ngIf=\"this.platform.is('tablet') || this.platform.is('ipad') || this.platform.is('desktop')\">\n          {{htmlControls.stats}}\n        </ion-label>\n      </ion-tab-button>\n\n      <!-- Was StudentListPage in v3 -->\n      <!-- <ion-tab-button tab=\"roster\"> \n        <ion-icon name=\"people\"></ion-icon>\n        <ion-label *ngIf=\"this.platform.is('tablet') || this.platform.is('ipad') || this.platform.is('desktop')\">\n          {{htmlControls.roster}}\n        </ion-label>\n      </ion-tab-button> -->\n\n      <ion-tab-button tab=\"settings\">\n        <ion-icon name=\"cog\"></ion-icon>\n        <ion-label *ngIf=\"this.platform.is('tablet') || this.platform.is('ipad') || this.platform.is('desktop')\">\n          {{htmlControls.settings}}\n        </ion-label>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"login\"\n        *ngIf=\" this.platform.is('desktop') || this.platform.is('ipad') || this.platform.is('tablet')\">\n        <ion-icon name=\"log-in\"></ion-icon>\n        <ion-label *ngIf=\"this.platform.is('tablet') || this.platform.is('ipad') || this.platform.is('desktop')\">\n          {{htmlControls.login}}\n        </ion-label>\n      </ion-tab-button>\n\n    </ion-tab-bar>\n\n  </ion-tabs>\n</ion-split-pane>"

/***/ }),

/***/ "./src/app/tabs/tabs.page.scss":
/*!*************************************!*\
  !*** ./src/app/tabs/tabs.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RhYnMvdGFicy5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/tabs/tabs.page.ts":
/*!***********************************!*\
  !*** ./src/app/tabs/tabs.page.ts ***!
  \***********************************/
/*! exports provided: TabsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPage", function() { return TabsPage; });
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TabsPage = /** @class */ (function () {
    function TabsPage(platform, storage) {
        this.platform = platform;
        this.storage = storage;
        this.counter = 0;
        this.htmlControls = {
            menu: '',
            home: '',
            calendar: '',
            stats: '',
            // roster: '', // Do not delete!
            settings: '',
            login: ''
        };
        this.LANGUAGE = {
            english: {
                menu: 'Menu',
                home: 'Home',
                calendar: 'Calendar',
                stats: 'Stats',
                // roster: 'Roster', // Do not delete!
                settings: 'Settings',
                login: 'Login'
            },
            spanish: {
                menu: 'Menú',
                home: 'Inicio',
                calendar: 'Calendario',
                stats: 'Estadísticas',
                // roster: 'Registro', // Do not delete!
                settings: 'Configuración',
                login: 'Sesión'
            }
        };
    }
    TabsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('language').then(function (value) {
            if (value) {
                _this.htmlControls = _this.LANGUAGE[value];
            }
            else {
                _this.htmlControls = _this.LANGUAGE['english'];
            }
            if (value === 'spanish') {
                _this.pages = [
                    { text: 'Inicio', route: '/tabs/tabs/home' },
                    { text: 'Calendario', route: '/tabs/tabs/calendar' },
                    { text: 'Estadísticas', route: '/tabs/tabs/stats' },
                    // { text: 'Registro', route: '/tabs/tabs/roster' }, // Do not delete!
                    { text: 'Configuración', route: '/tabs/tabs/settings' },
                    { text: 'Sesión', route: '/tabs/tabs/login' }
                ];
            }
            else if (value === 'english') {
                _this.pages = [
                    { text: 'Home', route: '/tabs/tabs/home' },
                    { text: 'Calendar', route: '/tabs/tabs/calendar' },
                    { text: 'Stats', route: '/tabs/tabs/stats' },
                    // { text: 'Roster', route: '/tabs/tabs/roster' }, // Do not delete!
                    { text: 'Settings', route: '/tabs/tabs/settings' },
                    { text: 'Login', route: '/tabs/tabs/login' }
                ];
            }
        });
    };
    TabsPage.prototype.ngDoCheck = function () {
        if (this.platform.is('tablet') || this.platform.is('ipad') || this.platform.is('desktop')) {
            this.viewIsLarge = window.matchMedia('(min-width: 992px)').matches;
        }
    };
    TabsPage.prototype.setSelectedTab = function (route) {
        this.selectedTab = route.toLowerCase();
    };
    TabsPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tabs',
            template: __webpack_require__(/*! ./tabs.page.html */ "./src/app/tabs/tabs.page.html"),
            styles: [__webpack_require__(/*! ./tabs.page.scss */ "./src/app/tabs/tabs.page.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_0__["Platform"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"]])
    ], TabsPage);
    return TabsPage;
}());



/***/ }),

/***/ "./src/app/tabs/tabs.router.module.ts":
/*!********************************************!*\
  !*** ./src/app/tabs/tabs.router.module.ts ***!
  \********************************************/
/*! exports provided: TabsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageRoutingModule", function() { return TabsPageRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tabs.page */ "./src/app/tabs/tabs.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: 'tabs',
        component: _tabs_page__WEBPACK_IMPORTED_MODULE_2__["TabsPage"],
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: '../home/home.module#HomePageModule'
                    },
                    {
                        path: 'profile/:id',
                        loadChildren: '../profile/profile.module#ProfilePageModule'
                    },
                    {
                        path: 'events',
                        children: [
                            {
                                path: '',
                                loadChildren: '../events/events.module#EventsPageModule'
                            },
                            {
                                path: 'profile/:id',
                                children: [
                                    {
                                        path: '',
                                        loadChildren: '../eventprofile/eventprofile.module#EventProfilePageModule'
                                    },
                                    {
                                        path: 'calendar/:event/:ids',
                                        loadChildren: '../calendar/calendar.module#CalendarPageModule'
                                    },
                                    {
                                        path: 'stats/:event/:ids',
                                        loadChildren: '../stats/stats.module#StatsPageModule'
                                    },
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                path: 'calendar',
                children: [
                    {
                        path: '',
                        loadChildren: '../calendar/calendar.module#CalendarPageModule'
                    }
                ]
            },
            {
                path: 'stats',
                children: [
                    {
                        path: '',
                        loadChildren: '../stats/stats.module#StatsPageModule'
                    }
                ]
            },
            {
                path: 'roster',
                children: [
                    {
                        path: '',
                        loadChildren: '../student-list/student-list.module#StudentListPageModule'
                    },
                    {
                        path: 'profile/:id',
                        loadChildren: '../profile/profile.module#ProfilePageModule'
                    }
                ]
            },
            {
                path: 'login',
                children: [
                    {
                        path: '',
                        loadChildren: '../login/login.module#LoginPageModule'
                    }
                ]
            },
            {
                path: 'settings',
                children: [
                    {
                        path: '',
                        loadChildren: '../settings/settings.module#SettingsPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: 'tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'tabs/home',
        pathMatch: 'full'
    }
];
var TabsPageRoutingModule = /** @class */ (function () {
    function TabsPageRoutingModule() {
    }
    TabsPageRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], TabsPageRoutingModule);
    return TabsPageRoutingModule;
}());



/***/ })

}]);
//# sourceMappingURL=tabs-tabs-module.js.map