import type { Components, Theme } from '@mui/material'

export const rhineComponents: Components<Theme> = {
  MuiButtonBase: { defaultProps: { disableRipple: true } },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        padding: '7px 16px',
        boxShadow: 'none',
      },
      contained: { boxShadow: 'none' },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: 'none', borderRadius: 2, boxShadow: 'none' },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: { border: '1px solid var(--rhine-line)', borderRadius: 3 },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: { fontSize: 18, borderBottom: '1px solid var(--rhine-line)' },
    },
  },
  MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 2 } } },
  MuiChip: { styleOverrides: { root: { borderRadius: 2 } } },
  MuiTooltip: { styleOverrides: { tooltip: { borderRadius: 2 } } },
  MuiTab: {
    styleOverrides: {
      root: { textTransform: 'none', fontWeight: 600, minHeight: 42 },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      switchBase: { '&.Mui-checked': { color: 'var(--primary-main)' } },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: { fontWeight: 600, background: 'var(--rhine-panel)' },
    },
  },
  MuiListItemButton: { styleOverrides: { root: { borderRadius: 2 } } },
}
