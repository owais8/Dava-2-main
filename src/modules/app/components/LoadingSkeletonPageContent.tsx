import { Skeleton, Stack } from '@mui/material';

export function LoadingSkeletonPageContent() {
  return (
    <Stack>
      <Skeleton variant="rounded" width="100%" height={45} className="bg-custom-secondary" />
      <Skeleton
        variant="rounded"
        width="100%"
        className="mt-6 h-[calc(100vh-240px)] bg-custom-secondary"
      />
    </Stack>
  );
}
