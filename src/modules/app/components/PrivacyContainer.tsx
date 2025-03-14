'use client';

import { Container, Typography } from '@mui/material';

export function PrivacyContainer() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="body1">
        Your privacy is important to us. This privacy policy explains how we collect, use, and
        protect your information.
      </Typography>
      <Typography variant="h6">Information We Collect</Typography>
      <Typography variant="body2">
        We collect personal information that you provide to us, such as your name, email address,
        and other details.
      </Typography>
      <Typography variant="h6">How We Use Your Information</Typography>
      <Typography variant="body2">
        We use your information to provide and improve our services, respond to inquiries, and
        personalize user experience.
      </Typography>
      <Typography variant="h6">Your Rights</Typography>
      <Typography variant="body2">
        You have the right to access, update, or delete your personal information at any time.
      </Typography>
    </Container>
  );
}
