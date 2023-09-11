/**
 * PoTracker.js
 * Description: This componet renders the Purchase Order Tracker at a high level and calls PoLine for each Purchase Order
 * Author: Liam Cushen
 * Date: 2023-09-01
 */


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

function App() {

  //Render the Purchase Order Tracker with the routes to the Supplier List and SKU Catalog as well
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
