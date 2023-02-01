import { CreateEventPageModule } from './create-event/create-event.module';
import { EditPageModule } from './edit/edit.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { CreatePageModule } from './create/create.module';
import { ExportPageModule } from './export/export.module';
import { EditEventPageModule } from './editevent/editevent.module';
import { StatsPageModule } from './stats/stats.module';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { InAppPurchase2 } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';

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
        InAppPurchase2,
        EmailComposer,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
