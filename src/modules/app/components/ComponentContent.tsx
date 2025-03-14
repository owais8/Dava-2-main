'use client';

import React from 'react';

import {
  AddShoppingCart,
  Alarm,
  ArrowBack,
  ArrowForward,
  Delete,
  Done,
  Face,
  Mail,
  ShoppingCart,
  VisibilityOutlined,
} from '@mui/icons-material';
import type { BadgeProps } from '@mui/material';
import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  Chip,
  Container,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Radio,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';

import { Button, Switch } from '@/components';
import { ComponentSection } from '@/modules/app/components/ComponentSection';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export function ComponentContent() {
  return (
    <Container>
      <Typography variant="h3" mb={8}>
        Components
      </Typography>
      <Stack spacing={6}>
        <ComponentSection title="Typography">
          <Stack direction="row" alignItems="center" spacing={4}>
            <Typography variant="h1">h1</Typography>
            <Typography variant="h2">h2</Typography>
            <Typography variant="h3">h3</Typography>
            <Typography variant="h4">h4</Typography>
            <Typography variant="h5">h5</Typography>
            <Typography variant="h6">h6</Typography>
            <Typography variant="body1">body1</Typography>
            <Typography variant="body2">body2</Typography>
            <Typography variant="subtitle1">subtitle1</Typography>
            <Typography variant="subtitle2">subtitle2</Typography>
            <Typography variant="button">button</Typography>
            <Typography variant="caption">caption</Typography>
            <Typography variant="overline">overline</Typography>
            <Typography variant="inherit">inherit</Typography>
          </Stack>
        </ComponentSection>

        <ComponentSection title="Buttons">
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Typography variant="h6">Type</Typography>
              <Box display="flex" gap={2}>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="text">Text</Button>
                <Button disabled>Disabled</Button>
                <Button href="#text-buttons">Link</Button>
              </Box>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h6">Colors</Typography>
              <Box display="flex" gap={2}>
                <Button variant="contained" color="primary">
                  Primary
                </Button>
                <Button variant="contained" color="secondary">
                  Secondary
                </Button>
                <Button variant="contained" color="info">
                  Info
                </Button>
                <Button variant="contained" color="success">
                  Success
                </Button>
                <Button variant="contained" color="warning">
                  Warning
                </Button>
                <Button variant="contained" color="error">
                  Error
                </Button>
                <Button variant="contained" color="inherit">
                  Inherit
                </Button>
              </Box>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h6">Size</Typography>
              <Box display="flex" gap={2} alignItems="center">
                <Button variant="contained" size="large">
                  Large
                </Button>
                <Button variant="contained" size="medium">
                  Medium
                </Button>
                <Button variant="contained" size="small">
                  Small
                </Button>
              </Box>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h6">Icons</Typography>
              <Box display="flex" gap={2} alignItems="center" mb={4}>
                <Button color="secondary" variant="outlined" startIcon={<ArrowBack />}>
                  Back
                </Button>
                <Button color="secondary" variant="outlined" endIcon={<ArrowForward />}>
                  Next
                </Button>
                <Button color="secondary" size="small" variant="text" startIcon={<ArrowBack />}>
                  Back
                </Button>
                <Button color="secondary" size="small" variant="text" endIcon={<ArrowForward />}>
                  Next
                </Button>
              </Box>
              <Box display="flex" gap={2} alignItems="center">
                <IconButton aria-label="delete">
                  <Delete />
                </IconButton>
                <IconButton aria-label="delete" disabled color="primary">
                  <Delete />
                </IconButton>
                <IconButton color="secondary" aria-label="add an alarm">
                  <Alarm />
                </IconButton>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <AddShoppingCart />
                </IconButton>
              </Box>
            </Stack>
          </Stack>
        </ComponentSection>

        <ComponentSection title="Text Field">
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Typography variant="h6">Type</Typography>
              <Box display="flex" gap={2}>
                <TextField label="Your Name" variant="outlined" />
                <TextField label="Your Name" variant="filled" />
                <TextField label="Your Name" variant="standard" />
                <TextField label="Your Name" variant="standard" />
              </Box>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h6">Size</Typography>
              <Box display="flex" gap={2} alignItems="center">
                <TextField label="Your Name" variant="outlined" size="medium" />
                <TextField label="Your Name" variant="outlined" size="small" />
              </Box>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h6">Icons</Typography>
              <Box display="flex" gap={2}>
                <TextField
                  label="Prefix"
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    },
                  }}
                />
                <TextField
                  label="Suffix"
                  slotProps={{
                    input: {
                      endAdornment: <VisibilityOutlined />,
                    },
                  }}
                />
                <TextField label="helperText" variant="outlined" helperText="Helper text" />
              </Box>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h6">State</Typography>
              <Box display="flex" gap={2} alignItems="center">
                <TextField label="Defailt" variant="outlined" size="medium" />
                <TextField label="Error" variant="outlined" size="medium" error />
                <TextField label="Disabled" variant="outlined" size="medium" disabled />
              </Box>
            </Stack>
          </Stack>
        </ComponentSection>
        <ComponentSection title="Checkbox">
          <Box display="flex" gap={8}>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
              <FormControlLabel required control={<Checkbox />} label="Required" />
              <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox size="large" defaultChecked />} label="Large" />
              <FormControlLabel
                control={<Checkbox size="medium" defaultChecked />}
                label="Medium"
              />
              <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Small" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked color="error" />} label="Error" />
              <FormControlLabel control={<Checkbox defaultChecked color="info" />} label="Info" />
              <FormControlLabel
                control={<Checkbox defaultChecked color="primary" />}
                label="Primary"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked color="secondary" />}
                label="Secondary"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked color="success" />}
                label="Success"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked color="warning" />}
                label="Warning"
              />
            </FormGroup>
          </Box>
        </ComponentSection>

        <ComponentSection title="Radio">
          <Box display="flex" gap={8}>
            <FormGroup>
              <FormControlLabel control={<Radio defaultChecked />} label="Label" />
              <FormControlLabel required control={<Radio />} label="Required" />
              <FormControlLabel disabled control={<Radio />} label="Disabled" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Radio size="medium" defaultChecked />} label="Medium" />
              <FormControlLabel control={<Radio size="small" defaultChecked />} label="Small" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Radio defaultChecked color="error" />} label="Error" />
              <FormControlLabel control={<Radio defaultChecked color="info" />} label="Info" />
              <FormControlLabel
                control={<Radio defaultChecked color="primary" />}
                label="Primary"
              />
              <FormControlLabel
                control={<Radio defaultChecked color="secondary" />}
                label="Secondary"
              />
              <FormControlLabel
                control={<Radio defaultChecked color="success" />}
                label="Success"
              />
              <FormControlLabel
                control={<Radio defaultChecked color="warning" />}
                label="Warning"
              />
            </FormGroup>
          </Box>
        </ComponentSection>

        <ComponentSection title="Switch">
          <Box display="flex" gap={8}>
            <Switch defaultChecked label="Switch" />
            <Switch label="Switch" />
            <Switch defaultChecked label="default" color="default" />
            <Switch defaultChecked label="error" color="error" />
            <Switch defaultChecked label="info" color="info" />
            <Switch defaultChecked label="primary" color="primary" />
            <Switch defaultChecked label="secondary" color="secondary" />
            <Switch defaultChecked label="success" color="success" />
            <Switch defaultChecked label="warning" color="warning" />
          </Box>
        </ComponentSection>

        <ComponentSection title="Chip">
          <Stack spacing={6}>
            <Box display="flex" gap={8}>
              <Chip label="Chip Filled" />
              <Chip label="Chip Outlined" variant="outlined" />
              <Chip label="Chip Filled small" size="small" />
              <Chip label="Chip Outlined small" variant="outlined" size="small" />
            </Box>
            <Box display="flex" gap={8}>
              <Chip
                label="Custom delete icon"
                onClick={() => ({})}
                onDelete={() => ({})}
                deleteIcon={<Done />}
              />
              <Chip
                label="Custom delete icon"
                onClick={() => ({})}
                onDelete={() => ({})}
                deleteIcon={<Delete />}
                variant="outlined"
              />
              <Chip icon={<Face />} label="With Icon" />
              <Chip icon={<Face />} label="With Icon" variant="outlined" />

              <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
              <Chip
                avatar={<Avatar alt="Natacha" src="/static/images/avatar.jpg" />}
                label="Avatar"
                variant="outlined"
              />
            </Box>

            <Box display="flex" gap={8}>
              <Chip label="Primary" color="primary" />
              <Chip label="Secondary" color="secondary" />
              <Chip label="Info" color="info" />
              <Chip label="Success" color="success" />
              <Chip label="Warning" color="warning" />
              <Chip label="Error" color="error" />
              <Chip label="Default" color="default" />
            </Box>
            <Box display="flex" gap={8}>
              <Chip variant="outlined" label="Primary" color="primary" />
              <Chip variant="outlined" label="Secondary" color="secondary" />
              <Chip variant="outlined" label="Info" color="info" />
              <Chip variant="outlined" label="Success" color="success" />
              <Chip variant="outlined" label="Warning" color="warning" />
              <Chip variant="outlined" label="Error" color="error" />
              <Chip variant="outlined" label="Default" color="default" />
            </Box>
          </Stack>
        </ComponentSection>

        <ComponentSection title="Badge">
          <Box display="flex" gap={8}>
            <Badge color="primary" badgeContent={99}>
              <Mail />
            </Badge>
            <Badge color="secondary" badgeContent={100}>
              <Mail />
            </Badge>
            <Badge color="success" badgeContent={1000} max={999}>
              <Mail />
            </Badge>
            <Badge color="error" variant="dot">
              <Mail />
            </Badge>

            <IconButton aria-label="cart">
              <StyledBadge badgeContent={4} color="warning">
                <ShoppingCart />
              </StyledBadge>
            </IconButton>
          </Box>
        </ComponentSection>
      </Stack>
    </Container>
  );
}
