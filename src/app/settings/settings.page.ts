import { Component, OnInit } from '@angular/core';
import { ISimpleAlertOptions } from '../common/models';
import { LoadingController, Platform, AlertController } from '@ionic/angular';
import { AppPurchaseProvider } from '../providers/app-purchase/app-purchase';
import { Market } from '@ionic-native/market/ngx';
import { stateAndroid } from '../common/constants';
import { Storage } from '@ionic/storage';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  products;
  noProducts = true;
  isIos: boolean;
  isAndroid: boolean;
  bought: boolean;
  languages: { language: string; controls: string }[];
  language;
  LANGUAGE = {
    spanish: {
      toolbar: {
        title: 'Configuración',
      },
      buy: '¡Comprar por solo ',
      restoreAndroid: 'Restaurar',
      restoreiOS: 'Restaurar',
      rate: {
        title:
          '¡Si te gusta la aplicación por favor considera calificarla con 5 estrellas!',
        iOS: 'Lanzar App Store',
        Android: 'Lanzar Play Store',
      },
      feedback: {
        title: 'Comentarios',
        message:
          '¿Tienes algún problema o simplemente quieres darme algún comentario sobre cómo mejorar la aplicación? Envíame un correo electrónico y le responderé en unos días.',
        button: '¡Mandar correo electronico!',
      },
      masterKey: {
        title: '',
        description: '',
      },
      language: {
        title: 'Lenguaje',
      },
    },
    english: {
      toolbar: {
        title: 'Settings',
      },
      buy: 'Buy now for only ',
      restoreAndroid: 'Restore Purchases',
      restoreiOS: 'Restore Purchases',
      rate: {
        title: 'If you like the app please consider rating it 5 stars!',
        iOS: 'Open App Store ',
        android: 'Open Play Store ',
      },
      feedback: {
        title: 'Feedback',
        // tslint:disable-next-line: max-line-length
        message:
          'Have any issues or just want to give me some feedback on how to make the app better? Just sent me an email and I will answer accordingly!',
        button: 'Send email!',
      },
      masterKey: {
        title: '',
        description: '',
      },
      language: {
        title: 'Language',
      },
    },
  };

  htmlControls = {
    toolbar: {
      title: '',
    },
    buy: '',
    restoreAndroid: '',
    restoreiOS: '',
    rate: {
      title: '',
      iOS: '',
      android: '',
    },
    feedback: {
      title: '',
      message: '',
      button: '',
    },
    masterKey: {
      title: '',
      description: '',
    },
    language: {
      title: '',
    },
  };
  textArea: string;

  constructor(
    public emailComposer: EmailComposer,
    public loadingController: LoadingController,
    public storage: Storage,
    public platform: Platform,
    public iap: AppPurchaseProvider,
    public alertCtrl: AlertController,
    public market: Market
  ) {}

  async ngOnInit() {
    this.iap.getProducts();
    this.bought = await this.storage.get('boughtMasterKey');
    this.products = [];
    this.isAndroid = this.platform.is('android');
    this.isIos = this.platform.is('ios');
    this.languages = [
      {
        language: 'english',
        controls: 'English',
      },
      {
        language: 'spanish',
        controls: 'Español',
      },
    ];
    this.language = 'english';
    this.storage.get('language').then((value) => {
      if (value === 'spanish') {
        this.language = 'spanish';
      }
      this.htmlControls = this.LANGUAGE[this.language];
      if (value === 'spanish') {
        this.htmlControls = {
          ...this.htmlControls,
          masterKey: {
            title: 'La Llave Maestra!',
            description: 'Elimina el límite de 10 usuarios a la base de datos.',
          },
        };
      } else {
        this.htmlControls = {
          ...this.htmlControls,
          masterKey: {
            title: 'The Master Key!',
            description: 'Unlock limit of 10 users to database.',
          },
        };
      }
      this.setTextArea();
    });
    if (!this.platform.is('desktop')) {
      this.getProducts();
    }
  }

  setTextArea() {
    if (this.language === 'spanish') {
      this.textArea = `
      Para problemas:
      Escriba el modelo del teléfono:
      Problema: 


      Para recomendaciones:
      Modelo del teléfono:
      Idea: 

      `;
    } else {
      this.textArea = `
      For issues:
      Phone Model: 
      Issue: 


      For Feedback:
      Phone Model:
      Idea: 

      `;
    }
  }

  async setLanguage(language: string) {
    await this.storage.set('language', language);
    const loading = await this.loadingController.create({
      translucent: true,
      spinner: 'dots',
    });
    await loading.present();
    location.reload();
  }

  openMarketPage() {
    if (this.platform.is('android')) {
      this.market.open('xyz.attendancelog.amaranthus');
    }
    if (this.platform.is('ios')) {
      this.market.open('id1366019347');
    }
  }

  sendEmail(body: string) {
    let email = {
      to: 'attendancelogtracker@gmail.com',
      subject: 'Attendance Log: Browser',
      body: body,
      isHtml: false,
    };
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        email = {
          ...email,
          subject: 'Attendance Log: Android',
        };
      }
      if (this.platform.is('ios')) {
        email = {
          ...email,
          subject: 'Attendance Log: IPhone',
        };
      }
    }
    this.emailComposer.open(email);
  }

  getProducts() {}

  async restorePurchases() {}

  async buyProduct(opts: { productTitle: string; productId: string }) {}
}
