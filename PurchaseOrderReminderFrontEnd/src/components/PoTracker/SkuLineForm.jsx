import { 
    Input,
    Flex,
    Select,
    Button
  } from '@chakra-ui/react'
//import { useEffect } from 'react'
import PropTypes from 'prop-types'

const SkuLineForm = (props) => {
    
    const {handleSkuLineInputChange, skuLineIndex, lineData, deleteFunction} = props

    const handleInputChange = (e) => {
        const {name, value} = e.target
        handleSkuLineInputChange(skuLineIndex, name, value)
    }

    return (
        <>
        <Flex>
                <Select name='fgmat' value={lineData.fgmat} onChange={handleInputChange}>
                    <option value='finishedgoods'>Finished Good</option>
                    <option value='materials'>Materials</option>
                </Select>
                <Input placeholder='Final Product SKU' name='finalproduct' onChange={handleInputChange} value={lineData.finalproduct}/>
            </Flex>
            <Flex>
                <Input placeholder='SKU' name='sku' onChange={handleInputChange} value={lineData.sku} />
                <Input placeholder='Description' name='description' onChange={handleInputChange} value={lineData.description} />
                <Input placeholder='Quantity' name='quantity' onChange={handleInputChange} value={lineData.quantity} />
                <Input placeholder='Price' name='price' onChange={handleInputChange} value={lineData.price} />
                <Input placeholder='Due/Pickup' />
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
    handleSkuLineInputChange: PropTypes.func.isRequired,
    skuLineIndex: PropTypes.number.isRequired,
    lineData: PropTypes.shape({
      fgmat: PropTypes.string.isRequired,
      finalproduct: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      duedate: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      shipmethod: PropTypes.string.isRequired,
      arrivaldate: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired,
    deleteFunction: PropTypes.func.isRequired,
  }

export default SkuLineForm