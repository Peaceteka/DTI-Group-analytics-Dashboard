import React from 'react';
import {
  Card,
  Grid,
  Typography,
  Box,
  LinearProgress,
  CircularProgress,
  Paper,
  CardMedia,
  IconButton,
  Tooltip as MuiTooltip,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
} from 'recharts';
import { useTheme } from '@mui/material/styles';

const Dashboard = () => {
  const theme = useTheme();
  const stats = {
    totalStudents: 2000,
    activeCourses: 15,
    trainers: 12,
    completionRate: 90,
  };

  const courseData = [
    { name: 'Executive Coaching', value: 450 },
    { name: 'High School Program', value: 350 },
    { name: 'Kids Program', value: 250 },
    { name: 'Corporate Training', value: 300 },
    { name: 'Course Creator', value: 150 },
  ];

  const trainerPerformance = [
    { name: 'John Doe', courses: 5, students: 120, rating: 4.8 },
    { name: 'Jane Smith', courses: 4, students: 95, rating: 4.9 },
    { name: 'Mike Johnson', courses: 6, students: 150, rating: 4.7 },
    { name: 'Sarah Wilson', courses: 4, students: 110, rating: 4.8 },
  ];

  const studentProgress = [
    { name: 'Week 1', value: 20 },
    { name: 'Week 2', value: 40 },
    { name: 'Week 3', value: 60 },
    { name: 'Week 4', value: 80 },
    { name: 'Week 5', value: 95 },
  ];

  const teleMarketerData = [
    { unit: 'Unit 1', performance: 85 },
    { unit: 'Unit 2', performance: 72 },
    { unit: 'Unit 3', performance: 68 },
    { unit: 'Unit 4', performance: 90 },
  ];

  const corporateSales = {
    target: 100,
    current: 75,
  };

  // Color scheme for performance indicators
  const getColor = (value) => {
    if (value >= 70) return '#4CAF50'; // Green for 70% and above
    if (value >= 50) return '#FFC107'; // Yellow for 50-69%
    return '#F44336'; // Red for below 50%
  };



  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        DTI Public Speaking Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">Total Students</Typography>
            <Typography variant="h3" sx={{ mt: 2 }}>
              {stats.totalStudents}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={stats.completionRate}
              sx={{ 
                mt: 2,
                bgcolor: '#F44336'
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">Active Courses</Typography>
            <Typography variant="h3" sx={{ mt: 2 }}>
              {stats.activeCourses}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              100% Success Rate
            </Typography>
          </Card>
        </Grid>

        {/* Student Feedback Card */}
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, height: '100%', bgcolor: theme.palette.background.paper }}>
            <Typography variant="h6">Student Feedback</Typography>
            <Box sx={{ mt: 2 }}>
              <a href="/feedback" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                <Typography variant="h5" align="center">
                  Provide Feedback
                </Typography>
              </a>
            </Box>
          </Card>
        </Grid>

        {/* Corporate Sales Card */}
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">Corporate Sales</Typography>
            <Typography variant="h3" sx={{ mt: 2 }}>
              {corporateSales.current}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={corporateSales.current}
              sx={{ 
                mt: 2,
                bgcolor: '#F44336'
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">Trainers</Typography>
            <Typography variant="h3" sx={{ mt: 2 }}>
              {stats.trainers}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Average Rating: 4.8/5
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">Completion Rate</Typography>
            <Typography variant="h3" sx={{ mt: 2 }}>
              {stats.completionRate}%
            </Typography>
            <CircularProgress
              variant="determinate"
              value={stats.completionRate}
              sx={{ width: 50, height: 50, mt: 2 }}
            />
          </Card>
        </Grid>

        {/* Course Distribution Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <MuiTooltip title="Course Enrollment">
              <Typography variant="h5" gutterBottom>
                Course Enrollment
              </Typography>
            </MuiTooltip>
            <BarChart width={500} height={300} data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#F44336" />
            </BarChart>
          </Card>
        </Grid>

        {/* Tele Marketer Performance Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <MuiTooltip title="Tele Marketer Performance">
              <Typography variant="h5" gutterBottom>
                Tele Marketer Performance
              </Typography>
            </MuiTooltip>
            <BarChart width={500} height={300} data={teleMarketerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="unit" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar 
                dataKey="performance" 
                fill="#F44336"
                style={{ fill: (props) => getColor(props.value) }}
              />
            </BarChart>
          </Card>
        </Grid>

        {/* Trainer Performance */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Trainer Performance
            </Typography>
            <Paper sx={{ p: 2, mt: 2 }}>
              {trainerPerformance.map((trainer, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">
                    {trainer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Courses: {trainer.courses} | Students: {trainer.students}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={trainer.rating * 20}
                    sx={{ mt: 1 }}
                  />
                </Box>
              ))}
            </Paper>
          </Card>
        </Grid>

        {/* Student Progress */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Student Progress
            </Typography>
            <LineChart
              width={500}
              height={300}
              data={studentProgress}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={theme.palette.primary.main}
              />
            </LineChart>
          </Card>
        </Grid>

        {/* Program Statistics */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Program Statistics
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={courseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill={theme.palette.primary.main}
                paddingAngle={5}
                dataKey="value"
              />
              <Tooltip />
            </PieChart>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
