/**
 * SupplierList.jsx
 * Description: This component renders the Supplier List
 * Author: Liam Cushen
 * Date: 2023-09-01
 */


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
    //Initialize state variables
    const [suppliers, setSuppliers] = useState([])

    //Use axios to get the Supplier data from the backend
    useEffect(() => {
        axios
        .get('http://localhost:3001/suppliers')
        .then(response => {
          //console.log('promise fulfilled')
          setSuppliers(response.data)
        })
      }, [])

    //Render the Supplier List
    return (
    <>
        <Text
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        fontSize='6xl'
        fontWeight='extrabold'
        >
        Suppliers
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