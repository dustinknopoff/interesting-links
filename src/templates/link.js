import React from "react"
import styled from "styled-components"
import { Tag } from "../components/sharedCss"
import { Link } from "gatsby"

const ILink = ({ frontmatter }) => {
  const { url, title, tag } = frontmatter
  return (
    <TitleDate>
      <TagTitle>
        <a href={url}>
          <h4 style={{ textAlign: `right` }}>{title}</h4>
        </a>
        <Tag as={Link} to={`/${tag}`}>
          {tag}
        </Tag>
      </TagTitle>
    </TitleDate>
  )
}

export default ILink

export const TitleDate = styled.div`
  display: flex;
  justify-content: space-between;
  // flex-direction: row-reverse;
  align-items: baseline;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`

export const TagTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  > * {
    margin: 5px;
  }
`
