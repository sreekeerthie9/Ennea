import styled from "styled-components";

const StyledHeader = styled.h2`
  border-bottom: 1px solid #bbb;
  padding-bottom: 10px;
  margin: 40px 0 10px;
`;
export default function Header({ title }) {
  return <StyledHeader>{title}</StyledHeader>;
}
