import {createContext, useReducer} from 'react';

const initialState = {
    transactions: []
  };

export const GlobalContext = createContext(initialState);

function transactionReducer(state, action){
    switch (action.type) {
        case 'DELETE_TRANSACTION':
          return {
            ...state,
            transactions: state.transactions.filter(
              (transaction) => transaction.id !== action.payload
            )
          }
          case 'ADD_TRANSACTION':
            return {
              ...state,
              transactions: [action.payload, ...state.transactions]
            }
        default:
          return state;
      }
}

export function GlobalProvider({children}){
    const [state, dispatch] = useReducer(transactionReducer, initialState);

  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  const ctxValue = {
    transactions: state.transactions,
    deleteTransaction,
    addTransaction
  };

  return (
    <GlobalContext.Provider
      value={ctxValue}>
       
        {children}
    </GlobalContext.Provider>
  );
}