import { 
    Input,
    Button,
    Card,
    Flex,
    Select,
    FormControl
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const initialState = {
    ponumber: '',
    placed: '',
    supplier: '',
    currency: '',
    description: '',
    lines: []
}

const PoLineItemForm = (props) => {
    const [formData, setFormData] = useState(initialState)
    const {isEditMode, editedData} = props

    useEffect(() => {
        if (isEditMode) {
            setFormData(editedData)
        } else {
            setFormData(initialState)
        }
    }, [isEditMode, editedData])

    const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
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
            <Input maxWidth={'50%'} margin={'2'} placeholder='Description' type='text' name='description' value={formData.description} onChange={handleInputChange}/>
            <Flex>
                <Select>
                    <option value='finishedgoods'>Finished Good</option>
                    <option value='materials'>Materials</option>
                </Select>
                <Input placeholder='Final Product SKU' />
            </Flex>
            <Flex>
                <Input placeholder='SKU' />
                <Input placeholder='Description' />
                <Input placeholder='Quantity' />
                <Input placeholder='Price' />
                <Input placeholder='Due/Pickup' />
            </Flex>
            <Flex>
                <Input placeholder='Destination' />
                <Select>
                    <option value='sea'>Sea</option>
                    <option value='air'>Air</option>
                    <option value='courier'>Courier</option>
                    <option value='truck'>Truck</option>
                </Select>
                <Input placeholder='Arrival Date' />
                <Select>
                    <option value='placed'>Placed</option>
                    <option value='reviewing'>Reviewing</option>
                    <option value='needsapproval'>Needs Approval</option>
                    <option value='cancelled'>Cancelled</option>
                    <option value='complete'>Complete</option>
                    <option value='enroute'>En Route</option>
                    <option value='delivered'>Delivered</option>
                </Select>
            </Flex>
            <Button maxWidth={'30%'} margin={5} type='submit' onClick={() => handleSubmit}>{isEditMode ? "Update" : "Create"}</Button>
            </FormControl>
        </Card>
        </>    
    )
}

export default PoLineItemForm