import React from "react"
import LinkList from "./LinkList"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const TypeList = ({ data, location }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <LinkList data={data}>
      <SEO
        title={edges.length > 0 ? edges[0].node.frontmatter.ltype : "Home"}
      />
    </LinkList>
  )
}

export default TypeList

export const query = graphql`
  query TypeQuery($ltype: String!) {
    site {
      siteMetadata {
        author
        title
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
