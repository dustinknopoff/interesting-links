import styled from "styled-components"

export const Tag = styled.p`
  background-color: #efefef;
  border-radius: 4px;
  padding: 3px;
  color: var(--main-opp-color);
`

export const Btn = styled.button`
  background: #3779b7;
  height: 2rem;
  border: none;
  border-radius: 5px;
  color: var(--main-txt-extrme);

  &:active {
    background: #efefef;
  }
`

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
    text-align: left !important;

    > * {
      margin-bottom: 10px;
    }
  }
`
