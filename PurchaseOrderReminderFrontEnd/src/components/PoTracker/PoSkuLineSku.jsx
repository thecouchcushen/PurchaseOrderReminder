import skus from '../../services/skus'
import {useState, useEffect} from 'react'
import {
    Td,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const PoSkuLineSku = (props) => {
    const [sku, setSku] = useState('')

    useEffect(() => {
        skus.getAll().then(initialSkus => {
            setSku(initialSkus.filter(sku => sku.id === props.skuId)[0])})
        }, [])
    
    return (
        <Td>{sku.sku}</Td>
    )
    
}

PoSkuLineSku.propTypes = {
    skuId: PropTypes.number.isRequired
}

export default PoSkuLineSku