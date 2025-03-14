import { Skeleton, Stack } from '@mui/material';

export function LoadingSkeletonLayout() {
  return (
    <Stack p={{ xs: 4, sm: 6 }} rowGap={8}>
      <Skeleton variant="rounded" width="100%" height={110} className="bg-custom-secondary" />
      <Skeleton
        variant="rounded"
        width="100%"
        className="h-[calc(100vh-262px)] bg-custom-secondary"
      />
      <Skeleton variant="rounded" width="100%" height={40} className="bg-custom-secondary" />
    </Stack>
  );
}
