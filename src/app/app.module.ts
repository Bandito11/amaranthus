import { CalendarPageModule } from './calendar/calendar.module';
import { CalendarPage } from './calendar/calendar.page';
import { CreateEventPageModule } from './create-event/create-event.module';
import { CreateEventPage } from './create-event/create-event.page';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { EditPageModule } from './edit/edit.module';
import { CreatePage } from './create/create.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Market } from '@ionic-native/market/ngx';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { CreatePageModule } from './create/create.module';
import { EditPage } from './edit/edit.page';
import { ExportPage } from './export/export.page';
import { ExportPageModule } from './export/export.module';
import { File } from '@ionic-native/file/ngx';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { EditEventPage } from './editevent/editevent.page';
import { EditEventPageModule } from './editevent/editevent.module';
import { StatsPage } from './stats/stats.page';
import { StatsPageModule } from './stats/stats.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    CreatePage,
    EditPage,
    CreateEventPage,
    ExportPage,
    EditEventPage,
    StatsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CreatePageModule,
    EditPageModule,
    CreateEventPageModule,
    ExportPageModule,
    EditEventPageModule,
    StatsPageModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    FileOpener,
    File,
    InAppPurchase,
    Market,
    EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
