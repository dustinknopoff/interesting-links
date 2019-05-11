/* eslint-disable */
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import netlifyIdentity from "netlify-identity-widget"
import { Grid, Main } from "../components/layout"
import { Head, Title, Btn } from "../components/header"

const MySubs = () => {
  return (
    <StaticQuery
      query={graphql`
        query AllInterests {
          allMarkdownRemark(
            filter: { fields: { sourceInstanceName: { eq: "interests" } } }
          ) {
            edges {
              node {
                frontmatter {
                  url
                }
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <Grid>
            <Head>
              <Title />
              <Title>
                <h1>My Interests</h1>
              </Title>
              <Title>
                <Btn>Add Interest</Btn>
              </Title>
            </Head>
            <Main>
              {" "}
              {data.allMarkdownRemark.edges.map(({ node }) => {
                console.log(`${node.frontmatter.url}/feed-summary.json`)
                fetch(`${node.frontmatter.url}/feed-summary.json`)
                  .then(r => r.json())
                  .then(r => console.log(r))
              })}
            </Main>
          </Grid>
        )
      }}
    />
  )
}

export default MySubs

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
