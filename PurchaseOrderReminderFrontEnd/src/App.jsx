import PoTracker from './components/PoTracker/PoTracker'
import SupplierList from './components/SupplierList/SupplierList'
import SkuCatalog from './components/SkuCatalog/SkuCatalog'
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
          <Link to={'/skus'}>SKU Catalog</Link>
        </div>
        <Routes>
          <Route path='/' element={<PoTracker />} />
          <Route path='/suppliers' element={<SupplierList />} />
          <Route path='/skus' element={<SkuCatalog />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
