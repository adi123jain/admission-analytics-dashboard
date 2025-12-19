import { useEffect, useState, useMemo } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Stack,
  Box,
  Divider,
  CardHeader,
} from '@mui/material';

import RefreshIcon from '@mui/icons-material/Refresh';

import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  dashboardCardStyles,
  dashboardHeaderStyles,
  dashboardTitleStyles,
  statCardStyles,
  chartCardStyles,
  chartContainerStyles,
} from '../styles/style';
import { fetchAdmissionAnalytics } from '../api/analytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const getColor = (value) => {
  if (value > 1000) return 'error.main';
  if (value > 500) return 'warning.main';
  return 'success.main';
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

function AdmissionDashboard() {
  const [data, setData] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setFromDate('');
    setToDate('');
    const res = await fetchAdmissionAnalytics();
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredTrends = useMemo(() => {
    if (!data?.applicationTrends) return [];
    return data.applicationTrends.filter((t) => {
      if (fromDate && t.date < fromDate) return false;
      if (toDate && t.date > toDate) return false;
      return true;
    });
  }, [data, fromDate, toDate]);

  if (!data) {
    return (
      <Typography align="center" mt={6}>
        Loading Dashboard...
      </Typography>
    );
  }
  return (
    <Card sx={dashboardCardStyles}>
      <CardHeader
        title={
          <Typography variant="h5" sx={dashboardTitleStyles}>
            Admission Analytics Dashboard
          </Typography>
        }
        action={
          <Button
            variant="contained"
            color="success"
            startIcon={<RefreshIcon />}
            onClick={loadData}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
        }
        sx={dashboardHeaderStyles}
      />
      <CardContent sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
        <Grid container spacing={2} mb={4}>
          {[
            { label: 'Total Applicants', value: data.totalApplicants },
            { label: 'Verified Applicants', value: data.verifiedApplicants },
            { label: 'Rejected Applicants', value: data.rejectedApplicants },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Card sx={statCardStyles}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color={getColor(item.value)}
                  >
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card sx={{ ...chartCardStyles, mb: 4 }}>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={600}
              mb={2}
              sx={dashboardTitleStyles}
            >
              Applications per Program
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={chartContainerStyles}>
              <Bar
                options={chartOptions}
                data={{
                  labels: data.applicationsPerProgram.map((p) => p.program),
                  datasets: [
                    {
                      label: 'Applications',
                      data: data.applicationsPerProgram.map((p) => p.count),
                      backgroundColor: '#1976d2',
                    },
                  ],
                }}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={chartCardStyles}>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={600}
              mb={2}
              sx={dashboardTitleStyles}
            >
              Application Trends
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
              <TextField
                fullWidth
                type="date"
                label="From"
                InputLabelProps={{ shrink: true }}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <TextField
                fullWidth
                type="date"
                label="To"
                InputLabelProps={{ shrink: true }}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Stack>

            <Box sx={chartContainerStyles}>
              <Line
                options={chartOptions}
                data={{
                  labels: filteredTrends.map((t) => t.date),
                  datasets: [
                    {
                      label: 'Applications',
                      data: filteredTrends.map((t) => t.count),
                      borderColor: '#2e7d32',
                      tension: 0.3,
                    },
                  ],
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

export default AdmissionDashboard;
