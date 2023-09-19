import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import Button from '@mui/material/Button';

function App() {

  const [startTime, setStartTime] = React.useState(dayjs('2022-04-17T15:30'));
  const [endTime, setEndTime] = React.useState(dayjs('2022-04-17T15:30'));

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimeField
          label="Aloitusaika"
          format="HH:mm"
          value={startTime}
          onChange={(newValue) => setStartTime(newValue)}
        />
        <TimeField
          label="Lopetusaika"
          format="HH:mm"
          value={endTime}
          onChange={(newValue) => setEndTime(newValue)}
        />
      </LocalizationProvider>
      <Button variant="contained" >Lähetä</Button>
    </>
  )
}

export default App
