import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 1.2rem;

  div {
    flex-grow: 1;
    max-width: 85%;
  }

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }

  img {
    max-width: 5rem;
    object-fit: contain;
    flex-grow: 2;
  }
`;
