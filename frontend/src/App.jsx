import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Drawer,
  Divider
} from '@mui/material';

function App() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedExplanation, setSelectedExplanation] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a CSV file');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setResults(response.data.results || []);
    } catch (err) {
      setError('Failed to analyze transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (amount) => {
    if (amount > 100000) return 'error';
    if (amount > 10000) return 'warning';
    return 'success';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        AI Fraud Report Generator
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Upload transaction data, detect anomalies using Machine Learning,
        and generate AI-powered fraud investigation reports.
      </Typography>

      {/* Upload Card */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Upload Transactions CSV
        </Typography>

        <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
          <Button variant="outlined" component="label">
            Choose CSV
            <input
              type="file"
              hidden
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>

          {file && (
            <Typography variant="body2" color="text.secondary">
              {file.name}
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze Fraud'}
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>

      {/* Summary */}
      {results.length > 0 && (
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'error.main', color: 'white' }}>
          <Typography variant="h5" fontWeight="bold">
            {results.length} Suspicious Transaction(s) Detected
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Isolation Forest identified anomalous transaction patterns requiring investigation.
          </Typography>
        </Paper>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Transaction ID</strong></TableCell>
                <TableCell><strong>Amount</strong></TableCell>
                <TableCell><strong>Country</strong></TableCell>
                <TableCell><strong>Hour</strong></TableCell>
                <TableCell><strong>Risk</strong></TableCell>
                <TableCell><strong>AI Report</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {results.map((item, index) => {
                const txn = item.transaction;

                return (
                  <TableRow key={index} hover>
                    <TableCell>{txn.transaction_id}</TableCell>
                    <TableCell>₹{txn.amount.toLocaleString()}</TableCell>
                    <TableCell>{txn.country}</TableCell>
                    <TableCell>{txn.hour}:00</TableCell>
                    <TableCell>
                      <Chip
                        label="HIGH"
                        color={getRiskColor(txn.amount)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => setSelectedExplanation(item.ai_explanation)}
                      >
                        View Report
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* AI Report Drawer */}
      <Drawer
        anchor="right"
        open={!!selectedExplanation}
        onClose={() => setSelectedExplanation('')}
      >
        <Box sx={{ width: 420, p: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            AI Investigation Report
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography
            variant="body1"
            sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}
          >
            {selectedExplanation}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 4 }}
            onClick={() => window.print()}
          >
            Download PDF Report
          </Button>
        </Box>
      </Drawer>
    </Container>
  );
}

export default App;