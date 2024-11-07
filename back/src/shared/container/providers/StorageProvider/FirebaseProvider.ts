import fs from 'fs'
import mime from 'mime-types'
import { resolve } from 'path'
import { Bucket } from '@google-cloud/storage'
import { getStorage } from 'firebase-admin/storage'
import { ServiceAccount, cert, initializeApp } from 'firebase-admin/app'
import upload from '../../../../config/upload'
import { IStorageProvider } from './IStorageProvider'
import { AppError } from '../../../errors/AppError'

export class FirebaseProvider implements IStorageProvider {
  private STORAGE_URL = 'https://storage.googleapis.com'
  private BUCKET_URL = 'rentx-7e1d1.appspot.com'
  private bucket: Bucket

  constructor() {
    initializeApp({
      credential: cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        projectId: process.env.FIREBASE_PROJECT_ID,
      } as ServiceAccount),
      storageBucket: this.BUCKET_URL,
    })

    this.bucket = getStorage().bucket()
  }

  async uploadImage(imageName: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, imageName)
    const fileContent = await fs.promises.readFile(originalName)

    const file = this.bucket.file(`${folder}/${imageName}`)

    const stream = file.createWriteStream({
      metadata: {
        contentType: mime.lookup(originalName) || '',
      },
    })

    return new Promise<string>((resolve, reject) => {
      stream.on('error', async (error) => {
        console.error(error)

        await fs.promises.unlink(originalName)

        reject(new AppError(error.message))
      })

      stream.on('finish', async () => {
        await file.makePublic()

        await fs.promises.unlink(originalName)

        const imageURL = `${this.STORAGE_URL}/${this.BUCKET_URL}/${folder}/${imageName}`

        resolve(imageURL)
      })

      stream.end(fileContent)
    })
  }

  async deleteImage(file: string, folder: string): Promise<void> {
    await this.bucket.deleteFiles({
      prefix: `${folder}/${file}`,
    })
  }
}
