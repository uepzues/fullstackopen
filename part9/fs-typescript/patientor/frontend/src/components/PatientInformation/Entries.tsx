import { useEffect, useState } from 'react';
import { Diagnosis, Entry, Patient } from '../../types';
import { Container, Box, Typography, Stack, Button } from '@mui/material';
import diagnosesService from '../../services/diagnoses';
import HospitalEntry from './HospitalEntry';
import HealthCheckEntry from './HealthCheckEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

const Entries = ({ patient }: { patient: Patient }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      if (!patient) return;
      const diagnosesData = await diagnosesService.getDiagnoses();
      setDiagnoses(diagnosesData);
    };
    fetchDiagnoses();
  }, [patient]);

  const assertNever = (entry: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(entry)}`,
    );
  };

  const entryDetails = (entry: Entry) => {
    switch (entry.type) {
      case 'Hospital':
        return (
          <HospitalEntry
            entry={entry}
            diagnoses={diagnoses}
          />
        );
      case 'HealthCheck':
        return (
          <HealthCheckEntry
            entry={entry}
            diagnoses={diagnoses}
          />
        );
      case 'OccupationalHealthcare':
        return (
          <OccupationalHealthcareEntry
            entry={entry}
            diagnoses={diagnoses}
          />
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <Container>
      <Box>
        {patient && patient?.entries.length > 0 && (
          <Typography
            variant="h6"
            fontWeight={600}
          >
            Entries
          </Typography>
        )}
      </Box>
      <Box>
        <Stack>
          {patient.entries.map((entry) => (
            <Box key={entry.id}>{entryDetails(entry)}</Box>
          ))}
        </Stack>
      </Box>
      <Button variant="contained" color="primary" onClick={() => { }}>Add Entry</Button>
    </Container>
  );
};

export default Entries;
