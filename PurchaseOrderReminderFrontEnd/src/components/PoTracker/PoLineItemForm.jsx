import { 
    Input,
    Button,
    Card,
    FormControl
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import SkuLineForm from './SkuLineForm'
import PropTypes from 'prop-types'

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
    const [formData, setFormData] = useState(initialState)
    const [numberOfSkus, setNumberOfSkus] = useState(1)

    const {editedData, isEditMode} = props

    //useEffect(() => {
    //    console.log(formData)
    //}, [formData])

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

    const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }))
    }

    const handleAddSkuLine = () => {
        setNumberOfSkus(numberOfSkus + 1)
        setFormData((prevData) => ({
          ...prevData,
          lineitems: [...prevData.lineitems, blankLine],
        }))
    }

    const handleSkuLineDelete = (index) => {
        let skusWithoutDeletedSku = formData.lineitems
        skusWithoutDeletedSku.splice(index, 1)
        setFormData((prevData) => ({
        ...prevData,
        lineitems: skusWithoutDeletedSku,
    }))
    }

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
    
    if (isEditMode) {
        // Handle update logic using formData
        // For example, make an API PUT/PATCH request
        console.log(formData)
    } else {
        // Handle new entry logic using formData
        // For example, make an API POST request
        console.log(formData)
    }
    }

    return (
        <>
        <Card>
            <FormControl>
                <Input maxWidth={'50%'} margin={'2'} placeholder='PO' type='text' name='ponumber' value={formData.ponumber} onChange={handleInputChange}/>
                
                <Input maxWidth={'50%'} margin={'2'} placeholder='Placed' type='date' name='placed' value={formData.placed} onChange={handleInputChange} />
                <Input maxWidth={'50%'} margin={'2'} placeholder='Supplier' type='text' name='supplier' value={formData.supplier} onChange={handleInputChange}/>
                <Input maxWidth={'10%'} margin={'2'} placeholder='Currency' type='text' name='currency' value={formData.currency} onChange={handleInputChange} />
                <Input maxWidth={'50%'} margin={'2'} placeholder='Description' type='text' name='description' value={formData.podescription} onChange={handleInputChange}/>

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