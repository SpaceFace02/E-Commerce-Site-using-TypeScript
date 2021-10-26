import styled from "styled-components";
import { IconButton } from "@material-ui/core";

export const Wrapper = styled.div`
  margin: 2.5rem;
`;

export const StyledButton = styled(IconButton)`
  position: absolute;
  z-index: 1000;
  right: 10px;
`;
