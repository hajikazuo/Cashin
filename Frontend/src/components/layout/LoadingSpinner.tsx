import { Box, CircularProgress } from "@mui/material";

interface LoadingSpinnerProps {
    size?: number; 
    color?: 'primary' | 'secondary' | 'inherit'; 
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40, color = 'primary' }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <CircularProgress size={size} color={color} />
        </Box>
    );
};

export default LoadingSpinner;
