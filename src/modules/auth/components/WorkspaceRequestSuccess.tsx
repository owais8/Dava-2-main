'use client';

import { ChevronLeft, NotificationsOutlined } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import { Button, CheckedIcon, List, TextLink } from '@/components';
import constants from '@/constants';
import { useRedirect } from '@/hooks';
import { AuthCard } from '@/modules/auth';

export function WorkspaceRequestSuccess() {
  const { redirect } = useRedirect();

  return (
    <AuthCard
      title="Request Sent Successfully"
      subTitle="Your access change request has been submitted"
      icon={<CheckedIcon className="w-[76px] h-[76px]" />}
      className="pb-6 sm:pb-8 md:pb-8"
    >
      <Stack width="100%">
        <Stack spacing={6}>
          <Stack className="bg-custom-card py-3 px-4 rounded-[10px] space-y-[2px]">
            <Box display="flex" justifyContent="space-between">
              <Typography>Requested Role:</Typography>
              <Typography fontWeight={600}>Team Manager</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Current Status:</Typography>
              <Typography fontWeight={600}>Pending Approval</Typography>
            </Box>
          </Stack>
          <Typography textAlign="center">What’s Next?</Typography>
          <List
            data={[
              {
                subTitle:
                  'Complete your account setup now with viewer access. We’ll notify you when your role upgrade is approved.',
                icon: <NotificationsOutlined />,
                titleProps: { variant: 'subtitle1' },
              },
            ]}
          />

          <Box textAlign="center">
            Need immediate assistance?
            <TextLink href={`mailto:${constants.shared.APP.MAIL}`} ml={1} fontWeight="bold">
              Contact Support
            </TextLink>
          </Box>

          <Button
            type="submit"
            size="large"
            fullWidth
            className="py-3"
            onClick={() => redirect(constants.routePages.auth.PROFILE_SETUP_PAGE)}
          >
            Contiune Account setup
          </Button>
        </Stack>

        <Box display="flex" mt={9}>
          <IconButton
            disableRipple
            size="medium"
            color="inherit"
            onClick={() => redirect(constants.routePages.auth.WORKSPACE_INFO_PAGE)}
            sx={{ ml: -4 }}
            className="group"
          >
            <ChevronLeft />
            <Typography className="group-hover:underline">Back</Typography>
          </IconButton>
        </Box>
      </Stack>
    </AuthCard>
  );
}
