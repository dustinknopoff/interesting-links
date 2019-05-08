import React from "react"
import LinkList from "./LinkList"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const TagList = ({ data }) => (
  <LinkList data={data}>
    <SEO />
  </LinkList>
)

export default TagList

export const query = graphql`
  query TagQuery($tag: String!) {
    site {
      siteMetadata {
        author
      }
    }
    allMarkdownRemark(filter: { frontmatter: { tag: { eq: $tag } } }) {
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
