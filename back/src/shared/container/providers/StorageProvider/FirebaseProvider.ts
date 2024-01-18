import crypto from 'crypto'
import { ServiceAccount } from 'firebase-admin'
import { initializeApp, cert } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'
import { injectable } from 'tsyringe'
import { Bucket } from '@google-cloud/storage'
import {
  IResponseUpload,
  IStorageProvider,
  IUploadImageDTO,
} from './IStorageProvider'
import { AppError } from '../../../errors/AppError'
import serviceAccount from '../../../../config/firebaseKey.json'
/* IMPORTANTE: ESTE ARQUIVO 'firebaseKey.json' NÃO DEVERIA IR PARA O REPOSITÓRIO DO 
GITHUB CASO O PROJETO ESTIVESSE EM PRODUÇÃO, MAS COMO É UM PROJETO FICTÍCIO PARA PORTFÓLIO, 
ESTOU DEIXANDO LÁ PARA CASO ALGUÉM QUEIRA CLONAR O REPOSITÓRIO E TESTAR A APLICAÇÃO. */

@injectable()
export class FirebaseProvider implements IStorageProvider {
  private STORAGE_URL = 'https://storage.googleapis.com'
  private BUCKET_URL = 'rentx-7e1d1.appspot.com'
  private bucket: Bucket

  constructor() {
    initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
      storageBucket: this.BUCKET_URL,
    })

    this.bucket = getStorage().bucket()
  }

  async uploadImage(
    folder: string,
    image: IUploadImageDTO,
  ): Promise<IResponseUpload> {
    if (!image) throw new AppError('Arquivo não enviado')

    const fileHash = crypto.randomBytes(16).toString('hex')
    const imageName = `${folder}/${fileHash}-${image.originalname}`

    const file = this.bucket.file(imageName)

    await file.save(image.buffer, {
      metadata: {
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',
      },
    })

    const imageURL = `${this.STORAGE_URL}/${this.BUCKET_URL}/${imageName}`

    return {
      imageURL,
      imageName,
    }
  }

  async deleteImage(imageName: string): Promise<void> {
    await this.bucket.deleteFiles({
      prefix: imageName,
    })
  }
}
