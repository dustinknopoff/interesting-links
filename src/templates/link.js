import React from "react"
import styled from "styled-components"
import Moment from "react-moment"
import { Tag } from "../components/sharedCss"
import { Link } from "gatsby"

const ILink = ({ frontmatter }) => {
  const { url, title, date, tag } = frontmatter
  return (
    <TitleDate>
      <TagTitle>
        <a href={url}>
          <h4 style={{ textAlign: `right` }}>{title}</h4>
        </a>
        <Tag as={Link} to={tag}>
          {tag}
        </Tag>
      </TagTitle>
      <Moment fromNow>{date}</Moment>
    </TitleDate>
  )
}

export default ILink

export const TitleDate = styled.div`
  display: flex;
  justify-content: space-between;
  // flex-direction: row-reverse;
  align-items: baseline;
`

export const TagTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  > * {
    margin: 5px;
  }
`
