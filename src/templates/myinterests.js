import React, { useState } from "react"
import { StaticQuery, graphql, navigate } from "gatsby"
import { Grid, Main } from "../components/layout"
import { Head, Title, Btn } from "../components/header"
import ILink from "../templates/link"
import _ from "lodash"
import styled from "styled-components"
import { netlifyAuth } from "../pages/me"

function MySubs() {
  const [content, setContent] = useState([])
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
        if (_.isEmpty(content)) {
          data.allMarkdownRemark.edges.map(async ({ node }) => {
            return await fetch(
              `${node.frontmatter.url}/feed-summary.json`,
              new Headers({ "Access-Control-Allow-Origin": "*" })
            )
              .then(r => r.json())
              .then(r => {
                let _c = content
                r.origin = node.frontmatter.url
                _c.push(r)
                setContent(_c)
              })
          })
        }
        return (
          <Grid>
            <Head style={{ alignItems: `baseline` }}>
              <Title>
                <Btn
                  onClick={() => {
                    netlifyAuth.signout()
                    navigate("/")
                  }}
                >
                  Signout
                </Btn>
              </Title>
              <Title>
                <h1>My Interests</h1>
              </Title>
              <Title>
                <Btn
                  as="a"
                  href={"/admin/#/collections/My%20Interests"}
                  style={{ padding: `10px`, marginBottom: `-20px` }}
                >
                  Add Interest
                </Btn>
              </Title>
            </Head>
            <Main>
              <table style={{ maxHeight: `75vh`, overflow: `scroll` }}>
                <thead>
                  <tr>
                    <th>Interest</th>
                    <th>Latest Link</th>
                  </tr>
                </thead>
                <tbody>
                  {content.map(c => {
                    return (
                      <tr key={c.url}>
                        <td>
                          <a href={c.origin} style={{ color: `#efefef` }}>
                            <p>{c.title}</p>
                          </a>
                        </td>
                        <td>
                          <ILink frontmatter={c.items[0]} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Main>
          </Grid>
        )
      }}
    />
  )
}

export default MySubs

export const Wrap = styled.tr`
  display: flex;
  align-items: baseline;

  > * {
    padding: 10px;
  }
`
