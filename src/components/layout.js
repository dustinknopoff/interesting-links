/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "./header"
import "./layout.css"

const Layout = ({ children, tag }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
            sections
          }
        }
      }
    `}
    render={data => (
      <Grid>
        <Header
          siteTitle={data.site.siteMetadata.title}
          description={data.site.siteMetadata.description}
          sections={data.site.siteMetadata.sections}
          tag={tag}
        />
        <Main>{children}</Main>
      </Grid>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

export const Grid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 3fr repeat(12, 1fr) 3fr;
`

export const Main = styled.main`
  grid-row: 2;
  grid-column: 2 / span 12;
`

export const Footer = styled.footer`
  grid-column: 7 / span 2;
  grid-row: 3;
  display: flex;
  justify-content: center;

  > * {
    margin: 0 5px 0 5px;
  }
`
