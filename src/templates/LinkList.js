import React from "react"
import ILink from "../templates/link"
import Layout from "../components/layout"

const LinkList = ({ data, children }) => (
  <Layout>
    {children}
    {data.allMarkdownRemark.edges.length === 0 && (
      <p>
        There's nothing here yet. Let {data.site.siteMetadata.author} know
        you're interested!
      </p>
    )}
    {data.allMarkdownRemark.edges.map(({ node }) => {
      return <ILink {...node} key={node.fields.slug} />
    })}
  </Layout>
)

export default LinkList
