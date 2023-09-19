import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/fi';



function App() {

  const locales = ['fi'];
  const [startTime, setStartTime] = React.useState(dayjs(''));
  const [endTime, setEndTime] = React.useState(dayjs(''));

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
      <DateTimePicker
          label="Aloitusaika"
          viewRenderers={{
            hours: null,
            minutes: null,
            seconds: null,
          }}
          value={startTime}
          onChange={(newValue) => setStartTime(newValue)}
        />
        <DateTimePicker
          label="Lopetusaika"
          viewRenderers={{
            hours: null,
            minutes: null,
            seconds: null,
          }}
          value={endTime}
          onChange={(newValue) => setEndTime(newValue)}
        />
      </LocalizationProvider>
      <Button variant="contained" size="large" onClick={() => {
    alert(endTime);
  }}>Lähetä</Button>
    </>
  )
}

export default App
