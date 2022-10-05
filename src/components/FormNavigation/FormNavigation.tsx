import React from 'react'
import { Button, Box } from '@mui/material'
import { FormikValues } from 'formik'

interface Props {
  isLastStep: boolean
  onBackClick: (values: FormikValues) => void
  hasPrevious?: boolean
}

const FormNavigation = ({ isLastStep, hasPrevious, onBackClick }: Props) => {
  return (
    <Box display='flex' justifyContent='space-between' pt={2}>
      {hasPrevious && (
        <Button variant='outlined' onClick={onBackClick}>
          Back
        </Button>
      )}
      {
        <Button type='submit' variant='contained'>
          {isLastStep ? 'Submit' : 'Continue'}
        </Button>
      }
    </Box>
  )
}

export default FormNavigation
