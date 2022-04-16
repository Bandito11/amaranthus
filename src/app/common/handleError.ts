import { toastController } from "@ionic/core";

export async function handleError(error: any) {
  if (typeof error === 'string') {
    console.error(error);
    const toast = await toastController.create({
      message: error,
      duration: 2000,
      color: 'danger',
    })
    toast.present();
  } else if (typeof error === 'object') {
    for (const key in error) {
      if (error.hasOwnProperty(key)) {
        console.error(error[key]);
        const toast = await toastController.create({
          message: error[key],
          duration: 2000,
          color: 'danger',
        })
        toast.present();
      }
    }
  }
}
