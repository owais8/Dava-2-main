import type { Id, ToastContent, ToastOptions, TypeOptions } from 'react-toastify';
import { Slide, toast } from 'react-toastify';

export const defaultToastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: false,
  closeButton: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  icon: false,
  transition: Slide,
};

/**
 * Display toast
 *
 * @param {ToastType} type
 * @param {ToastContent} content
 * @param {ToastOptions} [options=defaultToastOption]
 * @return {Id}
 */
const showToast = (
  type: TypeOptions,
  content: ToastContent,
  options: Partial<ToastOptions> = {},
): Id => {
  const optionsToApply = { ...defaultToastOptions, ...options };

  switch (type) {
    case 'success':
      return toast.success(content, optionsToApply);

    case 'error':
      return toast.error(content, optionsToApply);

    case 'info':
      return toast.info(content, optionsToApply);

    case 'warning':
      return toast.warn(content, optionsToApply);

    case 'default':
      return toast(content, optionsToApply);

    default:
      return toast(content, optionsToApply);
  }
};

export default showToast;
