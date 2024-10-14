import { useContext } from "react";
import { GlobalContext } from "./GlobalState";
import styled from "styled-components";

const ListItem = styled.li`
  background-color: #fff;
  box-shadow: var(--box-shadow);
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  border-right: 5px solid
    ${({ $amount }) =>
      $amount >= 0 ? ($amount === 0 ? "#fff" : "#20fa7b") : "#c0392b"};
  position: relative;
`;

const Delete = styled.button`
  cursor: pointer;
  background-color: #e74c3c;
  border: none;
  color: #fff;
  font-size: 20px;
  padding: 2px 5px;
  position: absolute;
  top: 50%;
  left: -40px; /* Adjust to align properly */
  transform: translateY(-50%);
  opacity: 1;
  transition: opacity 0.3s ease;
`;

export default function Transaction({ transaction }) {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? "" : "+";

  return (
    <ListItem $amount={transaction.amount}>
      {transaction.text}
      <span>
        {sign}
        {transaction.amount}
      </span>
      <Delete onClick={() => deleteTransaction(transaction.id)}>x</Delete>
    </ListItem>
  );
}
