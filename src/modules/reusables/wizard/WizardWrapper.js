import React, { useState, useMemo, useCallback } from 'react';
import Card from '@mui/material/Card';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import Container from '@mui/material/Container';
import StepButton from '@mui/material/StepButton';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
export default function WizardWrapper ({
  maxWidth='md', // can be a number of pixels or xs sm md lg xlg etc
  steps, //a format of [{title: 'Step Title 1', isAsync: true, required: false }, {title: 'Step Title 2', isAsync: false, requiredTrue }]
  isLoading, //if step is async, is it loading?
  onFinish, // a function that will be called without any parameters when the form is finished (usually used to close the form or redirect)
  onNextCallback, //a function that is fired when handleNext is called
  onPrevCallback, //a function that is fired when handlePrev is called
  children, // automatically passed in by react, don't worry about this.
}) {

  const [ index, setIndex ] = useState(0);

  const handleNextIndex = useCallback(() => {
    if (onNextCallback) {
      onNextCallback();
    }

    setIndex(index + 1)
  }, [index, setIndex]);

  const handlePrevIndex = useCallback(() => {
    if (onPrevCallback) {
      onPrevCallback();
    }

    setIndex(index - 1)
  }, [index, onPrevCallback])

  const handleAnyIndex = useCallback((i) => {
    setIndex(i);
  }, []);

  const cardActions = useMemo(() => {
    if (index === 0 && steps.length >= 2) {
      return (
        <Stack
          spacing={ 'sm' }
          justifyContent={ 'center' }
          alignItems={ 'center' }
          direction={ 'row' }
        >
          <Button
            variant={ 'contained' }
            onClick={() => handleNextIndex() }
          >
            Next
          </Button>
        </Stack>
      )
    } else if (index !== 0 && steps.length !== index + 1) {
      return (
      <Stack
        spacing={ 3 }
        justifyContent={ 'center' }
        alignItems={ 'center' }
        direction={ 'row' }
      >
        <Button
          variant={ 'contained' }
          onClick={() => handlePrevIndex()}
        >
          Previous
        </Button>
        <Button
          variant={ 'contained' }
          onClick={() => handleNextIndex()}
        >
          Next
        </Button>
      </ Stack>
      )
    } else if (index + 1 === steps.length) {
      return (
        <Stack
          spacing={ 3 }
          justifyContent={ 'center' }
          alignItems={ 'center' }
          direction={ 'row' }
        >
          { steps.length >= 2 ? (
            <Button
              variant={ 'contained' }
              onClick={() => handlePrevIndex()}
            >
              Previous
            </Button>
          ) : null }
          <Button
            variant={ 'contained' }
            onClick={() => onFinish()}
          >
            Finish
          </Button>
        </ Stack>
      )
    }
  }, [index, steps, handleNextIndex, handlePrevIndex, onFinish]);

  const steppers = useMemo(() => steps.length > 1 && (
    <>
      <Stepper
        sx={{
          py: 2,
          my: 2
        }}
        nonLinear
        activeStep={index}
      >
      {steps.map((stepObj, i) => (
        <Step
          key={ stepObj.title }
          completed={ index > i }
        >
          <StepButton 
            color="inherit"
            onClick={() => handleAnyIndex(i)}
          >
            { stepObj.title }
          </StepButton>
        </Step>
      ))}
    </Stepper>
    <Divider />
  </>
  ), [steps, index, handleAnyIndex]);

  return (
    <Container
      maxWidth={ maxWidth }
    >
      <Card
        sx={{
          maxWidth,
        }}
        raised={ true }
      >
      <CardContent>
        { steppers }
        { children }
        <Divider />
      </CardContent>
      <CardActions
        sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}
      >
          { cardActions }
      </CardActions>
      </Card>
    </Container>
  )
}