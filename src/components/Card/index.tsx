import type { CardProps } from '@mui/material';
import { Card as MuiCard, CardContent } from '@mui/material';

import { cn } from '@/lib';

interface ICardProps extends CardProps {
  cardContentClassName?: TClassName;
}

export function Card({ children, cardContentClassName, ...props }: ICardProps) {
  return (
    <MuiCard elevation={0} className="!rounded-[10px] h-full" {...props}>
      <CardContent className={cn('h-full bg-custom-card p-6', cardContentClassName)}>
        {children}
      </CardContent>
    </MuiCard>
  );
}
