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

const SkuCatalog = () => {
    const [skus, setSkus] = useState([])

    useEffect(() => {
        axios
        .get('http://localhost:3001/skus')
        .then(response => {
          //console.log('promise fulfilled')
          setSkus(response.data)
        })
      }, [])

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