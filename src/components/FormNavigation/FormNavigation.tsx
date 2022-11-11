import React from 'react'
import { Button, Box } from '@mui/material'
import { FormikValues, FormikProps } from 'formik'

interface Props extends FormikProps<FormikValues> {
  isLastStep: boolean
  onBackClick: (values: FormikValues) => void
  hasPrevious?: boolean
}

const FormNavigation = ({
  isLastStep,
  hasPrevious,
  onBackClick,
  isValid,
  isSubmitting,
  isValidating
}: Props) => {
  return (
    <Box display='flex' justifyContent='space-between' pt={2}>
      {hasPrevious && (
        <Button variant='outlined' onClick={onBackClick}>
          Back
        </Button>
      )}
      {
        <Button
          type='submit'
          variant='contained'
          disabled={!isValid || isSubmitting || isValidating}
        >
          {isLastStep ? 'Submit' : 'Continue'}
        </Button>
      }
    </Box>
  )
}

export default FormNavigation
