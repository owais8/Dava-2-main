import type { SvgIconProps } from '@mui/material/SvgIcon';
import SvgIcon from '@mui/material/SvgIcon';

export default function TransferIcon({ ...props }: SvgIconProps) {
  return (
    <SvgIcon sx={{ height: 47, width: 47 }} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="47"
        height="48"
        fill="none"
        viewBox="0 0 47 48"
      >
        <circle cx="23.5" cy="24" r="23.5" fill="#FCF4CC"></circle>
        <g stroke="#CF9421" strokeWidth="1.4" clipPath="url(#clip0_2111_4786)">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.293 35.964v-4.602h4.601"></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M35.256 21.802c1.145 6.088-2.58 12.124-8.664 13.754-4.655 1.248-9.406-.43-12.299-3.907M11.737 26.199c-1.145-6.089 2.581-12.125 8.664-13.755 4.656-1.247 9.406.43 12.3 3.907"
          ></path>
          <path strokeLinecap="round" strokeLinejoin="round" d="M32.7 12.037v4.601h-4.602"></path>
          <path d="M23.499 23.072a2.319 2.319 0 1 0 0-4.638 2.319 2.319 0 0 0 0 4.638Z"></path>
          <path strokeLinecap="round" d="M19.246 28.638a4.64 4.64 0 0 1 8.505 0"></path>
        </g>
        <defs>
          <clipPath id="clip0_2111_4786">
            <path fill="#fff" d="M10.512 11.013h25.974v25.974H10.512z"></path>
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
}
