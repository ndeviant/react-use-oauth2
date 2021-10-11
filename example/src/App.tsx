import React, { useCallback } from 'react'
import { useOAuth2, useTwitchOAuth2, useDiscordOAuth2 } from 'react-use-oauth2'

const App = () => {
  const onSuccess = useCallback(async (args) => {
    const { access_token: accessToken, provider } = args
    console.log({
      provider,
      accessToken
    })
  }, [])

  const { onClick: onGoogleClick } = useOAuth2({
    oauthUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientId: '123',
    redirectUri: `localhost:3000/oauth2/google-oauth2`,
    onSuccess: onSuccess,
    scope: 'profile email openid'
  })

  const { onClick: onTwitchClick } = useTwitchOAuth2({
    clientId: '123',
    redirectUri: `localhost:3000/oauth2/twitch`,
    onSuccess: onSuccess,
    scope: 'user:read:email'
  })

  const { onClick: onDiscordClick } = useDiscordOAuth2({
    clientId: '123',
    redirectUri: `localhost:3000/oauth2/discord`,
    onSuccess: onSuccess,
    scope: 'identify email'
  })

  return (
    <div>
      <button onClick={onGoogleClick}>Google Log in</button>
      <button onClick={onTwitchClick}>Twitch Log in</button>
      <button onClick={onDiscordClick}>Discord Log in</button>
    </div>
  )
}

export default App
