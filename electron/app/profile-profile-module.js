(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profile-profile-module"],{

/***/ "./src/app/profile/profile.module.ts":
/*!*******************************************!*\
  !*** ./src/app/profile/profile.module.ts ***!
  \*******************************************/
/*! exports provided: ProfilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/components.module */ "./src/app/components/components.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile.page */ "./src/app/profile/profile.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        component: _profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]
    }
];
var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_0__["ComponentsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]]
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());



/***/ }),

/***/ "./src/app/profile/profile.page.html":
/*!*******************************************!*\
  !*** ./src/app/profile/profile.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title *ngIf=\"language !== 'english'\">{{htmlControls.title}}{{student.firstName}}</ion-title>\n    <ion-title *ngIf=\"language == 'english'\">{{student.firstName}}{{htmlControls.title}}</ion-title>\n    <ion-buttons slot=\"start\">\n        <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n       <ion-button (click)=\"goToEdit(student.id)\">\n        {{htmlControls.buttons.edit}}\n       </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"profile-content\">\n  <div class=\"profile-image\">\n    <img src=\"{{picture}}\" />\n  </div>\n  <div class=\"text text-box\">\n    <p class=\"text id\">\n      <span class=\"bold label\">ID: </span>{{student.id}}\n    </p>\n    <p class=\"text\">\n      <span class=\"bold label\">{{htmlControls.name}}</span> {{student.firstName}}\n      <span *ngIf=\"student.initial\">{{student.initial}}</span> {{student.lastName}}\n    </p>\n    <p class=\"text\">\n      <span class=\"bold label\">{{htmlControls.address}}</span>{{student.address}}\n    </p>\n    <p class=\"text\" *ngIf=\"student.phoneNumber\">\n      <span class=\"bold label\">{{htmlControls.phone}}</span>{{student.phoneNumber}}\n    </p>\n    <p class=\"text\">\n      <span class=\"bold label\">{{htmlControls.city}}</span>{{student.town}}\n    </p>\n    <p class=\"text\">\n      <span class=\"bold label\">{{htmlControls.state}}</span>{{student.state}}\n    </p>\n    <p class=\"text\">\n      <span class=\"bold label\">{{htmlControls.class}}</span>{{student.class}}\n    </p>\n    <p class=\"text\">\n      <span class=\"bold label\">{{htmlControls.gender}}</span>{{student.gender}}\n    </p>\n    <p class=\"text\">\n      <span class=\"bold label\">{{htmlControls.father}}</span> {{student.fatherName}}\n    </p>\n    <p class=\"text\">\n      <span class=\"bold label\">{{htmlControls.mother}}</span> {{student.motherName}}\n    </p>\n    <h2>{{htmlControls.emergency.title}}</h2>\n    <p class=\"text\">\n      <span class=\"bold label\">{{htmlControls.name}}</span>{{student.emergencyContactName}}\n    </p>\n    <p class=\"text\">\n      <span class=\"bold label\">{{htmlControls.emergency.relationship}}</span>{{student.emergencyRelationship}}\n    </p>\n    <p class=\"text\">\n      <span class=\"bold label\">{{htmlControls.phone}}</span>{{student.emergencyContactPhoneNumber}}\n    </p>\n    <div class=\"text\">\n      <p *ngIf=\"student.isActive == true\">\n          {{htmlControls.active}}\n      </p>\n      <p *ngIf=\"student.isActive == false\">\n          {{htmlControls.inactive}}\n      </p>\n    </div>\n    <h2>{{htmlControls.notes.title}}</h2>\n    <div class=\"text\" id=\"notes\">\n        <ul id=\"notes-text\" *ngFor=\"let note of notes\">\n          <li><span class=\"bold label\">{{htmlControls.notes.date}}</span> {{note.date}}</li>\n          <li><span class=\"bold label\">{{htmlControls.notes.notes}}</span> {{note.note}}</li>\n        </ul>\n    </div>\n  </div>\n</ion-content>"

/***/ }),

/***/ "./src/app/profile/profile.page.scss":
/*!*******************************************!*\
  !*** ./src/app/profile/profile.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".text {\n  color: #000;\n  margin-left: 2%;\n  white-space: normal; }\n\nul {\n  list-style: none;\n  margin: 0px;\n  padding: 0px; }\n\n.header {\n  color: #000;\n  font-weight: bolder; }\n\n.profile-content {\n  --background: var(--ion-color-secondary)\n    ; }\n\n.text.label {\n  font-weight: normal; }\n\n.bold {\n  font-weight: bolder; }\n\n.text.center {\n  text-align: center; }\n\n.profile-image {\n  padding-bottom: 15px;\n  background-color: #ffffff;\n  border-bottom-right-radius: 100%;\n  border-bottom-left-radius: 100%; }\n\nimg {\n  width: 150px;\n  height: 150px;\n  border-radius: 100%;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  padding-bottom: 10px; }\n\n@media only screen and (max-width: 700px) {\n  .text {\n    font-size: 105%; }\n  .id {\n    font-size: 155%; }\n  .header {\n    font-size: 115%; } }\n\n@media only screen and (min-width: 700px) {\n  .text {\n    font-size: 125%; }\n  .id {\n    font-size: 175%; }\n  .header {\n    font-size: 135%; }\n  .text-box {\n    padding-left: 10%;\n    padding-top: 10%; } }\n\n@media only screen and (min-width: 2000px) {\n  .text {\n    font-size: 145%; }\n  .id {\n    font-size: 195%; }\n  .header {\n    font-size: 155%; }\n  .text-box {\n    padding-left: 10%;\n    padding-top: 10%; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9lc3RlYmFubW9yYWxlcy9Qcm9qZWN0cy9hbWFyYW50aHVzMi9zcmMvYXBwL3Byb2ZpbGUvcHJvZmlsZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUk7RUFDSSxXQUFXO0VBQ1gsZUFBZTtFQUNmLG1CQUFtQixFQUFBOztBQUV2QjtFQUNJLGdCQUFnQjtFQUNoQixXQUFVO0VBQ1YsWUFBVyxFQUFBOztBQUtmO0VBQ0ksV0FBVztFQUNYLG1CQUFtQixFQUFBOztBQUV2QjtFQUNJO0lBQWEsRUFBQTs7QUFFakI7RUFDSSxtQkFBbUIsRUFBQTs7QUFFdkI7RUFDSSxtQkFBbUIsRUFBQTs7QUFFdkI7RUFDSSxrQkFBa0IsRUFBQTs7QUFFdEI7RUFDSSxvQkFBb0I7RUFDcEIseUJBQXlCO0VBQ3pCLGdDQUFnQztFQUNoQywrQkFBK0IsRUFBQTs7QUFFbkM7RUFDSSxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixvQkFBb0IsRUFBQTs7QUFFeEI7RUFFSTtJQUNJLGVBRlcsRUFBQTtFQUlmO0lBQ0ksZUFBMEIsRUFBQTtFQUU5QjtJQUNJLGVBQTBCLEVBQUEsRUFDN0I7O0FBRUw7RUFFSTtJQUNJLGVBRlcsRUFBQTtFQUlmO0lBQ0ksZUFBMEIsRUFBQTtFQUU5QjtJQUNJLGVBQTBCLEVBQUE7RUFFOUI7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCLEVBQUEsRUFDbkI7O0FBRUw7RUFFSTtJQUNJLGVBRlcsRUFBQTtFQUlmO0lBQ0ksZUFBMEIsRUFBQTtFQUU5QjtJQUNJLGVBQTBCLEVBQUE7RUFFOUI7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCLEVBQUEsRUFDbkIiLCJmaWxlIjoic3JjL2FwcC9wcm9maWxlL3Byb2ZpbGUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiICAgIC50ZXh0IHtcbiAgICAgICAgY29sb3I6ICMwMDA7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyJTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcbiAgICB9XG4gICAgdWwge1xuICAgICAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgICAgICBtYXJnaW46MHB4O1xuICAgICAgICBwYWRkaW5nOjBweDtcbiAgICB9XG4gICAgLy8gI25vdGVzIHtcbiAgICAvLyAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgLy8gfVxuICAgIC5oZWFkZXIge1xuICAgICAgICBjb2xvcjogIzAwMDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbiAgICB9XG4gICAgLnByb2ZpbGUtY29udGVudCB7XG4gICAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSlcbiAgICB9XG4gICAgLnRleHQubGFiZWwge1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIH1cbiAgICAuYm9sZCB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG4gICAgfVxuICAgIC50ZXh0LmNlbnRlciB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gICAgLnByb2ZpbGUtaW1hZ2Uge1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTVweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwMCU7XG4gICAgfVxuICAgIGltZyB7XG4gICAgICAgIHdpZHRoOiAxNTBweDtcbiAgICAgICAgaGVpZ2h0OiAxNTBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgIH1cbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwMHB4KSB7XG4gICAgICAgICRmb250U2l6ZTogMTA1JTtcbiAgICAgICAgLnRleHQge1xuICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udFNpemU7XG4gICAgICAgIH1cbiAgICAgICAgLmlkIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogJGZvbnRTaXplICsgNTAlO1xuICAgICAgICB9XG4gICAgICAgIC5oZWFkZXIge1xuICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udFNpemUgKyAxMCU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3MDBweCkge1xuICAgICAgICAkZm9udFNpemU6IDEyNSU7XG4gICAgICAgIC50ZXh0IHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogJGZvbnRTaXplO1xuICAgICAgICB9XG4gICAgICAgIC5pZCB7XG4gICAgICAgICAgICBmb250LXNpemU6ICRmb250U2l6ZSArIDUwJTtcbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogJGZvbnRTaXplICsgMTAlO1xuICAgICAgICB9XG4gICAgICAgIC50ZXh0LWJveCB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDEwJTtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiAxMCU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAyMDAwcHgpIHtcbiAgICAgICAgJGZvbnRTaXplOiAxNDUlO1xuICAgICAgICAudGV4dCB7XG4gICAgICAgICAgICBmb250LXNpemU6ICRmb250U2l6ZTtcbiAgICAgICAgfVxuICAgICAgICAuaWQge1xuICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udFNpemUgKyA1MCU7XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlciB7XG4gICAgICAgICAgICBmb250LXNpemU6ICRmb250U2l6ZSArIDEwJTtcbiAgICAgICAgfVxuICAgICAgICAudGV4dC1ib3gge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxMCU7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogMTAlO1xuICAgICAgICB9XG4gICAgfSJdfQ== */"

/***/ }),

/***/ "./src/app/profile/profile.page.ts":
/*!*****************************************!*\
  !*** ./src/app/profile/profile.page.ts ***!
  \*****************************************/
/*! exports provided: ProfilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePage", function() { return ProfilePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/amaranthus-db/amaranthus-db */ "./src/app/services/amaranthus-db/amaranthus-db.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _common_handleError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/handleError */ "./src/app/common/handleError.ts");
/* harmony import */ var _edit_edit_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../edit/edit.page */ "./src/app/edit/edit.page.ts");
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








var ProfilePage = /** @class */ (function () {
    function ProfilePage(route, modalCtrl, db, storage) {
        this.route = route;
        this.modalCtrl = modalCtrl;
        this.db = db;
        this.storage = storage;
        this.picture = '';
        this.gender = 'male';
        this.isActive = false;
        this.student = {};
        this.notes = [];
        this.htmlControls = {
            title: '',
            buttons: {
                edit: ''
            },
            name: '',
            address: '',
            phone: '',
            city: '',
            state: '',
            class: '',
            gender: '',
            father: '',
            mother: '',
            emergency: {
                title: '',
                relationship: ''
            },
            active: '',
            inactive: '',
            notes: {
                title: '',
                date: '',
                notes: ''
            }
        };
        this.LANGUAGE = {
            english: {
                title: "'s Profile",
                buttons: {
                    edit: 'Edit'
                },
                name: 'Name: ',
                address: 'Address: ',
                phone: 'Phone Number: ',
                city: 'City: ',
                state: 'State: ',
                class: 'Class: ',
                gender: 'Gender: ',
                father: "Father's Name: ",
                mother: "Mother's Name: ",
                emergency: {
                    title: 'Emergency Contact',
                    relationship: 'Relationship: '
                },
                active: '*Student is currently active on the roster.*',
                inactive: '*Student is currently inactive on the roster.*',
                notes: {
                    title: 'Notes: ',
                    date: 'Date: ',
                    notes: 'Notes: '
                }
            },
            spanish: {
                title: "Perfil de ",
                buttons: {
                    edit: 'Editar'
                },
                name: 'Nombre: ',
                address: 'Dirección: ',
                phone: 'Teléfono: ',
                city: 'Ciudad: ',
                state: 'Estado: ',
                class: 'Clase: ',
                gender: 'Género: ',
                father: "Nombre del padre: ",
                mother: "Nombre de la madre: ",
                emergency: {
                    title: 'Contacto de Emergencia',
                    relationship: 'Relación: '
                },
                active: '*Estudiante esta activo en el registro*',
                inactive: '*Estudiante esta inactivo en el registro*',
                notes: {
                    title: 'Notas: ',
                    date: 'Fecha: ',
                    notes: 'Notas: '
                }
            }
        };
    }
    ProfilePage.prototype.ngOnInit = function () {
        this.student = __assign({}, this.student, { id: this.route.snapshot.paramMap.get('id') });
        this.getStudentFromDB(this.student);
        this.getNotesFromDB(this.student.id);
    };
    ProfilePage.prototype.ionViewWillEnter = function () {
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
    /**
   *
   * @param id
   */
    ProfilePage.prototype.goToEdit = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: _edit_edit_page__WEBPACK_IMPORTED_MODULE_6__["EditPage"],
                            componentProps: { id: id }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onWillDismiss().then(function () { return _this.getStudentFromDB(_this.student); });
                        modal.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.getNotesFromDB = function (id) {
        try {
            var response = this.db.getAllNotesById(id);
            if (response.success) {
                var note = void 0;
                var date = void 0;
                for (var _i = 0, _a = response.data; _i < _a.length; _i++) {
                    var data = _a[_i];
                    date = _common_constants__WEBPACK_IMPORTED_MODULE_4__["MONTHSLABELS"][data.month] + ", " + data.day + " " + data.year;
                    note = {
                        note: data.notes,
                        date: date
                    };
                    this.notes = this.notes.concat([note]);
                }
            }
        }
        catch (error) {
            Object(_common_handleError__WEBPACK_IMPORTED_MODULE_5__["handleError"])(error);
        }
    };
    ProfilePage.prototype.getStudentFromDB = function (student) {
        try {
            var response = this.db.getStudentById(student);
            if (response.success) {
                this.isActive = response.data.isActive;
                this.gender = response.data.gender;
                this.picture = response.data.picture;
                this.student = __assign({}, response.data, { gender: response.data.gender[0].toUpperCase() +
                        response.data.gender.slice(1, response.data.gender.length) });
            }
        }
        catch (error) {
            Object(_common_handleError__WEBPACK_IMPORTED_MODULE_5__["handleError"])(error);
        }
    };
    ProfilePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.page.html */ "./src/app/profile/profile.page.html"),
            styles: [__webpack_require__(/*! ./profile.page.scss */ "./src/app/profile/profile.page.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _services_amaranthus_db_amaranthus_db__WEBPACK_IMPORTED_MODULE_3__["AmaranthusDBProvider"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"]])
    ], ProfilePage);
    return ProfilePage;
}());



/***/ })

}]);
//# sourceMappingURL=profile-profile-module.js.map