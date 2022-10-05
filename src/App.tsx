import React, { useState } from 'react'
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody
} from '@mui/material'
import './App.css'
import * as yup from 'yup'
import InputField from './components/InputField/InputField'
import MultiStepForm, {
  FormStep
} from './components/MultiStepForm/MultiStepForm'
import { FormikValues } from 'formik'

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required')
})

const validationSchemaStep2 = yup.object({
  test3: yup.string().required('Test3 is required'),
  test4: yup.string().required('Test4 is required')
})

const validationSchemaStep3 = yup.object({
  test5: yup.string().required('Test5 is required'),
  test6: yup.string().required('Test6 is required')
})

const validationSchemaStep4 = yup.object({
  test7: yup.string().required('Test7 is required'),
  test8: yup.string().required('Test8 is required')
})

function App() {
  const [data, setData] = useState<FormikValues | undefined>(undefined)

  return (
    <div className='App'>
      <h1>Multi step form</h1>
      <Box display='flex' justifyContent='center' flex={1}>
        <MultiStepForm
          initialValues={{
            name: '',
            address: '',
            test3: '3',
            test4: '4',
            test5: '',
            test6: '',
            test7: '',
            test8: ''
          }}
          onSubmit={(values) => {
            console.log(values)
            setData(values)
          }}
        >
          <FormStep
            stepName='Step 1'
            onSubmit={() => console.log('Step 1')}
            validationSchema={validationSchema}
          >
            <InputField label='Name' name='name' />
            <InputField label='Address' name='address' />
          </FormStep>
          <FormStep
            stepName='Step 2'
            onSubmit={() => console.log('Step 2')}
            validationSchema={validationSchemaStep2}
          >
            <InputField label='Test3' name='test3' />
            <InputField label='Test4' name='test4' />
          </FormStep>
          <FormStep
            stepName='Step 3'
            onSubmit={() => console.log('Step 3')}
            validationSchema={validationSchemaStep3}
          >
            <InputField label='Test5' name='test5' />
            <InputField label='Test6' name='test6' />
          </FormStep>
          <FormStep
            stepName='Step 4'
            onSubmit={() => console.log('Step 4')}
            validationSchema={validationSchemaStep4}
          >
            <InputField label='Test7' name='test7' />
            <InputField label='Test8' name='test8' />
          </FormStep>
        </MultiStepForm>
      </Box>
      {data ? (
        <Box mt={5} display='flex' justifyContent='center' flex={1}>
          <TableContainer component={Paper} style={{ width: 900 }}>
            <Table
              sx={{ minWidth: 650 }}
              size='small'
              aria-label='a dense table'
            >
              <TableHead>
                <TableRow>
                  {Object.keys(data).map((key) => {
                    return <TableCell align='right'>{key}</TableCell>
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.values(data).map((value, i) => {
                    return <TableCell>{value}</TableCell>
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : null}
    </div>
  )
}

export default App
