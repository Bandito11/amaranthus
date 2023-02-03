import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class HandleUnrecoverableStateService {
  constructor(updates: SwUpdate, toastController: ToastController) {
    updates.unrecoverable.subscribe(async (event) => {
      const toast = await toastController.create({
        message:
          'An error occurred that we cannot recover from:\n' +
          event.reason +
          '\n\nPlease reload the page.',
        duration: 1000,
        position: 'top',
        color: 'danger',
      });

      await toast.present();
    });
  }
}
