import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';

import { MainNav } from './MainNav';
import Notification from './Notification';
import UserNav from './UserNav';
import { LogoDarkIcon } from '@/components';
import constants from '@/constants';
import { Link } from '@/i18n/routing';

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        maxWidth: '100%',
        alignItems: 'center',
        px: { xs: 4, sm: 6 },
        py: { xs: 6, sm: 9 },
      }}
      className="bg-white"
      spacing={2}
    >
      <Box
        component={Link}
        href={constants.routePages.private.TRAFFIC_ANALYTICS_PAGE}
        className="flex"
      >
        <LogoDarkIcon className="w-[260px] h-[36px] lg:w-[280px] lg:h-[38px]" />
      </Box>
      <Box className="flex items-center ml-auto">
        <MainNav />
        <Notification />
        <UserNav />
      </Box>
    </Stack>
  );
}
