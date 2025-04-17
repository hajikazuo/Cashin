import { useState, useEffect } from "react";
import { getCategories } from "../../services/requests";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Alert,
} from "@mui/material";
import Breadcrumb from "../../components/layout/Breadcrumb";
import CustomPagination from "../../components/layout/Pagination";
import LoadingSpinner from "../../components/layout/LoadingSpinner";
import { Category } from "../../@types/Categories";

export const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const fetchCategories = async () => {
        try {
            const response = await getCategories(currentPage, 25);
            if (response.data) {
                setCategories(response.data);
                setTotalPages(response.headers.totalPages);
            }
        } catch (error) {
            console.error(error);
            setError('Erro ao buscar categorias');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [currentPage]);

    if (loading) {
        <LoadingSpinner size={60} color="primary" />
    }

    if (error) {
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
        </Alert>
    }

    return (
        <div>
            <Breadcrumb
                paths={[
                    { label: 'Home', href: '/home' },
                    { label: 'Categorias' },
                    { label: 'Categorias' },
                ]}
            />

            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Nome</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.name}</TableCell>
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
