import PoLineItemForm from './PoLineItemForm'
import PoTrackerContent from './PoTrackerContent'
//import { useEffect } from 'react'
import { useState } from 'react'
import { 
  Text,
  Button
} from '@chakra-ui/react'

const PoTracker = () => {
    const [showForm, setShowForm] = useState(false)
    const [formButtonText, setFormButtonText] = useState('Add PO')

    function handleFormButton (showForm, formButtonText) {
      setShowForm(!showForm)
      if (formButtonText === 'Add PO') {
        setFormButtonText('Cancel')
      } else {
        setFormButtonText('Add PO')
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
      <Button onClick={() => handleFormButton(showForm, formButtonText)}>{formButtonText}</Button>

      {showForm ? ( <PoLineItemForm /> ) : ( <PoTrackerContent /> ) }

      
    </>
    )

}

export default PoTracker