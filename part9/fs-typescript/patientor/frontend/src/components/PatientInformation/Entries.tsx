import { useEffect, useState } from 'react';
import { Diagnosis, Entry, Patient } from '../../types';
import { Container, Box, Typography, Stack, Button } from '@mui/material';
import diagnosesService from '../../services/diagnoses';
import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';
import AddEntriesForm from '../AddEntriesForm';

interface Props {
  patient: Patient;
  setPatient: (patient: Patient) => void;
}

const Entries = ({ patient, setPatient }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

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
          <Hospital
            entry={entry}
            diagnoses={diagnoses}
          />
        );
      case 'HealthCheck':
        return (
          <HealthCheck
            entry={entry}
            diagnoses={diagnoses}
          />
        );
      case 'OccupationalHealthcare':
        return (
          <OccupationalHealthcare
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {patient && patient?.entries?.length > 0 && (
          <Typography
            display={'inline'}
            variant="h6"
            fontWeight={600}
          >
            Entries
          </Typography>
        )}
        {!isFormOpen && (
          <Button
            sx={{ display: 'inline', textTransform: 'capitalize' }}
            variant="contained"
            color="primary"
            onClick={() => {
              setIsFormOpen((prev) => !prev);
            }}
          >
            Add New Entry
          </Button>
        )}
      </Box>
      {isFormOpen && (
        <AddEntriesForm
          open={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
          }}
          setPatient={setPatient}
          patient={patient}
          diagnoses={diagnoses || []}
        />
      )}
      <Box>
        <Stack>
          {patient.entries?.map((entry) => (
            <Box key={entry.id}>{entryDetails(entry)}</Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default Entries;
