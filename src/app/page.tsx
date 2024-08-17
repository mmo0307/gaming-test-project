import React from 'react';
import { Container } from '@mui/material';

import { DiceGame } from '@/entities/Dicegame';

export default function Home() {
  return (
    <main>
      <Container maxWidth='sm'>
        <DiceGame />
      </Container>
    </main>
  );
}
