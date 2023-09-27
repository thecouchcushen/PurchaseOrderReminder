import PropTypes from 'prop-types'
import {
    Td,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import suppliers from '../../services/suppliers'

const PoLineSupplier = (props) => {
    const {supplierId} = props
    const [supplier, setSupplier] = useState('')

    useEffect(() => {
        suppliers.getAll().then(initialSuppliers => {
            setSupplier(initialSuppliers.filter(supplier => supplier.id === supplierId)[0])})
        }, [])

    return (
        <Td>{supplier.name}</Td>
    )
}

PoLineSupplier.propTypes = {
    supplierId: PropTypes.number.isRequired
}

export default PoLineSupplier