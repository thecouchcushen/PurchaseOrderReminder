import PoLineItemForm from './PoLineItemForm'
import PoTrackerContent from './PoTrackerContent'
//import { useEffect } from 'react'
import { useState } from 'react'
import { 
  Text,
  Button
} from '@chakra-ui/react'


const PoTracker = () => {
    const [selectedPo, setSelectedPo] = useState(null)
    const [isAddingPo, setIsAddingPo] = useState(false)

    const handleEditPo = (poData) => {
      setIsAddingPo(true)
      setSelectedPo(poData)
    }

    const handleAddButton = () => {

      if (isAddingPo) {
        setIsAddingPo(false)
        setSelectedPo(null)
      } else {
        setIsAddingPo(true)
      }
      
    }

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

      {isAddingPo ? <PoLineItemForm editedData={selectedPo} isEditMode={!!selectedPo} /> : <PoTrackerContent handleEditPo={handleEditPo} />}

      

    </>
    )

}

export default PoTracker