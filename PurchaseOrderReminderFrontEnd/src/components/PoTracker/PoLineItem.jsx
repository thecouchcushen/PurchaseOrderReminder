import { useEffect } from "react"
import {
    Tr,
    Td
} from '@chakra-ui/react'

const PoLineItem = (propsObject) => {
    const lineToDisplay = propsObject.line
    useEffect(() => {
        //console.log(lineToDisplay)
        //console.log(lineToDisplay.currency)
    })

    return (
        <>
            <Tr>
                <Td>{lineToDisplay.ponumber}</Td>
                <Td>{lineToDisplay.sku}</Td>
                <Td>{lineToDisplay.description}</Td>
                <Td>{lineToDisplay.supplier}</Td>
                <Td>{lineToDisplay.quantity}</Td>
                <Td>{lineToDisplay.price}</Td>
                <Td>{lineToDisplay.currency}</Td>
                <Td>{lineToDisplay.duedate}</Td>
            </Tr>
        </>
    )
}

export default PoLineItem