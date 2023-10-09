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
import { useEffect, useState } from 'react'
import SkuLineFormSkuDropdown from './SkuLineFormSkuDropdown'

const SkuLineForm = (props) => {
    
    const {handleSkuLineInputChange, skuLineIndex, lineData, deleteFunction, updateSkuLineErrors} = props

    const [skuErrors, setSkuErrors] = useState({})

    const validateSkuFields = (fieldName, value) => {
        const errors = {...skuErrors}

        console.log(fieldName, value)

        switch (fieldName) {
            case 'quantity':
                if (typeof(value) !== 'number' || value < 0) {
                    errors[fieldName] = 'Quantity must be greater than 0'
                } else {
                    delete errors[fieldName]
                }
                break
            
            case 'price':
                if (typeof(value) !== 'number' || value < 0) {
                    errors[fieldName] = 'Price must be greater than 0'
                } else {   
                    delete errors[fieldName]
                }
                break

            case 'duedate':
                if (value !== '' && !/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/((19|20)\d\d)/.test(value)) {
                    errors[fieldName] = 'Due date must be in the format MM/DD/YYYY'
                } else {
                    delete errors[fieldName]
                }
                break

            case 'arrivaldate':
                if (value !== '' && !/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/((19|20)\d\d)/.test(value)) {
                    errors[fieldName] = 'Due date must be in the format MM/DD/YYYY'
                } else {
                    delete errors[fieldName]
                }
                break

            case 'destination':
                if (value.length === 0) {
                    errors[fieldName] = 'Destination cannot be blank'
                } else {
                    delete errors[fieldName]
                }
                break

            default:
                break
        }
        setSkuErrors(errors)
        updateSkuLineErrors(skuLineIndex, errors)
    }

    // Handle input changes from the handler passed to the form from the parent component (PoLineItemForm)
    const handleInputChange = (e) => {
        const {name, value} = e.target
        if (name === 'sku' || name === 'quantity' || name === 'price' || name === 'finalproduct') {
            handleSkuLineInputChange(skuLineIndex, name, parseInt(value))
            validateSkuFields(name, parseInt(value))
        } else {
            handleSkuLineInputChange(skuLineIndex, name, value)
            validateSkuFields(name, value)
        }
        console.log(skuErrors)
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
                (lineData.fgmat === 'materials') ? <SkuLineFormSkuDropdown name='finalproduct' value={lineData.finalproduct} onChange={handleInputChange} /> : null
                }
                
            </Flex>
            <Flex>
                <SkuLineFormSkuDropdown name='sku' value={lineData.sku} onChange={handleInputChange} />
                <Input placeholder='Quantity' name='quantity' type='number' onChange={handleInputChange} value={lineData.quantity} />
                <Input placeholder='Price' name='price' type='number' onChange={handleInputChange} value={lineData.price} />
                <Input placeholder='Due/Pickup' type='date' name='duedate' onChange={handleInputChange} value={lineData.duedate} />
            </Flex>
            <Flex>
                <Input placeholder='Destination' name='destination' onChange={handleInputChange} value={lineData.destination} />
                <Select name='shipmethod' value={lineData.shipmethod} onChange={handleInputChange}>
                    <option value='sea'>Sea</option>
                    <option value='air'>Air</option>
                    <option value='courier'>Courier</option>
                    <option value='truck'>Truck</option>
                </Select>
                <Input placeholder='Arrival Date' type='date' name='arrivaldate' onChange={handleInputChange} value={lineData.arrivaldate} />
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
    updateSkuLineErrors: PropTypes.func,
    skuLineIndex: PropTypes.number,
    lineData: PropTypes.shape({
      fgmat: PropTypes.string,
      finalproduct: PropTypes.number,
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