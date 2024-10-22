// export type SuccessDto<T> = {
//     success: true
//     message: string
//     data: T
// }

// export type ErrorDto<E> =  {
//     success: false
//     message: string
//     errorData: E
// }

// export type DataResponse<T, E> = SuccessDto<T> | ErrorDto<E>

export type ApiResponse<T, E> = 
| { status: 'success'; data?: T }
| { status: 'error'; message: string; errorData?: E }