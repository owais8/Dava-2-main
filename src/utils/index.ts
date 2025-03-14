import shared from './shared';
import showToast from './toast';

interface IUtils {
  shared: typeof shared;
  showToast: typeof showToast;
}

const utils: IUtils = {
  shared,
  showToast,
};

export default utils;
