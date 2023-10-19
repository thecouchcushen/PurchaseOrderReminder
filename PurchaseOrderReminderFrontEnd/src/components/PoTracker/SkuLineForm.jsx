/**
 * SkuLineForm.jsx
 * Description: This component renders the form for each individual SKU line as part of the Purchase Order form
 * Author: Liam Cushen
 * Date: 2023-09-01
 */

import { 
    Input,
    Select,
    Button,
    Box,
    Wrap,
    FormControl,
    FormLabel,
    FormErrorMessage,
    WrapItem
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
        <Box p={4}>
            <Wrap spacing={4} justify="space-between">
            <WrapItem flexBasis="calc(50% - 1rem)">
                <FormControl>
                    <FormLabel>Finished Good or Material?</FormLabel>
                    <Select name='fgmat' value={lineData.fgmat} onChange={handleInputChange}>
                        <option value='finishedgoods'>Finished Good</option>
                        <option value='materials'>Materials</option>
                    </Select>
                </FormControl>
            </WrapItem>
                {
                (lineData.fgmat === 'materials') ? (
                <WrapItem flexBasis="calc(50% - 1rem)">
                    <FormControl >
                        <FormLabel>Final Product SKU</FormLabel>
                        <SkuLineFormSkuDropdown name='finalproduct' value={lineData.finalproduct} onChange={handleInputChange} />
                    </FormControl> 
                </WrapItem>
                ) : (
                <WrapItem flexBasis="calc(50% - 1rem)">
                    <Box></Box>
                </WrapItem>
                )
                
                }
                <WrapItem flexBasis="calc(33.33% - 1rem)">
                <FormControl >
                    <FormLabel>SKU</FormLabel>
                    <SkuLineFormSkuDropdown name='sku' value={lineData.sku} onChange={handleInputChange} />
                </FormControl>
                </WrapItem>
                <WrapItem flexBasis="calc(33.33% - 1rem)">

                <FormControl  isInvalid={!!skuErrors.quantity}>
                    <FormLabel>Quantity</FormLabel>
                    <Input placeholder='Quantity' name='quantity' type='number' onChange={handleInputChange} value={lineData.quantity} />
                    <FormErrorMessage>{skuErrors.quantity}</FormErrorMessage>
                </FormControl>
                </WrapItem>
                <WrapItem flexBasis="calc(33.33% - 1rem)">

                <FormControl  isInvalid={!!skuErrors.price}>
                    <FormLabel>Price</FormLabel>
                    <Input placeholder='Price' name='price' type='number' onChange={handleInputChange} value={lineData.price} />
                    <FormErrorMessage>{skuErrors.price}</FormErrorMessage>
                </FormControl>
                </WrapItem>
                <WrapItem flexBasis="calc(33.33% - 1rem)">

                <FormControl  isInvalid={!!skuErrors.duedate}>
                    <FormLabel>SKU Due Date</FormLabel>
                    <Input placeholder='MM/DD/YYYY' name='duedate' onChange={handleInputChange} value={lineData.duedate} />
                    <FormErrorMessage>{skuErrors.duedate}</FormErrorMessage>
                </FormControl>
                </WrapItem>
                <WrapItem flexBasis="calc(33.33% - 1rem)">

                <FormControl  isInvalid={!!skuErrors.destination}>
                    <FormLabel>Destination</FormLabel>
                    <Input placeholder='Destination' name='destination' onChange={handleInputChange} value={lineData.destination} />
                    <FormErrorMessage>{skuErrors.destination}</FormErrorMessage>
                </FormControl>
                </WrapItem>
                <WrapItem flexBasis="calc(33.33% - 1rem)">

                <FormControl >
                    <FormLabel>Shipping Method</FormLabel>
                    <Select name='shipmethod' value={lineData.shipmethod} onChange={handleInputChange}>
                        <option value='sea'>Sea</option>
                        <option value='air'>Air</option>
                        <option value='courier'>Courier</option>
                        <option value='truck'>Truck</option>
                    </Select>
                </FormControl>
                </WrapItem>
                <WrapItem flexBasis="calc(33.33% - 1rem)">

                <FormControl  isInvalid={!!skuErrors.arrivaldate}>
                    <FormLabel>Arrival Date</FormLabel>
                    <Input placeholder='MM/DD/YYYY' name='arrivaldate' onChange={handleInputChange} value={lineData.arrivaldate} />
                    <FormErrorMessage>{skuErrors.arrivaldate}</FormErrorMessage>
                </FormControl>
                </WrapItem>
                <WrapItem flexBasis="calc(33.33% - 1rem)">

                <FormControl>
                    <FormLabel>Status</FormLabel>
                    <Select name='status' value={lineData.status} onChange={handleInputChange}>
                        <option value='placed'>Placed</option>
                        <option value='reviewing'>Reviewing</option>
                        <option value='needsapproval'>Needs Approval</option>
                        <option value='cancelled'>Cancelled</option>
                        <option value='complete'>Complete</option>
                        <option value='enroute'>En Route</option>
                        <option value='delivered'>Delivered</option>
                    </Select>
                </FormControl>
                </WrapItem>
            <WrapItem flexBasis="calc(33% - 1rem)">
                <Button width={"100%"} colorScheme="red" onClick={deleteFunction}>Delete</Button>
            </WrapItem>
            </Wrap>
        </Box>
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