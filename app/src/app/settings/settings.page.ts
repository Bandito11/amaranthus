import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AppPurchaseProvider } from '../providers/app-purchase/app-purchase';
import { Market } from '@ionic-native/market/ngx';
import { Storage } from '@ionic/storage';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { productKey } from '../common/constants';
import { handleError } from '../common/handleError';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  products: IAPProduct[];
  noProducts = true;
  bought: boolean;
  languages: { language: string; controls: string }[];
  language;
  LANGUAGE = {
    spanish: {
      toolbar: {
        title: 'Configuración',
      },
      buy: '¡Comprar por solo ',
      restore: 'Restaurar',
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
      restore: 'Restore Purchases',
      rate: {
        title: 'If you like the app please consider rating it 5 stars!',
        iOS: 'Open App Store ',
        android: 'Open Play Store ',
      },
      feedback: {
        title: 'Feedback',
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
    restore: '',
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
    language: {
      title: '',
    },
  };
  textArea: string;
  userAgent: RegExpMatchArray;
  userAgentMac: RegExpMatchArray;

  constructor(
    public emailComposer: EmailComposer,
    public loadingController: LoadingController,
    public storage: Storage,
    public platform: Platform,
    public iap: AppPurchaseProvider,
    public toastController: ToastController,
    public market: Market
  ) {}

  async ngOnInit() {
    this.bought = await this.storage.get(productKey);
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
    const value = await this.storage.get('language');
    if (value === 'spanish') {
      this.language = 'spanish';
    }
    this.htmlControls = this.LANGUAGE[this.language];
    this.setTextArea();

    if(this.platform.is('capacitor')){
    this.iap.getProducts();
    this.products = this.iap.products;
  }
    this.userAgent = navigator.userAgent.match('Windows');
    this.userAgentMac = navigator.userAgent.match('Macintosh');
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
    }else if (this.platform.is('ios')) {
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

  async restorePurchases() {
    const loading = await this.loadingController.create({
      translucent: true,
      spinner: 'dots',
    });
    await loading.present();
    try {
      await this.iap.checkIfOwned();
      this.bought = await this.storage.get(productKey);
    } catch (error) {
      handleError(error);
      return;
    }
    let message = '';
    let color = '';
    if (this.bought) {
      color = 'success';
      if (this.language === 'spanish') {
        message = 'Se verificó la compra y se desbloqueó el producto';
      } else {
        message = `The purchase was verified and the product was unlocked.`;
      }
    } else {
      color = 'danger';
      if (this.language === 'spanish') {
        message = 'No tienes ninguna compra.';
      } else {
        message = `You don't have any purchases.`;
      }
    }
    await loading.dismiss();
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: 'top',
      color: color,
    });
    toast.present();
  }

  async buyProduct(product: IAPProduct) {
    const loading = await this.loadingController.create({
      translucent: true,
      spinner: 'dots',
    });
    await loading.present();
    try {
      await this.iap.buy(product);
    } catch (error) {
      if (error) {
        handleError(error);
      }
      await loading.dismiss();
      return;
    }
    await loading.dismiss();
  }
}
