import { useEffect, useState } from "react"
import SupplierLine from "./SupplierLine"
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

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {
        axios
        .get('http://localhost:3001/suppliers')
        .then(response => {
          //console.log('promise fulfilled')
          setSuppliers(response.data)
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
            PO Tracker
            </Text>
            <TableContainer>
                <Table>
                    <TableCaption>Supplier List</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Supplier Name</Th>
                            <Th>Deposit %</Th>
                            <Th>Balance %</Th>
                            <Th>Balance Due __ Days After Pickup</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {suppliers.map(supplier => <SupplierLine supplier={supplier} key={'Supplier' + supplier.id} />
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
      )
}

export default SupplierList