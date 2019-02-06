import { CancelComponent } from './components/cancel/cancel.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ComponentsModule } from './components/components.module';
import { EditPageModule } from './edit/edit.module';
import { CreatePage } from './create/create.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { CreatePageModule } from './create/create.module';
import { EditPage } from './edit/edit.page';
import { GobackComponent } from './components/goback/goback.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    CreatePage,
    EditPage,
    LoaderComponent,
    GobackComponent,
    CancelComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CreatePageModule,
    EditPageModule,
    ComponentsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
