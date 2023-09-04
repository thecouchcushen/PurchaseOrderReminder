import { useEffect, useState } from "react"
import {
    Tr,
    Td
} from '@chakra-ui/react'

const PoLine = (propsObject) => {
    const poToDisplay = propsObject.line
    const [poValue, setPoValue] = useState(0)

    useEffect(() => {
        var totalPoValueAccumulator = 0
        poToDisplay.lineitems.forEach(line => {
            totalPoValueAccumulator += line.price*line.quantity
        })
        setPoValue(totalPoValueAccumulator)
    }, [poToDisplay.lineitems])
    
    
    return (
        <>
            <Tr>
                <Td>{poToDisplay.placed}</Td>
                <Td>{poToDisplay.ponumber}</Td>
                <Td>{poToDisplay.podescription}</Td>
                <Td>{poToDisplay.supplier}</Td>
                <Td>{poValue}</Td>
                <Td>{poToDisplay.currency}</Td>
                <Td>{poToDisplay.destination}</Td>
            </Tr>
        </>
    )
}

export default PoLine