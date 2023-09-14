/**
 * SkuCatalog.js
 * Description: This component renders the SKU Catalog at a high level and calls SkuLine for each SKU
 * Author: Liam Cushen
 * Date: 2023-09-01
 */

import { useEffect, useState } from "react"
import SkuLine from "./SkuLine"
import axios from 'axios'
import { 
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption,
    TableContainer,
    Text
  } from '@chakra-ui/react'

//TODO: Implement filters
//TODO: Implement delete sku capability
//TODO: Implement edit/add sku capability

const SkuCatalog = () => {
    //Initialize state variables
    const [skus, setSkus] = useState([])

    //Use axios to get the SKU data from the backend
    useEffect(() => {
        axios
        .get('http://localhost:3001/skus')
        .then(response => {
          //console.log('promise fulfilled')
          setSkus(response.data)
        })
      }, [])

      //Render the SKU Catalog
      return (
        <>
            <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='6xl'
            fontWeight='extrabold'
            >
            SKU Catalog
            </Text>
            <TableContainer>
                <Table>
                    <TableCaption>SKU Catalog</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>SKU</Th>
                            <Th>Description</Th>
                            <Th>Unit</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {skus.map(sku => <SkuLine sku={sku} key={'Sku' + sku.id} />
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
      )
}

export default SkuCatalog