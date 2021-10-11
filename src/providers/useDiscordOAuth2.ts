// eslint-disable-next-line no-unused-vars
import { useOAuth2, useOAuth2ProviderProps } from '../useOAuth2'

export const useDiscordOAuth2 = (props: useOAuth2ProviderProps) => {
  return useOAuth2({
    ...props,
    oauthUrl: props.oauthUrl || 'https://discord.com/api/oauth2/authorize',
    scope: props.scope || 'identify email'
  })
}
