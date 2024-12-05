class ApiError {
  constructor(statusCode: number, message: string, sucess: boolean) {}
}

// class ApiError extends Error {
//   constructor (
//     message: "Something went wrong",
//     errors: [],
//     stack: string,
//     statusCode: number

//   ) {

//     super(message)
//     this.message = message
//     this.stack = stack
//     this.error = errors

//   }
// }
