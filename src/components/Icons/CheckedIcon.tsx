import type { SvgIconProps } from '@mui/material/SvgIcon';
import SvgIcon from '@mui/material/SvgIcon';

export default function CheckedIcon({ ...props }: SvgIconProps) {
  return (
    <SvgIcon sx={{ height: 47, width: 47 }} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="47"
        height="48"
        fill="none"
        viewBox="0 0 47 48"
      >
        <circle cx="23.5" cy="24.197" r="23.5" fill="#D7FAE1"></circle>
        <circle cx="23.501" cy="24.197" r="11.718" stroke="#4CA154" strokeWidth="1.3"></circle>
        <path
          stroke="#4CA154"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.3"
          d="M18.55 25.327 20.63 28a.76.76 0 0 0 1.187.023L28.446 20"
        ></path>
      </svg>
    </SvgIcon>
  );
}
