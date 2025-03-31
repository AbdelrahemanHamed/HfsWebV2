import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useNavigate } from 'react-router-dom';

const SupportPage = () => {
  const navigate = useNavigate();

  const handleAddTicketClick = () => {
    navigate('/AddNewticket'); // Replace with the target page path
  };

  return (
    <Box sx={{
        padding: '1em',
        pt: '3em',
        height: '100vh',
        width: '100%'
    }}>

        <Box sx={{
            height: '100%', 
            width: '100%'
        }}>
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: '3em',
                    gap: '1em',
                }}>
                    <Typography sx={{ color: '#fff', fontSize: '2.2em', fontWeight: 'bolder'}}>Support</Typography>
                    <Button
                        onClick={handleAddTicketClick} // Add click handler
                        style={{
                            background: 'linear-gradient(90deg, #4ed8f7 0%, #d057a1 100%)',
                            color: '#fff', // White text color
                            padding: '0.5em 1em',
                            fontWeight: 'bold',
                            borderRadius: '0.5em',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '17px',
                            display: 'flex', // Ensures text and icon align properly
                            alignItems: 'center',
                            gap: '0.5em', // Adds spacing between the icon and text
                        }}
                    >
                        <ConfirmationNumberIcon style={{ fontSize: '24px' }} /> {/* Icon */}
                        Add Ticket
                    </Button>
                </Box>
                    <Box sx={{
                        pt: '3em',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',   
                        gap: '3em',
                        width: '100%',
                    }}>
                        {/* tickets Table */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: '1em',
                            border: '1px solid #ccc',
                            borderRadius: '12px',
                            padding: '1em',
                            px: '2em',
                            width: '90%',
                            alignItems: 'center'
                        }}> 

                            <Typography sx={{ color: '#fff', fontSize: '1.3rem',}}>Ticket Title</Typography>
                            <Typography sx={{ 
                                color: '#fff', 
                                fontSize: '1.3rem',        
                                maxWidth: '200px',  // Set a max width for truncation
                                overflow: 'hidden',  // Hide the overflowing text
                                textOverflow: 'ellipsis',  // Add "..." when text is truncated
                                whiteSpace: 'nowrap',  // Prevent text from wrapping to the next line
                            }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum...</Typography>
                            <Typography sx={{ color: '#fff', fontSize: '1.3rem',}}>20/12/24</Typography>
                            <Typography sx={{ color: 'green', fontSize: '1.3rem',}}>Solved</Typography>
                            <Button sx={{
                                color: '#fff', 
                                fontSize: '1.3rem',
                                fontWeight: 'bolder',
                                background: 'linear-gradient(90deg, #4ed8f7 0%, #d057a1 100%)',
                                padding: '0.01em .6em',
                                borderRadius: '10px'}}>
                                    view
                                    </Button>

                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: '1em',
                            border: '1px solid #ccc',
                            borderRadius: '12px',
                            padding: '1em',
                            px: '2em',
                            width: '90%',
                            alignItems: 'center'
                        }}> 

                            <Typography sx={{ color: '#fff', fontSize: '1.3rem',}}>Ticket Title</Typography>
                            <Typography sx={{ 
                                color: '#fff', 
                                fontSize: '1.3rem',        
                                maxWidth: '200px',  // Set a max width for truncation
                                overflow: 'hidden',  // Hide the overflowing text
                                textOverflow: 'ellipsis',  // Add "..." when text is truncated
                                whiteSpace: 'nowrap',  // Prevent text from wrapping to the next line
                            }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum...</Typography>
                            <Typography sx={{ color: '#fff', fontSize: '1.3rem',}}>20/12/24</Typography>
                            <Typography sx={{ color: '#cc0000', fontSize: '1.3rem',}}>pending</Typography>
                            <Button sx={{
                                color: '#fff', 
                                fontSize: '1.3rem',
                                fontWeight: 'bolder',
                                background: 'linear-gradient(90deg, #4ed8f7 0%, #d057a1 100%)',
                                padding: '0.01em .6em',
                                borderRadius: '10px'}}>
                                    view
                                    </Button>

                        </Box>

                    </Box>
        </Box>
    </Box>
  );
};

export default SupportPage;
