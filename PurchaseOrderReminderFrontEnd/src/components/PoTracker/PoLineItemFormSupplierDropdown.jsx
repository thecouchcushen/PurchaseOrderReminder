import { 
    Select
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import suppliers from '../../services/suppliers'
import PropTypes from 'prop-types'

const PoLineItemFormSupplierDropdown = (props) =>  {
    const {name, value, onChange} = props

    const [supplierList, setSupplierList] = useState([])

    useEffect(() => {
        suppliers.getAll().then(initialSuppliers => {
            setSupplierList(initialSuppliers)
        })
    }, [])

    return (
        <Select name={name} value={value} onChange={onChange}>
            {supplierList.map(supplier => <option key={supplier.id} value={supplier.id}>{supplier.name}</option>)}
        </Select>
    )

}

PoLineItemFormSupplierDropdown.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

export default PoLineItemFormSupplierDropdown