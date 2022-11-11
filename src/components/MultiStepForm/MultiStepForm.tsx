/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  Children,
  ReactNode,
  ReactElement,
  useMemo,
  useEffect
} from 'react'
import {
  FormikConfig,
  FormikValues,
  Formik,
  Form,
  FormikHelpers,
  useFormikContext
} from 'formik'
import FormNavigation from '../FormNavigation/FormNavigation'
import { Stepper, Step, StepLabel } from '@mui/material'

interface FormStepProps
  extends Pick<FormikConfig<FormikValues>, 'onSubmit' | 'validationSchema'> {
  stepName: string
  children: any
}

export const FormStep = ({ children }: FormStepProps) => {
  const { setTouched } = useFormikContext()

  useEffect(() => {
    setTouched({})
    return () => {
      setTouched({})
    }
  }, [])

  return children
}

interface MultiStepFormProps extends FormikConfig<FormikValues> {
  children: ReactNode
}

const MultiStepForm = ({
  children,
  initialValues,
  onSubmit
}: MultiStepFormProps) => {
  const [stepNumber, setStepNumber] = useState(0)
  const [snapshot, setSnapshot] = useState(initialValues) // save value between steps

  const steps = Children.toArray(children) as ReactElement<FormStepProps>[] // then add a success screen to the array of steps

  const StepComponent = steps[stepNumber]
  const TOTAL_STEPS = steps.length
  const IS_LAST_STEP = stepNumber === TOTAL_STEPS - 1
  const memoizedSchema = useMemo(
    () => StepComponent.props.validationSchema,
    [StepComponent.props.validationSchema]
  )
  const nextStep = (values: FormikValues) => {
    setSnapshot(values)
    setStepNumber(stepNumber + 1)
  }

  const previousStep = (values: FormikValues) => {
    setSnapshot(values)
    setStepNumber(stepNumber - 1)
  }

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    // In case the step has its own onSubmit
    // we pass the values
    if (StepComponent.props.onSubmit)
      await StepComponent.props.onSubmit(values, actions)

    // Perform the last step
    if (IS_LAST_STEP) onSubmit(values, actions)
    else {
      actions.setTouched({})
      nextStep(values)
    }
  }

  return (
    <div>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={memoizedSchema}
        validateOnMount
      >
        {(formikProps) => {
          console.log({ state: StepComponent.props.stepName, ...formikProps })

          return (
            <Form>
              <Stepper activeStep={stepNumber} style={{ marginBottom: 30 }}>
                {steps.map((step) => {
                  const label = step.props.stepName
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
              {StepComponent}
              <FormNavigation
                isLastStep={IS_LAST_STEP}
                onBackClick={() => previousStep(formikProps.values)}
                hasPrevious={stepNumber > 0}
                {...formikProps}
              />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default MultiStepForm
