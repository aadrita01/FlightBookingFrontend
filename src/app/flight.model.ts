export class Flight {
    constructor(
      public flightId: string,
      public origin: string,
      public destination: string,
      public departureDate: Date,
      public departureTime: string,
      public arrivalDate: Date,
      public arrivalTime: string,
      public fare: number
    ) {}
  }