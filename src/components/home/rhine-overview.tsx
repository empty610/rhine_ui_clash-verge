import { ArrowForwardRounded } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import RhineSignalLoop from '@/assets/image/rhine-signal-loop.svg?react'
import { useSystemState } from '@/hooks/use-system-state'
import { isRhinePreview } from '@/utils/rhine-preview'
export const RhineOverview = ({ hasProfile }: { hasProfile: boolean }) => {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const { runningMode, isLoading } = useSystemState()
  const schematicRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const schematic = schematicRef.current
    if (!schematic) return

    let inView = false
    const updateMotion = () => {
      schematic.dataset.motion =
        inView && !document.hidden && document.hasFocus() ? 'running' : 'paused'
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      updateMotion()
    })
    observer.observe(schematic)
    document.addEventListener('visibilitychange', updateMotion)
    window.addEventListener('focus', updateMotion)
    window.addEventListener('blur', updateMotion)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updateMotion)
      window.removeEventListener('focus', updateMotion)
      window.removeEventListener('blur', updateMotion)
    }
  }, [])
  const zh = i18n.language.startsWith('zh')
  const running = runningMode !== 'NotRunning'
  const status = isRhinePreview
    ? zh
      ? '隔离预览 · 连接保持不变'
      : 'Isolated UI preview'
    : isLoading
      ? zh
        ? '正在读取内核状态'
        : 'Reading core status'
      : running
        ? zh
          ? '内核运行中'
          : 'Core running'
        : zh
          ? '内核未运行'
          : 'Core stopped'
  return (
    <div className="rhine-overview">
      <div className="rhine-overview-copy">
        <span className="rhine-eyebrow">CLASH VERGE / RHINE EDITION</span>
        <h2>{zh ? '连接，自有秩序。' : 'Every connection. In order.'}</h2>
        <p>
          {hasProfile
            ? zh
              ? '查看网络状态，掌控每一条连接。'
              : 'Observe your network. Control every connection.'
            : zh
              ? '从一份配置开始，建立你的网络。'
              : 'Import a profile to set up your network.'}
        </p>
        <div className="rhine-overview-actions">
          <Button
            variant="contained"
            disableElevation
            endIcon={<ArrowForwardRounded />}
            onClick={() =>
              navigate(hasProfile ? '/proxies' : '/profile', {
                viewTransition: true,
              })
            }
          >
            {hasProfile
              ? zh
                ? '管理代理'
                : 'Manage proxies'
              : zh
                ? '导入配置'
                : 'Import profile'}
          </Button>
          <span className="rhine-core-status">
            <i data-running={!isLoading && running} />
            {status}
          </span>
        </div>
      </div>
      <div className="rhine-schematic" ref={schematicRef} aria-hidden="true">
        <RhineSignalLoop focusable="false" />
        <span>NETWORK CONTROL</span>
      </div>
    </div>
  )
}
