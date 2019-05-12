import React from "react"
import LinkList from "./LinkList"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const TagList = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  let tag = null
  if (edges.length !== 0) {
    tag = edges[0].node.frontmatter.tag
  }
  const titleTag = `${tag}`.charAt(0).toUpperCase() + tag.slice(1)
  return (
    <LinkList data={data} tag={tag}>
      <SEO title={`${titleTag} | ${data.site.siteMetadata.title}`} />
    </LinkList>
  )
}

export default TagList

export const query = graphql`
  query TagQuery($tag: String!) {
    site {
      siteMetadata {
        author
        title
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
