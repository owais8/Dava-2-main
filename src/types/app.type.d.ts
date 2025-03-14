// app.type.d.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
type TDate = string | number | Date;
type TLoading = 'idle' | 'loading';
type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type TClassName = HTMLAttributes<string>['className'];
type TAction =
  | 'add'
  | 'edit'
  | 'detail'
  | 'create'
  | 'delete'
  | 'cancel'
  | 'changeRole'
  | 'recalculate'
  | 'remove'
  | 'text'
  | 'setAsDefault';

type TRowAction = { id: TAction; label: string; onClick?: () => void };
type TRow<T = any> = { id: string | number; action?: TRowAction[] } & Record<string, T>;
type TActionClick = { actionType: TAction; id: string | number };

type TOption<T = any> = {
  id?: string;
  label: string;
  value: T;
};

type TColumn = {
  id: string;
  label: string;
  align?: 'start' | 'end' | 'center' | undefined;
  minWidth?: number;
  maxWidth?: number;
  headerClassName?: TClassName;
  bodyClassName?: TClassName;
  isFixedColumn?: boolean;
  format?: (val: any) => React.ReactElement;
};

type TAPIConfig = {
  endPoint: string;
  key: string[];
  method: TMethod;
  isAuthRequired?: boolean;
};

type TApiError<T = any> = {
  [key: string]: T;
};

type TApiResponseBase<T = any> = {
  data: T;
  statusCode: number;
  success: boolean;
  message: string;
  messageCode: string;
  messageErrors: string;
};

type TBaseState = {
  loading: TLoading;
  error?: any;
  requestId?: string;
  isSuccess?: boolean;
  isError?: boolean;
  isFetching?: boolean;
};
