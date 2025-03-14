export interface SourceInfo {
  id: string;
  label: string;
  color: string;
}

export interface IData {
  id: string;
  name: string;
  value: number;
  data?: {
    date: string;
    valueDate: number;
  }[];
}
