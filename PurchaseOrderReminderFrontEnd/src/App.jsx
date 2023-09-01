import { useState } from 'react'
import axios from 'axios'
//import polineitemservice from './services/polineitems'
import PoLineItem from './components/PoLineItem'
import { useEffect } from 'react'
import PoLineItemForm from './components/PoLineItemForm'
//import './App.css'

function App() {
  const [poLines, setPoLines] = useState([])

  useEffect(() => {
    axios
    .get('http://localhost:3001/POlineitems')
    .then(response => {
      console.log('promise fulfilled')
      setPoLines(response.data)
    })
  }, [])

  return (
    <>
      <h1>PO Line Items</h1>
      <div className="card">
        <PoLineItemForm></PoLineItemForm>
      </div>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>PO Number</th>
              <th>SKU</th>
              <th>Description</th>
              <th>Supplier</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Currency</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {
              poLines.map(lineItem => 
                <PoLineItem 
                  line={lineItem} 
                  key={"LineNumber" + lineItem.id} 
                />
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
