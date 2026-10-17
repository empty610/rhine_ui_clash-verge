import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import ProxyControlSwitches from '@/components/shared/proxy-control-switches'
import { useSystemState } from '@/hooks/use-system-state'
import { showNotice } from '@/services/notice-service'

export const ProxyTunCard = () => {
  const { t } = useTranslation()
  const { isTunModeAvailable } = useSystemState()
  return (
    <Box>
      <ProxyControlSwitches
        label={t('settings.sections.system.toggles.systemProxy')}
        onError={showNotice.error}
        noRightPadding
      />
      <Box sx={{ borderTop: '1px solid var(--rhine-line)', mt: 0.5, pt: 0.5 }}>
        <ProxyControlSwitches
          label={t('settings.sections.system.toggles.tunMode')}
          onError={showNotice.error}
          noRightPadding
        />
      </Box>
      {!isTunModeAvailable && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 1, px: 1 }}
        >
          {t('home.components.proxyTun.status.tunModeServiceRequired')}
        </Typography>
      )}
    </Box>
  )
}
