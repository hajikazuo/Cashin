import { useState, useEffect } from "react";
import { getTransactions } from "../../services/requests";
import { Transaction, TransactionType } from "../../@types/Transaction";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import Breadcrumb from "../../components/layout/Breadcrumb";
import CustomPagination from "../../components/layout/Pagination";
import { formatDate } from "../../utils/formatDate";
import { formatValue } from "../../utils/formatValue";
import LoadingSpinner from "../../components/layout/LoadingSpinner";
import AutoDismissAlert from "../../components/layout/Alert";

export const Transactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const fetchTransactions = async () => {
        try {
            const response = await getTransactions(currentPage, 25, startDate, endDate);
            if (response.data) {
                setTransactions(response.data);
                setTotalPages(response.headers.totalPages);
            }
        } catch (error) {
            console.error(error);
            setError('Erro ao buscar transações');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [currentPage]);

    const handleDateFilter = () => {
        setLoading(true);
        setCurrentPage(1);
        fetchTransactions();
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
                    { label: 'Transações' },
                    { label: 'Minhas transações' },
                ]}
            />

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h3">
                    Transações
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

            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Valor</strong></TableCell>
                                <TableCell><strong>Descrição</strong></TableCell>
                                <TableCell><strong>Tipo</strong></TableCell>
                                <TableCell><strong>Data</strong></TableCell>
                                <TableCell><strong>Categoria</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{formatValue(transaction.amount)}</TableCell>
                                    <TableCell>{transaction.description}</TableCell>
                                    <TableCell>{TransactionType[transaction.type]}</TableCell>
                                    <TableCell>{formatDate(new Date(transaction.date).getTime())}</TableCell>
                                    <TableCell>{transaction.categoryName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};
