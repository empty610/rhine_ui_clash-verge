export const isRhinePreview =
  typeof window !== 'undefined' &&
  (window as Window & { __RHINE_PREVIEW__?: boolean }).__RHINE_PREVIEW__ ===
    true
