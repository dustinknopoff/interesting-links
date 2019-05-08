import React from "react"
import { StaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"
import LinkList from "../templates/LinkList"

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query AllLinks {
        site {
          siteMetadata {
            author
          }
        }
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                title
                ltype
                tag
                url
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => (
      <LinkList data={data}>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      </LinkList>
    )}
  />
)

export default IndexPage
