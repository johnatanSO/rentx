import {
  IResponseUpload,
  IStorageProvider,
  IUploadImageDTO,
} from './IStorageProvider'

export class MockStorageProvider implements IStorageProvider {
  images: any[] = []

  async uploadImage(image: IUploadImageDTO): Promise<IResponseUpload> {
    this.images.push(image)

    return {
      imageName: image.originalname,
      imageURL: `/fake/${image.originalname}`,
    }
  }

  async deleteImage(imageName: string): Promise<void> {
    this.images.filter((image) => image.name !== imageName)
  }
}
