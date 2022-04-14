import { CreateEventPageModule } from './create-event/create-event.module';
import { EditPageModule } from './edit/edit.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Market } from '@ionic-native/market/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { CreatePageModule } from './create/create.module';
import { ExportPageModule } from './export/export.module';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { EditEventPageModule } from './editevent/editevent.module';
import { StatsPageModule } from './stats/stats.module';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@NgModule({
    declarations: [AppComponent],
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
        InAppPurchase,
        Market,
        EmailComposer,
        FileOpener,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
