/* eslint-disable no-unused-expressions */
import { useCallback, useEffect, useRef } from 'react'

import qs from '../utils/qs'

export type useOAuth2Props = {
  redirectUri: string
  oauthUrl: string
  clientId: string
  scope: string
  responseType?: string
  onSuccess?: Function
  onFailure?: Function
  height?: number
  width?: number
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type useOAuth2ProviderProps = PartialBy<useOAuth2Props, 'oauthUrl'>

const useOAuth2 = (props: useOAuth2Props) => {
  const {
    oauthUrl,
    clientId,
    responseType = 'token',
    scope,
    redirectUri,
    onSuccess = () => null,
    onFailure = () => null,
    height = 800,
    width = 660
  } = props

  const propsRef = useRef<{ onSuccess: Function; onFailure: Function }>({
    onSuccess,
    onFailure
  })
  propsRef.current = { onSuccess, onFailure }

  const popupWindowRef = useRef<Window | null>()

  useEffect(() => {
    const onPopupWindowMessage = (event: MessageEvent) => {
      if (event.source !== popupWindowRef.current) {
        return
      }

      const { data } = event

      popupWindowRef.current?.close?.()

      if (data.error) {
        propsRef.current.onFailure?.(data)

        return
      }

      propsRef.current.onSuccess?.(data)
    }

    window.addEventListener('message', onPopupWindowMessage, false)

    return () => {
      window.removeEventListener('message', onPopupWindowMessage, false)
    }
  }, [])

  const onClick = useCallback(() => {
    const queryString =
      '?' +
      qs.stringify({
        response_type: responseType,
        client_id: clientId,
        scope,
        redirect_uri: redirectUri
      })

    const coords = popupCenter(width, height)
    popupWindowRef.current = window.open(
      `${oauthUrl}${queryString}`,
      oauthUrl,
      `width=${coords.width},height=${coords.height},top=${coords.top},left=${coords.left}`
    )

    popupWindowRef.current?.focus?.()
  }, [responseType, clientId, scope, redirectUri, oauthUrl, height, width])

  return { onClick }
}

const popupCenter = (w: number, h: number) => {
  // Fixes dual-screen position
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY

  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    window.screen.width
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    window.screen.height

  const systemZoom = width / window.screen.availWidth

  const left = (width - w) / 2 / systemZoom + dualScreenLeft
  const top = (height - h) / 2 / systemZoom + dualScreenTop

  return {
    width: w / systemZoom,
    height: h / systemZoom,
    top,
    left
  }
}

export { useOAuth2 }
