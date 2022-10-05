import React from 'react'
import { Box } from '@mui/material'
import './App.css'
import * as yup from 'yup'
import InputField from './components/InputField/InputField'
import MultiStepForm, {
  FormStep
} from './components/MultiStepForm/MultiStepForm'

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required')
})

const validationSchemaStep2 = yup.object({
  test3: yup.string().required('Test3 is required'),
  test4: yup.string().required('Test4 is required')
})

function App() {
  return (
    <div className='App'>
      <h1>Multi step form</h1>
      <Box display='flex' justifyContent='center'>
        <MultiStepForm
          initialValues={{
            name: '',
            address: '',
            test3: '3',
            test4: '4'
          }}
          onSubmit={(values) => console.log(values)}
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
        </MultiStepForm>
      </Box>
    </div>
  )
}

export default App
