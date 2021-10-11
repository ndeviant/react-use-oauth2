// eslint-disable-next-line no-unused-vars
import { useOAuth2, useOAuth2ProviderProps } from '../useOAuth2'

export const useTwitchOAuth2 = (props: useOAuth2ProviderProps) => {
  return useOAuth2({
    ...props,
    oauthUrl: props.oauthUrl || 'https://id.twitch.tv/oauth2/authorize',
    scope: props.scope || 'user:read:email'
  })
}
