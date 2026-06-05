import { Typography, Box, List, ListItem } from '@mui/material';
import { Diagnosis, HospitalEntry } from '../../types';
import { MedicalServices } from '@mui/icons-material';

interface HospitalProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[] | null;
}

const Hospital = ({ entry, diagnoses }: HospitalProps) => {
  const renderDiagnosisName = (code: string) => {
    const diagnosis = diagnoses?.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: 1,
        padding: 2,
        marginY: 1,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mb={1}
      >
        <Typography variant="body1">
          <strong>{entry.date}</strong>
        </Typography>
        <MedicalServices color="primary" />
      </Box>
      <Typography
        variant="body2"
        sx={{ fontStyle: 'italic', mb: 1 }}
      >
        {entry.description}
      </Typography>

      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold' }}
          >
            Diagnosis:
          </Typography>
          <List
            dense
            sx={{ py: 0 }}
          >
            {entry.diagnosisCodes.map((code) => (
              <ListItem
                key={code}
                disablePadding
                sx={{ display: 'list-item', listStyleType: 'disc', ml: 4 }}
              >
                <Typography variant="body2">
                  {code} {renderDiagnosisName(code)}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {entry.discharge && (
        <Box sx={{ mt: 1.5, pt: 1, borderTop: '1px dashed #ccc' }}>
          <Typography variant="body2">
            <strong>Discharged:</strong> {entry.discharge.date}
          </Typography>
          <Typography variant="body2">
            <strong>Criteria:</strong> {entry.discharge.criteria}
          </Typography>
        </Box>
      )}

      <Typography variant="body2" sx={{ mt: 1 }}>
        <strong>Diagnosed by:</strong> {entry.specialist}
      </Typography>
    </Box>
  );
};

export default Hospital;
