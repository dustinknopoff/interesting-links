import React, { Fragment } from "react"
import netlifyIdentity from "netlify-identity-widget"
import MySubs from "../templates/myinterests"
import styled from "styled-components"
import { Btn } from "../components/header"
import { navigate } from "gatsby"

const Me = () => {
  if (typeof window !== "undefined") {
    netlifyIdentity.init()
    return netlifyIdentity.currentUser() == null ? (
      <Fragment>
        <CenterBtn
          onClick={() => netlifyAuth.authenticate(() => navigate("/me"))}
        >
          Login
        </CenterBtn>
      </Fragment>
    ) : (
      <MySubs />
    )
  }
  return null
}

export default Me

export const netlifyAuth = {
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

export const CenterBtn = styled(Btn)`
  position: absolute;
  width: 100px;
  height: 50px;
  top: 50%;
  left: 50%;
  margin-left: -50px; /* margin is -0.5 * dimension */
  margin-top: -25px;
`
