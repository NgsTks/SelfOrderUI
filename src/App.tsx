import './App.css'
import { TopPage } from './pages/TopPage'
import { OrderProvider } from './contexts/OrderContext'

function App() {

  return (
    <>
    <OrderProvider>
      <TopPage/>
    </OrderProvider>
    </>
  )
}

export default App
