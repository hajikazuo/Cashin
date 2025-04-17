import { Alert, Box } from "@mui/material";
import { useEffect, useState } from "react";

interface AutoDismissAlertProps {
  type: 'error' | 'success';
  message: string;
  duration?: number; 
}

const AutoDismissAlert: React.FC<AutoDismissAlertProps> = ({ type, message, duration = 4000 }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, duration);

    return () => clearTimeout(timer); 
  }, [duration]);

  return (
    showAlert && (
      <Box sx={{ mb: 2 }}>
        <Alert severity={type}>
          {message}
        </Alert>
      </Box>
    )
  );
};

export default AutoDismissAlert;
