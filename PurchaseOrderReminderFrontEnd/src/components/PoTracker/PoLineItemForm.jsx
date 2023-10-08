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
    FormControl,
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import SkuLineForm from './SkuLineForm'
import PropTypes from 'prop-types'
import polineitems from '../../services/polineitems'
import PoLineItemFormSupplierDropdown from './PoLineItemFormSupplierDropdown'

const blankLine = {
    
    fgmat: '',
    finalproduct: 1,
    sku: 1,
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
    supplier: 1,
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
    const [formErrors, setFormErrors] = useState({})

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

    //Check if the PO Number is unique
    const checkUniqueNessOfPoNumber = async (poNumber) => {

      const initialPoLineItems = await polineitems.getAll()
      const poNumbers = initialPoLineItems.map(poLineItem => poLineItem.ponumber)
  
      return !poNumbers.includes(poNumber)

    }

    //Validate the fields of the form
    const validateFields = async (fieldName, value) => {
      const errors = { ...formErrors }

      switch (fieldName) {
        case 'placed':
          if (/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/((19|20)\d\d)/.test(value)) {
            errors[fieldName] = 'PO Placement Date must be in the format MM/DD/YYYY'
          } else {
            delete errors[fieldName]
          }
          break
        case 'currency':
            if (typeof(value) !== "string" || value.length !== 3) {
              errors[fieldName] = 'Currency must be 3 characters for the ISO 4217 currency code'
            } else {
              delete errors[fieldName]
            }
            break
        case 'podescription':
          if (typeof(value) !== "string") {
            errors[fieldName] = 'PO Description must be a string'
          } else {
            delete errors[fieldName]
          }
          break
        case 'ponumber':
          if (typeof(value) !== "string" || (await checkUniqueNessOfPoNumber(value) === false && isEditMode === false) || (isEditMode === true && value !== editedData.ponumber)) {
            errors[fieldName] = 'PO Number must be a unique string'
          } else {
            delete errors[fieldName]
          }
          break


        default:
          break
      }

      setFormErrors(errors)
    }

    //Handle the input change for the form for each input field
    const handleInputChange = (e) => {
    const { name, value } = e.target
    //If the name is supplier, cast the value to an integer and not a string
    if (name === 'supplier') {
        setFormData((prevData) => ({
            ...prevData,
            [name]: parseInt(value),
        }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }))
    validateFields(name, value)
    }
    
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
    console.log(formErrors)
    if (Object.keys(formErrors).length > 0) {
      console.log(formErrors)
      return;

    } else {
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
    // Handle form submission logic
    
    }

    //Render the Purchase Order Form
    //TODO: Implement form validation
      //typerror message thrown when quantity in price or quantity becomes 0 because it is reading a string when it can only be a number
      //make it so that the suppliers/currency/sku/finalsku/destination must be pulled from existing entries in a database
      //Cast quantity and price to numbers
    //TODO: Make the form look better
    return (
        <>
        <Card>
            <FormControl>
                <Input maxWidth={'50%'} margin={'2'} placeholder='PO' type='text' name='ponumber' value={formData.ponumber} onChange={handleInputChange}/>
                
                <Input maxWidth={'50%'} margin={'2'} placeholder='Placed' type='date' name='placed' value={formData.placed} onChange={handleInputChange} />
                
                <PoLineItemFormSupplierDropdown name='supplier' value={formData.supplier} onChange={handleInputChange}/>
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
      supplier: PropTypes.number,
      currency: PropTypes.string,
      description: PropTypes.string,
      lineitems: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
      ),
    }),
}
  

export default PoLineItemForm