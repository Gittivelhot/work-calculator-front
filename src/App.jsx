import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/fi';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

function App() {
  const locales = ['fi'];
  const [startTime, setStartTime] = React.useState(dayjs(''));
  const [endTime, setEndTime] = React.useState(dayjs(''));
  const [sumInMinutes, setSumInMinutes] = React.useState(0);
  const [sumInHours, setSumInHours] = React.useState(0);
  const [hourlyRate, setHourlyRate] = React.useState(0);
  const [earnings, setEarnings] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState([]);

  // Laske summa minuutteina ja tunteina
  const calculateSum = () => {
    const startTimeMs = startTime.valueOf();
    const endTimeMs = endTime.valueOf();
  
    if (!isNaN(startTimeMs) && !isNaN(endTimeMs)) {
      if (startTimeMs < endTimeMs) {
        const sumInMs = endTimeMs - startTimeMs;
        const sumInHrs = sumInMs / (1000 * 60 * 60);
        const sumInMin = sumInMs / (1000 * 60);
  
        const hourlyRateValue = parseFloat(hourlyRate); // Muunna tuntipalkka numeroksi
        if (!isNaN(hourlyRateValue)) {
          const earnings = hourlyRateValue * sumInHrs;
          setSumInHours(sumInHrs.toFixed(2)); // Pyöristetään 2 desimaaliin
          setSumInMinutes(sumInMin.toFixed(2));
          setEarnings(earnings.toFixed(2)); // Näytä ansaitut tulot
        } else {
          setMsg("Tarkista tuntipalkka. Syötä kelvollinen numero.");
          setOpen(true);
        }
      } else {
        setMsg("Aloitusaika tulee olla ennen lopetusaikaa.");
          setOpen(true);
      }
    } else {
      setMsg("Aseta aloitus- ja lopetusaika ennen laskemista.");
          setOpen(true);
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
      <TextField
        label="Tuntipalkka"
        type="number"
        value={hourlyRate}
        onChange={(e) => setHourlyRate(e.target.value)}
        InputProps={{ inputProps: { min: 0 } }} // Varmista, että syötetty arvo on ei-negatiivinen
        
      />
      <Button variant="contained" size="medium" onClick={calculateSum}>Laske</Button>
      
    
      <p className="tyoaika">Työaika yhteensä: {sumInHours} tuntia</p>
      <p className="ansiot">Ansaitut tulot: {earnings} euroa</p>

      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={() => setOpen(false)}
        message={msg}
      />
    </>
  )
}

export default App;