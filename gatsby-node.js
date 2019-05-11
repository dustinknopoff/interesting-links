/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")
const path = require(`path`)
const fs = require("fs")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        site {
          siteMetadata {
            sections
            title
            author
            description
          }
        }
        allMarkdownRemark(
          filter: { fields: { sourceInstanceName: { eq: "links" } } }
        ) {
          edges {
            node {
              frontmatter {
                ltype
                tag
                url
                title
              }
            }
          }
        }
      }
    `).then(result => {
      let edges = result.data.allMarkdownRemark.edges
      let all_tags = edges.map(({ node }) => {
        return node.frontmatter.tag
      })
      let uniq_tags = _.uniq(all_tags)
      uniq_tags.forEach(tag => {
        createPage({
          path: `${tag}`,
          component: path.resolve(`./src/templates/TagList.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            tag: `${tag}`,
          },
        })
      })
      let { sections } = result.data.site.siteMetadata
      sections.forEach(section => {
        createPage({
          path: `${section.toLowerCase()}`,
          component: path.resolve(`./src/templates/TypeList.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            ltype: `${section}`,
          },
        })
      })
      let content = edges.map(({ node }) => {
        const { frontmatter } = node
        return { ...frontmatter }
      })
      const { title, author, description } = result.data.site.siteMetadata
      let jsonFeed = {
        title: title,
        author: author,
        description: description,
        items: content,
      }
      fs.writeFile("./public/feed.json", JSON.stringify(jsonFeed), err => {
        if (err) console.log(err)
      })
      let summary = {
        title: title,
        author: author,
        description: description,
        items: content.slice(0, 10),
      }
      fs.writeFile(
        "./public/feed-summary.json",
        JSON.stringify(summary),
        err => {
          if (err) console.log(err)
        }
      )
      resolve()
    })
  })
}
