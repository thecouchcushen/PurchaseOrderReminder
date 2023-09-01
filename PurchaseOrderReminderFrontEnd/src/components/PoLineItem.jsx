import { useEffect } from "react"

const PoLineItem = (propsObject) => {
    const lineToDisplay = propsObject.line
    useEffect(() => {
        console.log(lineToDisplay)
        //console.log(lineToDisplay.currency)
    })

    return (
        <>
            <tr>
                <td>{lineToDisplay.ponumber}</td>
                <td>{lineToDisplay.sku}</td>
                <td>{lineToDisplay.description}</td>
                <td>{lineToDisplay.supplier}</td>
                <td>{lineToDisplay.quantity}</td>
                <td>{lineToDisplay.price}</td>
                <td>{lineToDisplay.currency}</td>
                <td>{lineToDisplay.duedate}</td>
            </tr>
        </>
    )
}

export default PoLineItem