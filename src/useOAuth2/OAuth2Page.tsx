import { memo } from 'react'
// eslint-disable-next-line no-unused-vars
import { useOAuth2Page, useOAuth2PageProps } from './useOAuth2Page'

const OAuth2Page = memo(function OAuth2Page({
  origin = process.env.REACT_APP_DOMAIN || '',
  provider
}: useOAuth2PageProps) {
  useOAuth2Page({
    origin,
    provider
  })

  return null
})

export { OAuth2Page }
