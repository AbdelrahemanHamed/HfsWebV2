import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Typography, Box } from '@mui/material';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [selectedYear, setSelectedYear] = useState('2024'); // Default year
  const [sponsorIdCode, setSponsorIdCode] = useState(null);

  const data2024 = [10, 30, 20, 430, 340, 380, 500, 30, 50, 200, 100, 190]; // Data for 2024
  const data2025 = [630, 160, 570, 450, 130, 780, 990, 600, 400, 1000, 230]; // Data for 2025

  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
    ],
    datasets: [
      {
        label: `Earning (${selectedYear})`,
        data: selectedYear === '2024' ? data2024 : data2025,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return '#cb4b93';
          }

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, '#c74a91');
          gradient.addColorStop(1, '#522b4a');
          return gradient;
        },
        borderColor: '#552c4b',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Total Bounce Earning ${selectedYear}`,
      },
    },
  };

  useEffect(() => {
    const fetchSponsorId = async () => {
      try {
        const response = await axios.get('https://api.yourdomain.com/sponsor-id'); // Replace with your actual endpoint
        const sponsorCode = response.data.sponsor_id_code; // Assuming the response contains sponsor_id_code
        setSponsorIdCode(sponsorCode);
        console.log('Sponsor ID Code:', sponsorCode); // Log sponsor_id_code in console
      } catch (error) {
        console.error('Error fetching sponsor ID:', error);
      }
    };

    fetchSponsorId(); // Call function to fetch sponsor ID when component mounts
  }, []); // Empty dependency array to run only on component mount

  return (
    <Box
      sx={{
        height: {
          xs: '300px',
          sm: '350px',
          md: '400px',
        },
        width: '100%',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Typography>2024</Typography>
          <input
            type="radio"
            name="year"
            value="2024"
            checked={selectedYear === '2024'}
            onChange={() => setSelectedYear('2024')}
            style={{
              marginRight: '10px',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              appearance: 'none',
              outline: selectedYear === '2024' ? '2px solid #cb4b93' : 'none',
              backgroundColor: selectedYear === '2024' ? '#cb4b93' : 'white',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Typography>2025</Typography>
          <input
            type="radio"
            name="year"
            value="2025"
            checked={selectedYear === '2025'}
            onChange={() => setSelectedYear('2025')}
            style={{
              marginRight: '10px',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              appearance: 'none',
              outline: selectedYear === '2025' ? '2px solid #cb4b93' : 'none',
              backgroundColor: selectedYear === '2025' ? '#cb4b93' : 'white',
            }}
          />
        </Box>
      </Box>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default BarChart;
