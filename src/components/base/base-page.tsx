import { Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import { useLocation } from 'react-router'

import { rhinePages } from '@/pages/_rhine-meta'

import { BaseErrorBoundary } from './base-error-boundary'

interface Props {
  title?: React.ReactNode // the page title
  header?: React.ReactNode // something behind title
  contentStyle?: React.CSSProperties
  children?: ReactNode
  full?: boolean
}

export const BasePage: React.FC<Props> = (props) => {
  const { title, header, contentStyle, full, children } = props
  const meta = rhinePages[useLocation().pathname]

  return (
    <BaseErrorBoundary>
      <div className="base-page">
        <header data-tauri-drag-region="true" style={{ userSelect: 'none' }}>
          <div className="rhine-page-title" data-tauri-drag-region="true">
            <span className="rhine-page-number" aria-hidden="true">
              {meta?.number ?? 'CV'}
            </span>
            <div data-tauri-drag-region="true">
              <span className="rhine-eyebrow">
                {meta?.caption ?? 'RHINE EDITION'}
              </span>
              <Typography
                component="h1"
                sx={{ fontSize: 22, fontWeight: 500 }}
                data-tauri-drag-region="true"
              >
                {title}
              </Typography>
            </div>
          </div>
          {header}
        </header>

        <div className={full ? 'base-container no-padding' : 'base-container'}>
          <section>
            <div className="base-content" style={contentStyle}>
              {children}
            </div>
          </section>
        </div>
      </div>
    </BaseErrorBoundary>
  )
}
