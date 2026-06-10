import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import {
  Diagnosis,
  EntryType,
  EntryWithoutId,
  HealthCheckRating,
  Patient,
} from '../../types';
import patientsService from '../../services/patients';

interface Props {
  open: boolean;
  onClose: () => void;
  setPatient: (patient: Patient) => void;
  patient: Patient;
  diagnoses: Diagnosis[];
}

const AddEntriesForm = ({
  open,
  onClose,
  setPatient,
  patient,
  diagnoses,
}: Props) => {
  const [date, setDate] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [specialist, setSpecialist] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );
  const [type, setType] = useState<EntryType>('HealthCheck');
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  if (!open) return null;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!date || date.trim() === '') {
      setError('Date is a required field');
      return;
    }
    if (!description || description.trim() === '') {
      setError('Description is a required field');
      return;
    }
    if (!specialist || specialist.trim() === '') {
      setError('Specialist is a required field');
      return;
    }

    if (type === 'OccupationalHealthcare') {
      if (!employerName || employerName.trim() === '') {
        setError('Employer name is a required field');
        return;
      }
    }

    if (type === 'Hospital') {
      if (!dischargeDate || dischargeDate.trim() === '') {
        setError('Discharge date is a required field');
        return;
      }
      if (!dischargeCriteria || dischargeCriteria.trim() === '') {
        setError('Discharge criteria is a required field');
        return;
      }
    }

    let entry: EntryWithoutId;

    switch (type) {
      case 'HealthCheck':
        entry = {
          date,
          diagnosisCodes,
          specialist,
          description,
          healthCheckRating,
          type,
        };
        break;
      case 'OccupationalHealthcare':
        entry = {
          date,
          diagnosisCodes,
          specialist,
          description,
          employerName,
          sickLeave:
            sickLeaveStartDate && sickLeaveEndDate
              ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
              : undefined,
          type,
        };
        break;
      case 'Hospital':
        entry = {
          date,
          diagnosisCodes,
          specialist,
          description,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
          type,
        };
        break;
      default:
        setError('Unsupported entry type');
        return;
    }

    try {
      const addedEntry = await patientsService.addEntry(patient.id, entry);
      const updatedPatient: Patient = {
        ...patient,
        entries: (patient.entries || []).concat(addedEntry),
      };
      setPatient(updatedPatient);

      setDate('');
      setDiagnosisCodes([]);
      setSpecialist('');
      setDescription('');
      setHealthCheckRating(HealthCheckRating.Healthy);
      setType('HealthCheck');
      setEmployerName('');
      setSickLeaveStartDate('');
      setSickLeaveEndDate('');
      setDischargeDate('');
      setDischargeCriteria('');
      setError('');
      onClose();
    } catch (e: unknown) {
      console.error(e);
      if (axios.isAxiosError(e)) {
        if (e.response?.data && typeof e.response.data === 'object') {
          const errObj = e.response.data as { error?: any; message?: string };
          if (Array.isArray(errObj.error)) {
            setError(
              errObj.error.map((issue: any) => issue.message).join(', '),
            );
          } else if (typeof errObj.error === 'string') {
            setError(errObj.error);
          } else if (errObj.message) {
            setError(errObj.message);
          } else {
            setError(JSON.stringify(e.response.data));
          }
        } else if (typeof e.response?.data === 'string') {
          setError(e.response.data);
        } else {
          setError(e.message);
        }
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& > :not(style)': { m: 0.5 },
        display: 'flex',
        flexDirection: 'column',
        border: '2px dashed #00875A',
        borderRadius: '4px',
        padding: '12px',
        marginBottom: '10px',
      }}
    >
      <Typography variant="h6">New Entry</Typography>
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 1 }}
        >
          {error}
        </Alert>
      )}
      <TextField
        select
        label="Type"
        variant="outlined"
        value={type}
        onChange={(e) => setType(e.target.value as EntryType)}
        slotProps={{ select: { native: true } }}
      >
        <option value="HealthCheck">Health Check</option>
        <option value="Hospital">Hospital</option>
        <option value="OccupationalHealthcare">Occupational Healthcare</option>
      </TextField>
      <TextField
        label="Date"
        variant="outlined"
        type="date"
        slotProps={{ inputLabel: { shrink: true } }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          id="diagnosis-codes"
          multiple
          value={diagnosisCodes}
          open={selectOpen}
          onOpen={() => setSelectOpen(true)}
          onClose={() => setSelectOpen(false)}
          onChange={(e) => {
            setDiagnosisCodes(e.target.value as string[]);
            setSelectOpen(false);
          }}
          renderValue={(selected) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip
                  color="primary"
                  key={value}
                  label={value}
                />
              ))}
            </Box>
          )}
          label="Diagnosis Codes"
        >
          {diagnoses?.map((diagnosis: Diagnosis) => (
            <MenuItem
              key={diagnosis.code}
              value={diagnosis.code}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },

                ':hover': { backgroundColor: 'darkgreen', color: 'white' },
              }}
            >
              {diagnosis.code} {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Specialist"
        variant="outlined"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
      />
      {type === 'HealthCheck' && (
        <FormControl fullWidth>
          <InputLabel
            id="health-check-rating"
            shrink
          >
            Health Check Rating
          </InputLabel>
          <Select
            labelId="health-check-rating"
            value={healthCheckRating}
            onChange={(e) =>
              setHealthCheckRating(e.target.value as HealthCheckRating)
            }
            label="Health Check Rating"
          >
            <MenuItem value={HealthCheckRating.Healthy}>0 - Healthy</MenuItem>
            <MenuItem value={HealthCheckRating.LowRisk}>1 - Low Risk</MenuItem>
            <MenuItem value={HealthCheckRating.HighRisk}>
              2 - High Risk
            </MenuItem>
            <MenuItem value={HealthCheckRating.CriticalRisk}>
              3 - Critical Risk
            </MenuItem>
          </Select>
        </FormControl>
      )}
      {type === 'OccupationalHealthcare' && (
        <>
          <TextField
            label="Employer Name"
            variant="outlined"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
          <TextField
            label="Sick Leave Start Date"
            variant="outlined"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={sickLeaveStartDate}
            onChange={(e) => setSickLeaveStartDate(e.target.value)}
          />
          <TextField
            label="Sick Leave End Date"
            variant="outlined"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={sickLeaveEndDate}
            onChange={(e) => setSickLeaveEndDate(e.target.value)}
          />
        </>
      )}
      {type === 'Hospital' && (
        <>
          <TextField
            label="Discharge Date"
            variant="outlined"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
          />
          <TextField
            label="Discharge Criteria"
            variant="outlined"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
          />
        </>
      )}
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ mt: 1 }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onClose()}
          sx={{ mr: 1, textTransform: 'capitalize' }}
        >
          Cancel
        </Button>
        <Button
          sx={{ textTransform: 'capitalize' }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddEntriesForm;
