export class Response {
  constructor (status, payload, error) {
    this.status = status
    this.payload = payload
    if (error) {
      this.error = error
    }
  }
}

// export class ResponseError {
//   constructor (status, payload, error) {
//     this.status = status
//     this.payload = payload
//     this.error = error
//   }
// }
