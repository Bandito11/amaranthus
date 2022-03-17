import { Component, OnInit } from '@angular/core';
import { IProductGet, ISimpleAlertOptions } from '../common/models';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { LoadingController, Platform, AlertController } from '@ionic/angular';
import { AppPurchaseProvider } from '../services/app-purchase/app-purchase';
import { Market } from '@ionic-native/market/ngx';
import { stateAndroid } from '../common/constants';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  products: IProductGet[] = [];
  noProducts = true;
  isIos: boolean;
  isAndroid: boolean;
  bought: boolean;
  languages: { language: string; controls: string; checked: boolean }[];
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
        rateiOS: 'Lanzar App Store',
        rateAndroid: 'Lanzar Play Store',
      },
      feedback: {
        title: 'Comentarios',
        // tslint:disable-next-line: max-line-length
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
    public market: Market,
  ) {}

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

  ngOnInit() {
    this.storage.get('language').then((value) => {
      this.languages = [
        {
          language: 'english',
          controls: 'English',
          checked: true,
        },
        {
          language: 'spanish',
          controls: 'Español',
          checked: false,
        },
      ];
      if (value === 'spanish') {
        this.language = 'spanish';
      } else {
        this.language = 'english';
      }
      this.htmlControls = this.LANGUAGE[this.language];
      if (value === 'spanish') {
        this.languages[0].checked = false;
        this.languages[1].checked = true;
        this.htmlControls = {
          ...this.htmlControls,
          masterKey: {
            title: 'La Llave Maestra!',
            description: 'Elimina el límite de 10 usuarios a la base de datos.',
          },
        };
      } else {
        this.languages[0].checked = true;
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
    if (this.platform.is('ios')) {
      this.isIos = true;
    } else if (this.platform.is('android')) {
      this.isAndroid = true;
    }
    this.storage.get('boughtMasterKey').then((boughtMasterKey) => {
      if (boughtMasterKey) {
        this.bought = true;
      } else {
        this.bought = false;
      }
    });
    if (!this.platform.is('desktop')) {
      this.getProducts();
    }
  }

  async setLanguage(language: { checked; language; controls }) {
    this.storage.set('language', language.language);
    const loading = await this.loadingController.create({
      translucent: true,
      spinner: 'dots',
    });
    await loading.present();
    location.reload();

    await loading.onDidDismiss();

    if (language.language === 'spanish') {
      this.languages[0].checked = false;
      this.languages[1].checked = true;
    } else {
      this.languages[0].checked = true;
      this.languages[1].checked = false;
    }
    if (language.language === 'spanish') {
      this.language = 'spanish';
    } else {
      this.language = 'english';
    }
    this.setTextArea();
    this.htmlControls = this.LANGUAGE[this.language];
    if (language.language === 'spanish') {
      this.languages[0].checked = false;
      this.languages[1].checked = true;
      this.htmlControls = {
        ...this.htmlControls,
        masterKey: {
          title: 'La Llave Maestra!',
          description: 'Elimina el límite de 10 usuarios a la base de datos.',
        },
      };
    } else {
      this.languages[0].checked = true;
      this.htmlControls = {
        ...this.htmlControls,
        masterKey: {
          title: 'The Master Key!',
          description: 'Unlock limit of 10 users to database.',
        },
      };
    }
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

  getProducts() {
    this.iap
      .getProducts()
      .then((products) => {
        this.noProducts = false;
        this.products = [...products];
        this.storage.set('products', products);
      })
      .catch((err) => {
        this.showSimpleAlert({
          buttons: ['OK'],
          header: 'Error!',
          message: err,
        }).then((_) => (this.noProducts = false));
      });
  }

  async restorePurchases() {
    const loading = await this.loadingController.create({
      message: 'Restoring Purchases!',
    });
    loading.present();
    if (this.platform.is('android')) {
      this.iap
        .restoreAndroidPurchase()
        .then((products) => {
          products.forEach((product) => {
            const receipt = JSON.parse(product.receipt);
            if (
              product.productId === 'master.key' &&
              stateAndroid[receipt.purchaseState] === ('ACTIVE' || 0)
            ) {
              this.storage.set('boughtMasterKey', true);
              this.bought = true;
              const options: ISimpleAlertOptions = {
                header: 'Information',
                message: 'Restored the purchase!',
                buttons: ['OK'],
              };
              this.showSimpleAlert(options);
            }
          });
          loading.dismiss();
        })
        .catch((_) => {
          this.showSimpleAlert({
            buttons: ['OK'],
            header: 'Error!',
            message: `No receipts available in the App Store!`,
          });
          loading.dismiss();
        });
    } else if (this.platform.is('ios')) {
      this.iap
        .restoreiOSPurchase()
        .then((receipt) => {
          if (receipt) {
            const options: ISimpleAlertOptions = {
              header: 'Information',
              message: 'Restored the purchase!',
              buttons: ['OK'],
            };
            this.storage.set('boughtMasterKey', true);
            this.bought = true;
            this.showSimpleAlert(options);
          } else {
            const options: ISimpleAlertOptions = {
              header: 'Information',
              message: `No receipts available in the App Store!`,
              buttons: ['OK'],
            };
            this.showSimpleAlert(options);
          }
          loading.dismiss();
        })
        .catch((_) => {
          this.showSimpleAlert({
            buttons: ['OK'],
            header: 'Error!',
            message: 'No receipts available in the App Store!',
          });
          loading.dismiss();
        });
    }
  }

  async buyProduct(opts: { productTitle: string; productId: string }) {
    const loading = await this.loadingController.create({
      message: `Buying ${opts.productTitle}!`,
    });
    loading.present();
    this.iap
      .buy(opts.productId)
      .then((product) => {
        this.showSimpleAlert({
          buttons: ['OK'],
          header: 'Success!',
          message: `${product.transactionId} was successfully bought.`,
        });
        this.storage.set('boughtMasterKey', true);
        this.bought = true;
        loading.dismiss();
      })
      .catch((err) => {
        this.showSimpleAlert({
          buttons: ['OK'],
          header: 'Error!',
          message: err,
        });
        loading.dismiss();
      });
  }

  public async showSimpleAlert(options: ISimpleAlertOptions) {
    const alert = await this.alertCtrl.create({
      header: options.header,
      message: options.message,
      buttons: options.buttons,
    });
    alert.present();
  }
}
