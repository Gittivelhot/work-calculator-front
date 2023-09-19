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
  const [sumInMinutes, setSumInMinutes] = React.useState(0);
  const [sumInHours, setSumInHours] = React.useState(0);

  // Laske summa minuutteina ja tunteina
  const calculateSum = () => {
    const startTimeMs = startTime.valueOf();
    const endTimeMs = endTime.valueOf();

    if (!isNaN(startTimeMs) && !isNaN(endTimeMs)) {
      const sumInMs = endTimeMs - startTimeMs;
      setSumInMinutes(sumInMs);

      // Laske summa tunteina
      const sumInHrs = sumInMs / (1000 * 60 * 60);
      setSumInHours(sumInHrs);
    }
  };

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
      
      <Button variant="contained" size="large" onClick={calculateSum}>Laske</Button>
      
    
      <p className="tyoaika">Työaika yhteensä: {sumInHours} tuntia</p>
    </>
  )
}

export default App;