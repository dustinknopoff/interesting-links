import React from "react"
import LinkList from "./LinkList"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const TypeList = ({ data }) => (
  <LinkList data={data}>
    <SEO />
  </LinkList>
)

export default TypeList

export const query = graphql`
  query TypeQuery($ltype: String!) {
    site {
      siteMetadata {
        author
      }
    }
    allMarkdownRemark(filter: { frontmatter: { ltype: { eq: $ltype } } }) {
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
`
