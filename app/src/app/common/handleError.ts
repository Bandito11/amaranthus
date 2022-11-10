import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { toastController } from '@ionic/core';
import { getTodayFullDate } from './format';

export async function handleError(error: any) {
  if (typeof error === 'string') {
    console.error(error);
    const toast = await toastController.create({
      message: error,
      duration: 1000,
      color: 'danger',
      position: 'top',
    });

    toast.present();
    writeSecretFile(error);
  } else if (typeof error === 'object') {
    for (const key in error) {
      if (error.hasOwnProperty(key)) {
        console.error(error[key]);
        const toast = await toastController.create({
          message: error[key],
          duration: 1000,
          color: 'danger',
          position: 'top',
        });
        toast.present();
        writeSecretFile(error[key]);
      }
    }
  }
}

const writeSecretFile = async (error) => {
  const date = getTodayFullDate();
  await Filesystem.writeFile({
    path: `errors/${date}.txt`,
    data: error,
    directory: Directory.Library,
    encoding: Encoding.UTF8,
  });
};
