import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { keyframes } from '@emotion/react';

const waveAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export default function AddNewticket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null); // Remove the uploaded file
  };

  const handleSubmit = () => {
    console.log('Ticket Title:', title);
    console.log('Ticket Description:', description);
    console.log('Attached File:', file);
    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <Box sx={{
      padding: '1em',
      pt: '3em',
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '3em',
        gap: '1em',
      }}>
        <Typography sx={{ color: '#fff', fontSize: '2.2em', fontWeight: 'bolder' }}>
          Add New Ticket
        </Typography>
      </Box>

      <Box sx={{ width: '100%', maxWidth: 600, mt: 3 }}>
        {/* Title Input */}
        <TextField
          label="Ticket Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
              backgroundColor: '#333',
            },
            '& .MuiInputLabel-root': {
              color: '#fff',
            },
            '& .MuiOutlinedInput-input': {
              color: '#fff',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#444',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#51d5f5',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#51d5f5',
            },
          }}
        />

        {/* Description Input */}
        <TextField
          label="Ticket Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
              backgroundColor: '#333',
            },
            '& .MuiInputLabel-root': {
              color: '#fff',
            },
            '& .MuiOutlinedInput-input': {
              color: '#fff',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#444',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#51d5f5',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#51d5f5',
            },
          }}
        />

        {/* File Upload Button (only visible when no file is uploaded) */}
        {!file && (
          <Button
            variant="contained"
            component="label"
            color="primary"
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              borderRadius: '30px',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #51d5f5, #2a8bf2)',
              padding: '1em 2em',
              '&:hover': {
                background: 'linear-gradient(135deg, #2a8bf2, #51d5f5)',
              },
              '& .MuiButton-label': {
                position: 'relative',
                zIndex: 1,
              },
            }}
          >
            <AttachFileIcon sx={{ mr: 1 }} />
            Upload File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
            {/* Sea wave animation */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '200%',
              height: '100%',
              background: 'rgba(255,255,255,0.2)',
              animation: `${waveAnimation} 4s linear infinite`,
              zIndex: 0,
            }} />
          </Button>
        )}

        {/* Display the uploaded file name with the option to remove it */}
        {file && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5em', mb: 2 }}>
            <Typography sx={{ color: '#fff', fontSize: '1em' }}>{file.name}</Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleRemoveFile}
              sx={{
                fontSize: '12px',
                padding: '0.3em',
                textTransform: 'none',
              }}
            >
              Remove
            </Button>
          </Box>
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{
            mt: 2,
            padding: '1em',
            borderRadius: '30px',
            background: 'linear-gradient(135deg, #51d5f5, #2a8bf2)',
            '&:hover': { background: 'linear-gradient(135deg, #2a8bf2, #51d5f5)' },
          }}
        >
          Submit Ticket
        </Button>
      </Box>
    </Box>
  );
}
