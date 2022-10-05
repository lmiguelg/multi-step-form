import React from 'react'
import { FieldConfig, useField } from 'formik'
import { TextField } from '@mui/material'

interface Props extends FieldConfig {
  label: string
}

const InputField = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props as any)

  return (
    <TextField
      variant='outlined'
      fullWidth
      label={label}
      {...field}
      {...(props as any)}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      style={{ marginTop: 4, marginBottom: 4 }}
    />
  )
}

export default InputField
