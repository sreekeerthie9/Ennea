import Header from './components/Header'
import './index.css'
import Balaance from './components/Balance'
import { GlobalProvider } from './components/GlobalState'
import IncomeExpenses from './components/IncomeExpenses'
import TransactionList from './components/TransactionList'
import AddTransaction from './components/AddTransaction'

function App() {
  

  return (
   <GlobalProvider>
    <Header title={"EXPENSE TRACKER"} />
    <Balaance />
    <IncomeExpenses />
    <TransactionList />
    <AddTransaction />
   </GlobalProvider>
  )
}

export default App
