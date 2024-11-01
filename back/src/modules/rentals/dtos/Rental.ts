export interface ICreateRentalDTO {
  userId: string
  carId: string
  expectedReturnDate: Date
}

export interface IListRentalsDTO {
  userId: string
  carId: string
  filterStartDate: string
  filterEndDate: string
}
