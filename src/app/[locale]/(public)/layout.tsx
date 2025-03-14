import { Container } from '@mui/material';

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        {children}
      </Container>
    </main>
  );
}
