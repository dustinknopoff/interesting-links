import React from "react"
import styled from "styled-components"
import Moment from "react-moment"
import { Link } from "gatsby"

const ILink = ({ node }) => (
  <Link to={node.fields.slug}>
    <TitleDate>
      <h4 style={{ textAlign: `right` }}>{node.frontmatter.title}</h4>
      <Moment fromNow>{node.frontmatter.date}</Moment>
    </TitleDate>
    <p style={{ marginLeft: `25%` }}>{node.excerpt}</p>
  </Link>
)

export default ILink

export const TitleDate = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: baseline;
`
