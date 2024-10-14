import { useContext } from "react";
import { GlobalContext } from "./GlobalState";
import styled from "styled-components";

const StyledH4 = styled.h4`
  margin: 0;
  text-transform: uppercase;
`;

const StyledH1 = styled.h4`
  letter-spacing: 1px;
  margin: 0;
`;

export default function Balaance() {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  return (
    <>
      <StyledH4>Your Balance</StyledH4>
      <StyledH1>${total}</StyledH1>
    </>
  );
}
