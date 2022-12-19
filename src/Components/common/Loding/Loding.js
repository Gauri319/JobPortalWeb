import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
 
export default function Loding() {
  return (
    <Box sx={{ display: 'flex',width:"100vw",height:"85vh",justifyContent:"center",alignItems:"center" }}>
      <CircularProgress sx={{color:"var(--blue)"}} />
    </Box>
  );
}