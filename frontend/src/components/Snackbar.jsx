import React, { useContext, useEffect, useState } from 'react'
import { Snackbar, Alert } from "@mui/material";
import { useSnackbar } from '../Context/SnackbarContext';
import Grow from "@mui/material/Grow";

const GrowTransition = (props) => (
  <Grow
    {...props}
    style={{
      transformOrigin: "top center",
    }}
  />
);


const CustomSnackbar = () => {
  const { snackbar, setSnackbar } = useSnackbar();



  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={2000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={GrowTransition}

      sx={{ zIndex: 99999999 }}
    >
      <Alert
        severity={snackbar.type}
        variant="filled"
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        sx={{
          width: '100%',
          bgcolor: snackbar.type === "success" ? "white" :
            snackbar.type === "error" ? "white" :
              snackbar.type === "warning" ? "white" :
                "#e8f0fe",
          color: snackbar.type === "success" ? "green" :
            snackbar.type === "error" ? "#5f2120" :
              snackbar.type === "warning" ? "#663c00" :
                "#1a73e8",
          border: `1px solid ${snackbar.type === "success" ? "#a5d6a7" :
            snackbar.type === "error" ? "#ef9a9a" :
              snackbar.type === "warning" ? "#ffcc80" :
                "#90caf9"
            }`,
          borderRadius: 2,
          boxShadow: 3,
          fontWeight: 500,
          px: 1.5,
          py: 1,
           transform: snackbar.open ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.8)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar
