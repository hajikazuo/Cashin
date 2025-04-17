import { useEffect, useState } from "react";
import { Dashboard } from "../../@types/Dashboard";
import Breadcrumb from "../../components/layout/Breadcrumb"
import { getDashboard } from "../../services/requests";
import LoadingSpinner from "../../components/layout/LoadingSpinner";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { formatValue } from "../../utils/formatValue";
import AutoDismissAlert from "../../components/layout/Alert";

export const Home = () => {
    const [dashboard, setDashboard] = useState<Dashboard>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const fetchDashboard = async () => {
        try {
            const response = await getDashboard(startDate, endDate);
            if (response.data) {
                setDashboard(response.data);
            }
        } catch (error) {
            console.error(error);
            setError('Erro ao buscar dados');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const handleDateFilter = () => {
        setLoading(true);
        fetchDashboard();
    };

    if (loading) {
        return <LoadingSpinner size={60} color="primary" />
    }

    if (error) {
        <AutoDismissAlert
            type="error"
            message={error}
        />
    }

    return (
        <div>
            <Breadcrumb
                paths={[
                    { label: 'Home', href: '/home' },
                    { label: 'Dashboard' }
                ]}
            />

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h3">
                    Dashboard
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    <TextField
                        label="Data Inicial"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Data Final"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button variant="contained" onClick={handleDateFilter}>
                        Filtrar
                    </Button>
                </Box>
            </Box>

            <Box
                mt={4}
                display="grid"
                gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                gap={3}
            >
                <Card elevation={3} sx={{ backgroundColor: '#e3f2fd' }}>
                    <CardContent sx={{ color: '#000' }}>
                        <Typography variant="h6" gutterBottom>
                            Saldo
                        </Typography>
                        <Typography variant="h4" color="primary">
                            {formatValue(dashboard?.balance ?? 0)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card elevation={3} sx={{ backgroundColor: '#e8f5e9' }}>
                    <CardContent sx={{ color: '#000' }}>
                        <Typography variant="h6" gutterBottom>
                            Receitas
                        </Typography>
                        <Typography variant="h4" color="success.main">
                            {formatValue(dashboard?.totalIncome ?? 0)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card elevation={3} sx={{ backgroundColor: '#ffebee' }}>
                    <CardContent sx={{ color: '#000' }}>
                        <Typography variant="h6" gutterBottom>
                            Despesas
                        </Typography>
                        <Typography variant="h4" color="error.main">
                            {formatValue(dashboard?.totalExpense ?? 0)}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

        </div>
    )
}