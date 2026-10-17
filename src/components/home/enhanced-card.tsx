import { Box, Typography } from '@mui/material'
import { forwardRef, type ReactNode } from 'react'
interface EnhancedCardProps {
  title: ReactNode
  icon: ReactNode
  action?: ReactNode
  children: ReactNode
  iconColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  minHeight?: number | string
  noContentPadding?: boolean
}
export const EnhancedCard = forwardRef<HTMLElement, EnhancedCardProps>(
  (
    { title, icon, action, children, minHeight, noContentPadding = false },
    ref,
  ) => (
    <Box ref={ref} className="rhine-card">
      <div className="rhine-card-heading">
        <span className="rhine-card-icon" aria-hidden="true">
          {icon}
        </span>
        {typeof title === 'string' ? (
          <Typography
            component="h2"
            title={title}
            noWrap
            sx={{ fontSize: 14, fontWeight: 600, flex: 1 }}
          >
            {title}
          </Typography>
        ) : (
          <Box sx={{ minWidth: 0, flex: 1 }}>{title}</Box>
        )}
        {action}
      </div>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: noContentPadding ? 0 : 2,
          minHeight,
        }}
      >
        {children}
      </Box>
    </Box>
  ),
)
