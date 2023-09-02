import PoTracker from './components/PoTracker/PoTracker'
import SupplierList from './components/SupplierList/SupplierList'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { 
  ChakraProvider
} from '@chakra-ui/react'
//import './App.css'

function App() {

  return (
    <ChakraProvider>
      <Router>
        <div>
          <Link to={'/'}>Home</Link>
          <Link to={'/suppliers'}>Suppliers</Link>
        </div>
        <Routes>
          <Route path='/' element={<PoTracker />} />
          <Route path='/suppliers' element={<SupplierList />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
