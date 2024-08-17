'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { purple } from '@mui/material/colors';

import { AlertWarning } from '@/shared/ui/Alert';
import { Each } from '@/shared/utils/each/each';

import styles from './ui.module.scss';

const DiceGame: React.FC = () => {
  const sliderMarks = Array.from({ length: 11 }, (_, i) => ({
    value: i * 10,

    label: i * 10 === 100 ? '100' : ''
  }));

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [selectedValue, setSelectedValue] = useState<number>(0);

  const [choice, setChoice] = useState<'under' | 'over'>('under');

  const [history, setHistory] = useState<
    {
      time: string;
      result: number;
      guess: string;
      success: boolean;
    }[]
  >([]);

  const playGame = () => {
    const randomResult = Math.floor(Math.random() * 100) + 1;

    const success =
      choice === 'under'
        ? randomResult > selectedValue
        : randomResult < selectedValue;

    setHistory((prevHistory) => [
      ...prevHistory,
      {
        time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
        result: randomResult,
        guess: `${choice} ${selectedValue}`,
        success
      }
    ]);

    setIsSuccess(success);
    setIsOpen(true);
  };

  const onClose = () => setIsOpen(false);

  return (
    <>
      <AlertWarning
        isOpen={isOpen}
        onClose={onClose}
        isSuccess={isSuccess}
      />

      <Box>
        <div className={styles.selectedValueBox}>
          <Typography
            variant='h1'
            component='h1'
          >
            {selectedValue}
          </Typography>
        </div>

        <RadioGroup
          row
          className={styles.radioGroup}
          value={choice}
          onChange={(e) => setChoice(e.target.value as 'under' | 'over')}
        >
          <FormControlLabel
            color='secondary'
            value='under'
            control={
              <Radio
                sx={{
                  color: purple[500],

                  '&.Mui-checked': {
                    color: purple[500]
                  }
                }}
              />
            }
            label='Under'
            labelPlacement='start'
          />

          <FormControlLabel
            color='secondary'
            value='over'
            control={
              <Radio
                sx={{
                  color: purple[500],

                  '&.Mui-checked': {
                    color: purple[500]
                  }
                }}
              />
            }
            label='Over'
            labelPlacement='start'
          />
        </RadioGroup>

        <Slider
          className={styles.sliderBlock}
          step={10}
          min={0}
          max={100}
          marks={sliderMarks}
          value={selectedValue}
          onChange={(event, newValue) => setSelectedValue(newValue as number)}
          valueLabelDisplay='auto'
          color='secondary'
        />

        <Button
          disabled={history.length === 10}
          className={styles.button}
          variant='contained'
          color='secondary'
          onClick={playGame}
          sx={{ width: '50%' }}
        >
          Play
        </Button>

        <TableContainer
          className={styles.table}
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>

                <TableCell
                  size='small'
                  align='left'
                >
                  Guess
                </TableCell>

                <TableCell
                  size='small'
                  align='left'
                >
                  Result
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <Each
                data={history}
                render={(row) => (
                  <TableRow
                    className={styles.table}
                    key={row.time}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component='th'
                      scope='row'
                    >
                      {row.time}
                    </TableCell>

                    <TableCell
                      className={styles.tableCellGuess}
                      align='left'
                    >
                      {row.guess}
                    </TableCell>

                    <TableCell
                      sx={{
                        color: row.success ? 'green' : 'red'
                      }}
                      align='left'
                    >
                      {row.result}
                    </TableCell>
                  </TableRow>
                )}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export { DiceGame };
