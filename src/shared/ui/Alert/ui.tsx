import React, { FC } from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

import { AlertProps } from './model/types';

const AlertWarning: FC<AlertProps> = ({
  isOpen,
  vertical = 'top',
  horizontal = 'center',
  isSuccess,
  onClose
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={isOpen}
      autoHideDuration={500}
      onClose={onClose}
    >
      {isSuccess ? (
        <Alert
          variant='filled'
          severity='success'
          sx={{
            width: '600px'
          }}
        >
          You won
        </Alert>
      ) : (
        <Alert
          variant='filled'
          severity='error'
          sx={{
            width: '600px'
          }}
        >
          <AlertTitle>You lost</AlertTitle>
          Number was higher
        </Alert>
      )}
    </Snackbar>
  );
};

export { AlertWarning };
