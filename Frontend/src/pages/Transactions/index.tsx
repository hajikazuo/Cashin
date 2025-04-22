import { useState, useEffect } from "react";
import { deleteTransaction, getTransactions } from "../../services/requests";
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
    IconButton,
} from "@mui/material";
import Breadcrumb from "../../components/layout/Breadcrumb";
import CustomPagination from "../../components/layout/Pagination";
import { formatDate } from "../../utils/formatDate";
import { formatValue } from "../../utils/formatValue";
import LoadingSpinner from "../../components/layout/LoadingSpinner";
import AutoDismissAlert from "../../components/layout/Alert";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from "../../components/layout/ConfirmationModal";

export const Transactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [modalOpen, setModalOpen] = useState(false);
    const [toDelete, setToDelete] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleEdit = (id: string) => navigate(`/transacoes/editar/${id}`)

    const handleDelete = async (id: string) => {
        try {
            await deleteTransaction(id);
            setModalOpen(false);
            handleGetTransactions();
        } catch (error) {
            console.error(error);
            setError('Erro ao deletar');
        }
    }

    const handleGetTransactions = async () => {
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
        handleGetTransactions();
    }, [currentPage]);

    const handleDateFilter = () => {
        setLoading(true);
        setCurrentPage(1);
        handleGetTransactions();
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
                                <TableCell><strong>Ações</strong></TableCell>
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
                                    <TableCell>
                                        <>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEdit(transaction.id)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="secondary"
                                                onClick={() => {
                                                    setToDelete(transaction.id);
                                                    setModalOpen(true);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    </TableCell>
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

            <ConfirmationModal
                open={modalOpen}
                message="Tem certeza que deseja excluir esta transação?"
                onClose={() => setModalOpen(false)}
                onConfirm={() => toDelete && handleDelete(toDelete)}
            />
        </div>
    );
};
