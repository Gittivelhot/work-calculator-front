import { useState } from "react";
import "../styles/Calculator.css";
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import "dayjs/locale/fi";
import Snackbar from "@mui/material/Snackbar";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DateTimePicker } from "@mui/x-date-pickers";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function Calculator() {
  const [startTime, setStartTime] = useState(
    dayjs().set("hour", 9).set("minute", 0)
  );
  const [endTime, setEndTime] = useState(
    dayjs().set("hour", 17).set("minute", 0)
  );
  const [sumInMinutes, setSumInMinutes] = useState(0);
  const [sumInHours, setSumInHours] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0.0);
  const [taxFreeEarnings, setTaxFreeEarnings] = useState(0);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [taxPercent, setTaxPercent] = useState(0.0);
  const [totalEarnings, setTotalEarnings] = useState(0.0);
  const [isTaxPercentage, setIsTaxPercentage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const calculateSum = () => {
    const startTimeMs = startTime.valueOf();
    const endTimeMs = endTime.valueOf();



    if (!isNaN(startTimeMs) && !isNaN(endTimeMs)) {
      if (startTimeMs < endTimeMs) {
        const sumInMs = endTimeMs - startTimeMs;
        const sumInHrs = sumInMs / (1000 * 60 * 60);
        const sumInMin = sumInMs / (1000 * 60);

        if (!isNaN(hourlyRate)) {
          const earnings = hourlyRate * sumInHrs;
          const verotonsumma = earnings * ((100 - taxPercent) / 100);
          setSumInHours(sumInHrs.toFixed(2)); // Pyöristetään 2 desimaaliin
          setSumInMinutes(sumInMin);
          setTaxFreeEarnings(earnings.toFixed(2)); // Näytä ansaitut tulot
          setTotalEarnings(verotonsumma.toFixed(2)); // Lasketaan lopullinen tienesti verojen jälkeen.
          if (taxPercent != 0.0 && hourlyRate != 0.0) {
            setIsTaxPercentage(true);
          } else {
            setIsTaxPercentage(false);
          }
          setShowResults(true);
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

  const clearTextFields = () => {
    setStartTime(dayjs().set("hour", 9).set("minute", 0));
    setEndTime(dayjs().set("hour", 17).set("minute", 0));
    setHourlyRate(0.0);
    setTaxPercent(0.0);
    setIsTaxPercentage(false);
    setShowResults(false);
  };

  const handleAddHours = () => {
    const dataToSend = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };
    fetch("/api/savehours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => {
        if (response.ok) {
          setError(false);
          setSuccess(true);
        } else {
          setSuccess(false);
          setError(true);
        }
      }
      )
  }

  return (
    <div className="app-container">
      <Box
        className="calculator-container"
        sx={{ boxShadow: 6, borderRadius: 1 }}
      >
        <Typography style={{ fontSize: "35px" }}>Laske työtunnit</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
          <div className="child-element">
            <DateTimePicker
              label="Aloitusaika"
              onChange={(newValue) => setStartTime(newValue)}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </div>
          <div className="child-element">
            <DateTimePicker
              label="Lopetusaika"
              onChange={(newValue) => setEndTime(newValue)}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </div>

          <div className="child-element">
            <TextField
              fullWidth
              label="Tuntipalkka"
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
            />
          </div>
          <div className="child-element">
            <TextField
              fullWidth
              label="Veroprosentti"
              type="number"
              value={taxPercent}
              onChange={(e) => setTaxPercent(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </div>
        </LocalizationProvider>
        <div className="child-element">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent={"center"}
            id="buttonstack"
          >
            <Button
              variant="contained"
              color="warning"
              onClick={clearTextFields}
              id="emptybutton">
              Tyhjennä
            </Button>
            <Button variant="contained" onClick={calculateSum} id="calculatebutton">
              Laske
            </Button>
          </Stack>
          <Stack>
            <Button variant="contained" onClick={handleAddHours} id="addbutton">
              Lisää kalenteriin
            </Button>
          </Stack>
        </div>

        {showResults && (
          <>
            <div className="child-element">
              <Typography>
                Työaika tunteina ja minuutteina: {Math.trunc(sumInHours)}h{" "}
                {sumInMinutes % 60}min
              </Typography>
            </div>
            <div className="child-element">
              <Typography>Työaika desimaalitunteina: {sumInHours}</Typography>
            </div>
            <div className="child-element">
              <Typography>Työaika minuutteina: {sumInMinutes}min</Typography>
            </div>
            {taxFreeEarnings !== 0.0 && isTaxPercentage && (
              <div className="child-element">
                <Typography>Tulot ennen veroja: {taxFreeEarnings}€</Typography>
              </div>
            )}
            {totalEarnings != 0.0 && (
              <div className="child-element">
                <Typography>Tulot verojen jälkeen: {totalEarnings}€</Typography>
              </div>
            )}
          </>
        )}
        <div id="errorcontainer">
          {error && (
            <Alert severity="error">
              <AlertTitle>Tuntien lisääminen kalenteriin epäonnistui!</AlertTitle>
              Tarkista että tiedot ovat oikein ja <strong>kokeile uudelleen!</strong>
            </Alert>
          )}
          {success && (
            <Alert severity="success">
              <AlertTitle>Tuntien lisääminen kalenteriin onnistui!</AlertTitle>
              Pääset tarkastelemaan tietojasi <strong>kalenterisivulta</strong>
            </Alert>
          )}
        </div>
        <div className="child-element">
          <Snackbar
            open={open}
            autoHideDuration={6500}
            onClose={() => setOpen(false)}
            message={msg}
          />
        </div>
      </Box>
    </div>
  );
}
export default Calculator;
