import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image"
import styled, { css } from "styled-components"

const Header = ({ siteTitle, description, sections }) => {
  return (
    <Head>
      <Title>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
        <p style={{ width: `75%` }}>{description}</p>
      </Title>
      <Info>
        <Link to="/">
          <Image />
        </Link>
        <LinksList>
          {sections.map((x, index) => {
            return <ListElem key={index}>{x}</ListElem>
          })}
          <ListElem end key={"a"}>
            None
          </ListElem>
        </LinksList>
      </Info>
      <Title>
        <button>Follow</button>
      </Title>
    </Head>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  description: PropTypes.string,
  pages: PropTypes.arrayOf(PropTypes.string),
}

Header.defaultProps = {
  siteTitle: ``,
  description: ``,
  pages: [``],
}

export default Header

export const Head = styled.header`
  grid-column: 2 / span 12;
  grid-row: 1;
  display: flex;
  flex-wrap: wrap;
  margin-top: 4vh;
`

export const Title = styled.div`
  width: 33%;

  @media only screen and (max-width: 712px) {
    width: 100%;
  }
`

export const Info = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin: 10px;
  }

  @media only screen and (max-width: 712px) {
    width: 100%;
  }
`

export const LinksList = styled.ul`
  list-style-type: none;
  display: flex;
`

export const ListElem = styled.li`
  border-right: 1px solid black;
  padding: 0 5px 0 5px;
  font-style: italic;

  :hover {
    font-style: normal;
  }

  @media (prefers-color-scheme: dark) {
    border-right: 1px solid gray;
  }

  ${props =>
    props.end &&
    css`
      border: none;
    `};
`
