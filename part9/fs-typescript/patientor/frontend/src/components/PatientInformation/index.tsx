import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { Box, Container, Typography } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';
import { Gender } from '../../types';

const PatientInformation = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

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
    </div>
  );
};

export default PatientInformation;
