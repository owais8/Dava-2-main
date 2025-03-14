// app.enum.d.ts

declare global {
  export enum DataType {
    Object = 'object',
    Array = 'array',
    String = 'string',
    Number = 'number',
  }

  export enum ResponseStatus {
    Success = 'success',
    Failure = 'failure',
  }

  export enum Toast {
    Success = 'success',
    Error = 'error',
    Info = 'info',
    Warning = 'warning',
  }
}

export {};
