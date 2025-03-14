import { ArrowForwardIosSharp } from '@mui/icons-material';
import type { AccordionSummaryProps } from '@mui/material';
import { styled } from '@mui/material';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharp className="text-sm text-text-primary" />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  [`&.${accordionSummaryClasses.root}`]: {
    minHeight: 'auto',
  },

  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)',
  },

  [`& .${accordionSummaryClasses.content}`]: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: theme.spacing(2),
  },
  [`& .${accordionSummaryClasses.content}.${accordionSummaryClasses.expanded}`]: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: theme.spacing(2),
  },
}));
