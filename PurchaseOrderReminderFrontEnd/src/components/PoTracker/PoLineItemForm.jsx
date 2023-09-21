/**
 * PoLineItemForm.jsx
 * Description: This component renders the form to add a new Purchase Order or update an existing Purchase Order and calls the form for each individual SKU line
 * Author: Liam Cushen
 * Date: 2023-09-01
 */

import { 
    Input,
    Button,
    Card,
    FormControl
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import SkuLineForm from './SkuLineForm'
import PropTypes from 'prop-types'
import polineitems from '../../services/polineitems'

const blankLine = {
    
    fgmat: '',
    finalproduct: '',
    sku: '',
    description: '',
    quantity: 0,
    price: 0,
    duedate: '',
    destination: '',
    shipmethod: '',
    arrivaldate: '',
    status: ''
    
}

const initialState = {
    ponumber: '',
    placed: '',
    supplier: '',
    currency: '',
    podescription: '',
    lineitems: [
        blankLine
    ]
}

const PoLineItemForm = (props) => {
    //initialize state variables
    const [formData, setFormData] = useState(initialState)
    const [numberOfSkus, setNumberOfSkus] = useState(1)

    const {editedData, isEditMode, setIsAddingPo} = props

    //Set the form data to the edited data if in edit mode, otherwise set it to the initial state
    useEffect(() => {
        if (isEditMode) {
            //console.log(editedData)
            setFormData(editedData)
            setNumberOfSkus(editedData.lineitems.length)
        } else {
            setFormData(initialState)
            setNumberOfSkus(initialState.lineitems.length)
        }
    }, [isEditMode, editedData])

    //Handle the input change for the form for each input field
    const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }))
    }
    //Handle the add SKU line button which adds another sku line
    const handleAddSkuLine = () => {
        setNumberOfSkus(numberOfSkus + 1)
        setFormData((prevData) => ({
          ...prevData,
          lineitems: [...prevData.lineitems, blankLine],
        }))
    }
    //Handle the delete SKU line button which deletes a sku line
    const handleSkuLineDelete = (index) => {
        let skusWithoutDeletedSku = formData.lineitems
        skusWithoutDeletedSku.splice(index, 1)
        setFormData((prevData) => ({
        ...prevData,
        lineitems: skusWithoutDeletedSku,
    }))
    }
    //Handle the input change for the form for each SKU line (passed to the SKU line form)
    const handleSkuLineInputChange = (index, name, value) => {
        // Create a copy of the lines array with the updated SKU line at the specified index
        const updatedLines = formData.lineitems.map((line, i) => {
          if (i === index) {
            return {
              ...line,
              [name]: value,
            }
          }
          return line;
        })
    
        setFormData((prevData) => ({
          ...prevData,
          lineitems: updatedLines,
        }))
      }

    const handleSubmit = () => {
    //e.preventDefault()
    
    // Handle form submission logic
    if (isEditMode) {
        // Handle update logic using formData
        // For example, make an API PUT/PATCH request
        polineitems.update(formData.id, formData)
        console.log(formData)
        setIsAddingPo(false)
    } else {
        // Handle new entry logic using formData
        // For example, make an API POST request
        polineitems.create(formData)
        console.log(formData)
        setIsAddingPo(false)
    }
    }

    //Render the Purchase Order Form
    //TODO: Implement form validation
      //typerror message thrown when quantity in price or quantity becomes 0 because it is reading a string when it can only be a number
      //make it so that the suppliers/currency/sku/finalsku/destination must be pulled from existing entries in a database
      //Cast quantity and price to numbers
    //TODO: Make the form look better
    //TODO: Make skus//suppliers a dropdown menu that is populated from the database
    return (
        <>
        <Card>
            <FormControl>
                <Input maxWidth={'50%'} margin={'2'} placeholder='PO' type='text' name='ponumber' value={formData.ponumber} onChange={handleInputChange}/>
                
                <Input maxWidth={'50%'} margin={'2'} placeholder='Placed' type='date' name='placed' value={formData.placed} onChange={handleInputChange} />
                <Input maxWidth={'50%'} margin={'2'} placeholder='Supplier' type='text' name='supplier' value={formData.supplier} onChange={handleInputChange}/>
                <Input maxWidth={'10%'} margin={'2'} placeholder='Currency' type='text' name='currency' value={formData.currency} onChange={handleInputChange} />
                <Input maxWidth={'50%'} margin={'2'} placeholder='Description' type='text' name='podescription' value={formData.podescription} onChange={handleInputChange}/>

                <Button maxWidth={'30%'} margin={5} onClick={handleAddSkuLine}>Add SKU Line</Button>

                {formData.lineitems.map((lineData, i) => <SkuLineForm key={'SkuLine' + i} skuLineIndex={i} lineData={lineData} setFormData={setFormData} handleSkuLineInputChange={handleSkuLineInputChange} deleteFunction={() => handleSkuLineDelete(i)} />
                )}
                
                <Button maxWidth={'30%'} margin={5} type='submit' onClick={handleSubmit}>{isEditMode ? "Update" : "Create"}</Button>
            
            </FormControl>
        </Card>
        </>    
    )
}

PoLineItemForm.propTypes = {
    isEditMode: PropTypes.bool.isRequired,
    setIsAddingPo: PropTypes.func.isRequired,
    editedData: PropTypes.shape({
      ponumber: PropTypes.string,
      placed: PropTypes.string,
      supplier: PropTypes.string,
      currency: PropTypes.string,
      description: PropTypes.string,
      lineitems: PropTypes.arrayOf(
        PropTypes.shape({
          fgmat: PropTypes.string,
          finalproduct: PropTypes.string,
          sku: PropTypes.string,
          description: PropTypes.string,
          quantity: PropTypes.number,
          price: PropTypes.number,
          duedate: PropTypes.string,
          destination: PropTypes.string,
          shipmethod: PropTypes.string,
          arrivaldate: PropTypes.string,
          status: PropTypes.string,
        })
      ),
    }),
}
  

export default PoLineItemForm