// app.interface.d.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

interface IQueryParamsBase {
  page?: number;
  perPage?: number;
  order?: 'ASC' | 'DESC';
  orderBy?: string;
}

interface IUseHookBaseReturn<T = any, P extends IQueryParamsBase> {
  data?: T;
  isLoading?: boolean;
  pagination?: TPagination;
  queryParams?: P;
  setQueryParams?: (params: P) => void;
  onAction?: (action: TAction, data: T) => void;
}

interface IEndPointParameter {
  [index: string]: string | number;
}

interface ISvgProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  width?: number;
  height?: number;
  style: React.CSSProperties;
  classname: TClassName;
}
