import { useEffect } from 'react'

import qs from '../utils/qs'

export type useOAuth2PageProps = {
  provider: string
  origin: string
}

const useOAuth2Page = ({ provider, origin }: useOAuth2PageProps) => {
  useEffect(() => {
    const parsed = qs.parse(window.location.hash.replace('#', ''))

    const data = {
      provider,
      ...parsed
    }

    window.opener.postMessage(data, origin)
  }, [origin])

  return null
}

export { useOAuth2Page }
