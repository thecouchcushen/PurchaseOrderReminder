import { useState, useEffect } from 'react'
import { Select } from '@chakra-ui/react'
import skus from '../../services/skus'
import PropTypes from 'prop-types'

const SkuLineFormSkuDropdown = (props) =>  {

    const {name, value, onChange} = props

    const [skuList, setSkuList] = useState([])

    useEffect(() => {
        skus.getAll().then(initialSkus => {
            setSkuList(initialSkus)
            //console.log(initialSkus)
        })
    }, [])


    return (
        <Select name={name} value={value} onChange={onChange}>
            {skuList.map(sku => <option key={sku.id} value={sku.id}>{sku.sku}</option>)}
        </Select>
    )


}

SkuLineFormSkuDropdown.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };


export default SkuLineFormSkuDropdown