/**
 * PoTracker.jsx
 * Description: This component renders the Purchase Order Tracker at a high level and calls PoLine for each Purchase Order and form to add a new PO or update an existing PO
 * Author: Liam Cushen
 * Date: 2023-09-01
 */

import PoLineItemForm from './PoLineItemForm'
import PoTrackerContent from './PoTrackerContent'
//import { useEffect } from 'react'
import { useState } from 'react'
import { 
  Text,
  Button
} from '@chakra-ui/react'

const PoTracker = () => {
  //initialize state variables
    const [selectedPo, setSelectedPo] = useState(null)
    const [isAddingPo, setIsAddingPo] = useState(false)

    //Handles the edit button on each PO with state changes necessary to render the form
    const handleEditPo = (poData) => {
      setIsAddingPo(true)
      setSelectedPo(poData)
    }

    //Handles the add button state changes
    const handleAddButton = () => {

      if (isAddingPo) {
        setIsAddingPo(false)
        setSelectedPo(null)
      } else {
        setIsAddingPo(true)
      }
      
    }
    //Render the PO Tracker
    return (
    <>
      <Text
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        fontSize='6xl'
        fontWeight='extrabold'
      >
        PO Tracker
      </Text>
      <Button onClick={handleAddButton}>{isAddingPo ? 'Cancel' : 'Add PO'}</Button>

      {isAddingPo ? <PoLineItemForm setIsAddingPo={setIsAddingPo} editedData={selectedPo} isEditMode={!!selectedPo} /> : <PoTrackerContent handleEditPo={handleEditPo} />}

    </>
    )

}

export default PoTracker