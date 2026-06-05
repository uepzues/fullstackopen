import { type HealthCheckEntry, Diagnosis } from '../../types';
import { Box, Typography, List, ListItem } from '@mui/material';
import { Favorite, LocalHospital } from '@mui/icons-material';

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[] | null;
}

const HealthCheckEntry = ({ entry, diagnoses }: HealthCheckEntryProps) => {
  const renderDiagnosisName = (code: string) => {
    const diagnosis = diagnoses?.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  const healthCheckRatingIcon = (rating: number) => {
    switch (rating) {
      case 0:
        return <Favorite color="success" />;
      case 1:
        return <Favorite color="info" />;
      case 2:
        return <Favorite color="warning" />;
      case 3:
        return <Favorite color="error" />;
      default:
        return <Favorite color="secondary" />;
    }
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
        <LocalHospital color="primary" />
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

      <Box sx={{ mt: 1.5, pt: 1, borderTop: '1px dashed #ccc' }} display="flex" alignItems="center" gap={1}>
        <Typography variant="body2">
          <strong>Health Check Rating:</strong>
        </Typography>
        {healthCheckRatingIcon(entry.healthCheckRating)}
      </Box>

      <Typography variant="body2" sx={{ mt: 1 }}>
        <strong>Diagnosed by:</strong> {entry.specialist}
      </Typography>
    </Box>
  );
};

export default HealthCheckEntry;
