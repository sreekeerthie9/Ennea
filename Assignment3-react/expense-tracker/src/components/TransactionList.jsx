import { useContext } from "react";
import { GlobalContext } from "./GlobalState";
import Transaction from "./Transaction";

export default function TransactionList(){
    const { transactions } = useContext(GlobalContext);

    return (
      <>
        <h3>Transactions</h3>
        <ul className="list">
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      </>
    );
}