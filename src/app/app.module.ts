import { WebView } from '@ionic-native/ionic-webview/ngx';
import { CreateEventPageModule } from './create-event/create-event.module';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { EditPageModule } from './edit/edit.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Market } from '@ionic-native/market/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { CreatePageModule } from './create/create.module';
import { ExportPageModule } from './export/export.module';
import { File } from '@ionic-native/file/ngx';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { EditEventPageModule } from './editevent/editevent.module';
import { StatsPageModule } from './stats/stats.module';

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
        Camera,
        FileOpener,
        File,
        InAppPurchase,
        Market,
        EmailComposer,
        WebView,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
