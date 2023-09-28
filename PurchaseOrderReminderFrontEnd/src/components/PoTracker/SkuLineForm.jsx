/**
 * SkuLineForm.jsx
 * Description: This component renders the form for each individual SKU line as part of the Purchase Order form
 * Author: Liam Cushen
 * Date: 2023-09-01
 */

import { 
    Input,
    Flex,
    Select,
    Button
  } from '@chakra-ui/react'
//import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import SkuLineFormSkuDropdown from './SkuLineFormSkuDropdown'

const SkuLineForm = (props) => {
    
    const {handleSkuLineInputChange, skuLineIndex, lineData, deleteFunction} = props

    // Handle input changes from the handler passed to the form from the parent component (PoLineItemForm)
    const handleInputChange = (e) => {
        const {name, value} = e.target
        if (name === 'sku') {
            handleSkuLineInputChange(skuLineIndex, name, parseInt(value))
        } else {
            handleSkuLineInputChange(skuLineIndex, name, value)
        }
        
    }

    //if the finishedgoods/materaials dropdown is changed, update the finalproduct field (materials should have a final product, finished goods should not, or it should be equal to the SKU that is entered)
    useEffect(() => {
        if (lineData.fgmat === 'finishedgoods') {
            handleSkuLineInputChange(skuLineIndex, 'finalproduct', lineData.sku)
        }
    }, [lineData.sku, lineData.fgmat])
    

    //Render the SKU Line Form
    return (
        <>
        <Flex>
                <Select name='fgmat' value={lineData.fgmat} onChange={handleInputChange}>
                    <option value='finishedgoods'>Finished Good</option>
                    <option value='materials'>Materials</option>
                </Select>
                {
                (lineData.fgmat === 'materials') ? <Input placeholder='Final Product SKU' name='finalproduct' onChange={handleInputChange} value={lineData.finalproduct}/> : null 
                }
                
            </Flex>
            <Flex>
                <SkuLineFormSkuDropdown name='sku' value={lineData.sku} onChange={handleInputChange} />
                <Input placeholder='Quantity' name='quantity' type='number' onChange={handleInputChange} value={lineData.quantity} />
                <Input placeholder='Price' name='price' type='number' onChange={handleInputChange} value={lineData.price} />
                <Input placeholder='Due/Pickup' name='duedate' onChange={handleInputChange} value={lineData.duedate} />
            </Flex>
            <Flex>
                <Input placeholder='Destination' name='destination' onChange={handleInputChange} value={lineData.destination} />
                <Select name='shipmethod' value={lineData.shipmethod} onChange={handleInputChange}>
                    <option value='sea'>Sea</option>
                    <option value='air'>Air</option>
                    <option value='courier'>Courier</option>
                    <option value='truck'>Truck</option>
                </Select>
                <Input placeholder='Arrival Date' name='arrivaldate' onChange={handleInputChange} value={lineData.arrivaldate} />
                <Select name='status' value={lineData.status} onChange={handleInputChange}>
                    <option value='placed'>Placed</option>
                    <option value='reviewing'>Reviewing</option>
                    <option value='needsapproval'>Needs Approval</option>
                    <option value='cancelled'>Cancelled</option>
                    <option value='complete'>Complete</option>
                    <option value='enroute'>En Route</option>
                    <option value='delivered'>Delivered</option>
                </Select>
            </Flex>
            <Button onClick={deleteFunction}>Delete</Button>
            </>
    )

}

SkuLineForm.propTypes = {
    handleSkuLineInputChange: PropTypes.func,
    skuLineIndex: PropTypes.number,
    lineData: PropTypes.shape({
      fgmat: PropTypes.string,
      finalproduct: PropTypes.string,
      sku: PropTypes.number,
      description: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
      duedate: PropTypes.string,
      destination: PropTypes.string,
      shipmethod: PropTypes.string,
      arrivaldate: PropTypes.string,
      status: PropTypes.string,
    }),
    deleteFunction: PropTypes.func,
  }

export default SkuLineForm