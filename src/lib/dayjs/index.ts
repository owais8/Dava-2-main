import 'dayjs/locale/ja';

import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.locale('en');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDayjs(value: any): value is dayjs.Dayjs {
  return dayjs.isDayjs(value);
}

export { Dayjs, dayjs, isDayjs, isBetween };
