import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Box } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const WeeklyChart = () => {
  const salesData = Array.from({ length: 52 }, () => Math.floor(Math.random() * 100 + 20));

  const data = {
    labels: Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`),
    datasets: [
      {
        label: 'Earning per Week',
        data: salesData,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
        hoverBackgroundColor: '#FF6384',
        hoverBorderColor: '#FF6384',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow height to affect chart
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Earning Per Week for the Year',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Earning (in HFS-C)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: {
          xs: '300px',
          sm: '350px',
          md: '400px',

        },
        padding: '20px',
        backgroundColor: '#1f1e1e',
      }}
    >
      <Bar data={data} options={options} />
    </Box>
  );
};

export default WeeklyChart;
