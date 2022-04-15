import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

/**
 *
 *
 * @returns {Promise<Photo>}
 */
export async function takePicture() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
    });

    return image;
  } catch (error) {
    let permissions = await Camera.checkPermissions();
    if (permissions.camera === 'denied') {
      permissions = await Camera.requestPermissions();
      if (permissions.camera === 'denied') {
        throw 'Camera permissions was denied';
      }
    }

    if (permissions.photos === 'denied') {
      permissions = await Camera.requestPermissions();
      if (permissions.photos === 'denied') {
        throw 'Photos permissions was denied';
      }
    }
    return this.takePicture();
  }
}
