import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

/**
 *
 *
 * @returns {Promise<Photo>}
 */
export async function takePicture() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
    source: CameraSource.Prompt
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  return image;
}
