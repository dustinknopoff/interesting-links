import React from "react"
import netlifyIdentity from "netlify-identity-widget"
import MySubs from "../templates/myinterests"
import styled from "styled-components"

const Me = () => {
  return netlifyAuth.isAuthenticated ? (
    <MySubs />
  ) : (
    <button
      onClick={() =>
        netlifyAuth.authenticate(() => console.log(netlifyAuth.user))
      }
    >
      Login
    </button>
  )
}

export default Me

const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  authenticate(callback) {
    this.isAuthenticated = true
    netlifyIdentity.open()
    netlifyIdentity.on("login", user => {
      this.user = user
      callback(user)
    })
  },
  signout(callback) {
    this.isAuthenticated = false
    netlifyIdentity.logout()
    netlifyIdentity.on("logout", () => {
      this.user = null
      callback()
    })
  },
}

export const Wrap = styled.tr`
  display: flex;
  align-items: baseline;

  > * {
    padding: 10px;
  }
`
