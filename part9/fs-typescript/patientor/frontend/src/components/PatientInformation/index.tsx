import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';
import { Gender } from '../../types';
import { Diagnosis } from '../../types';
import diagnosesService from '../../services/diagnoses';

const PatientInformation = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const renderGenderIcon = (gender: Gender) => {
    switch (gender) {
      case 'male':
        return <Male sx={{ fontSize: 36, paddingTop: 0.5 }} />;
      case 'female':
        return <Female sx={{ fontSize: 36, paddingTop: 0.5 }} />;
      case 'other':
        return <Transgender sx={{ fontSize: 36, paddingTop: 0.5 }} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;

      try {
        const patientData = await patientService.getPatient(id);
        setPatient(patientData);
      } catch (error) {
        console.error('Error fetching patient', error);
      }
    };
    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      if (!patient) return;
      const diagnosesData = await diagnosesService.getDiagnoses();
      setDiagnoses(diagnosesData);
    };
    fetchDiagnoses();
  }, [patient]);

  const renderDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  return (
    <div>
      <Container>
        <Box>
          <Typography
            align="center"
            variant="h6"
          >
            Patient Information
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
        >
          <Box>
            <Typography
              variant="h4"
              display="flex"
            >
              {patient?.name}
              <Box
                display="flex"
                sx={{ paddingLeft: 1 }}
              >
                {renderGenderIcon(patient?.gender ?? Gender.Other)}
              </Box>
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1">
              <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>
                {' '}
                SSN:{' '}
              </Typography>
              {patient?.ssn}
            </Typography>
            <Typography variant="body1">
              <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>
                {' '}
                Occupation:{' '}
              </Typography>
              {patient?.occupation}
            </Typography>
            <Typography variant="body1">
              <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>
                {' '}
                Date of Birth:{' '}
              </Typography>
              {patient?.dateOfBirth}
            </Typography>
          </Box>
        </Box>
      </Container>
      <Divider sx={{ marginY: 2 }} />
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
          <List sx={{ display: 'flex', flexDirection: 'column' }}>
            {patient?.entries.map((entry) => (
              <ListItem
                key={entry.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                }}
              >
                <ListItemText
                  primary={entry.description}
                  secondary={entry.date}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                  }}
                >
                  {entry.diagnosisCodes?.map((code) => (
                    <ListItemText
                      key={code}
                      primary={
                        <>
                          <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>
                            {code}
                          </Typography>{' '}
                          {renderDiagnosisName(code)}
                        </>
                      }
                    />
                  ))}
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </div>
  );
};

export default PatientInformation;
