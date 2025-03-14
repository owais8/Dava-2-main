import type { SvgIconProps } from '@mui/material/SvgIcon';
import SvgIcon from '@mui/material/SvgIcon';

export default function NoteIcon({ ...props }: SvgIconProps) {
  return (
    <SvgIcon sx={{ height: 25, width: 19 }} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="25"
        fill="none"
        viewBox="0 0 19 25"
      >
        <path fill={props.fill} d="M0 3a3 3 0 0 1 3-3h13a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H0z"></path>
        <path
          fill={props.fill}
          d="M0 23.293V15.71a.5.5 0 0 1 .668-.471l5.588 1.995a.5.5 0 0 1 .185.825L.854 23.646A.5.5 0 0 1 0 23.293"
        ></path>
        <path
          stroke={props.stroke || '#fff'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M5 7h9M5 12h6"
        ></path>
      </svg>
    </SvgIcon>
  );
}
