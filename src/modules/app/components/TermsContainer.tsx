'use client';

import { Container, Typography } from '@mui/material';

export function TermsContainer() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Terms and Conditions
      </Typography>
      <Typography variant="body1">
        These terms and conditions outline the rules and regulations for the use of our services.
      </Typography>
      <Typography variant="h6">Acceptance of Terms</Typography>
      <Typography variant="body2">
        By accessing and using our services, you accept and agree to be bound by the terms outlined
        here.
      </Typography>
      <Typography variant="h6">User Conduct</Typography>
      <Typography variant="body2">
        Users must adhere to all applicable laws and refrain from engaging in prohibited activities.
      </Typography>
      <Typography variant="h6">Changes to Terms</Typography>
      <Typography variant="body2">
        We reserve the right to modify these terms at any time. Continued use of our services
        constitutes acceptance of the changes.
      </Typography>
    </Container>
  );
}
