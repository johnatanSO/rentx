declare namespace Express {
  export interface Request {
    user: {
      _id: string
    }
    file: Multer.File & Request.File
  }
}
