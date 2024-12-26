import React from 'react'
import UrlShortener from './UrlShortner'

export default function UserLogout({isLoggedIn}) {

  return (
    <div>
      {isLoggedIn ? (
        <div>Logged in...</div>
      ):(
        <UrlShortener/>
      )}
    </div>
  )
}
