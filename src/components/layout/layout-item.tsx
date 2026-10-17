import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import type { ReactNode } from 'react'
import { useMatch, useNavigate, useResolvedPath } from 'react-router'

import type { SortableItemRenderProps } from '@/components/base/sortable-item'
import { useVerge } from '@/hooks/use-verge'
import { rhinePages } from '@/pages/_rhine-meta'
interface Props {
  to: string
  children: string
  icon: ReactNode[]
  sortable?: SortableItemRenderProps
}
export const LayoutItem = ({ to, children, icon, sortable }: Props) => {
  const { verge } = useVerge()
  const collapsed = verge?.collapse_navbar ?? false
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })
  const navigate = useNavigate()
  const meta = rhinePages[to]
  return (
    <ListItem ref={sortable?.ref} style={sortable?.style} disablePadding>
      <ListItemButton
        ref={sortable?.handleRef}
        className="rhine-nav-item"
        data-icons={verge?.menu_icon}
        selected={!!match}
        title={collapsed ? children : undefined}
        aria-label={children}
        aria-current={match ? 'page' : undefined}
        onClick={() => {
          if (!match) navigate(to, { viewTransition: true })
        }}
      >
        <span className="rhine-nav-number" aria-hidden="true">
          {meta?.number}
        </span>
        <ListItemIcon>
          {verge?.menu_icon === 'colorful' ? icon[1] : icon[0]}
        </ListItemIcon>
        <ListItemText primary={children} secondary={meta?.caption} />
        <span className="rhine-nav-indicator" aria-hidden="true">
          ↗
        </span>
      </ListItemButton>
    </ListItem>
  )
}
