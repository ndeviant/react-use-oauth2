// eslint-disable-next-line no-unused-vars
import { useOAuth2, useOAuth2ProviderProps } from '../useOAuth2'

export const useGoogleOAuth2 = (props: useOAuth2ProviderProps) => {
  return useOAuth2({
    ...props,
    oauthUrl: props.oauthUrl || 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: props.scope || 'profile email openid'
  })
}
