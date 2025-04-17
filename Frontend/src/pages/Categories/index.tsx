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
    Typography,
} from "@mui/material";
import Breadcrumb from "../../components/layout/Breadcrumb";
import LoadingSpinner from "../../components/layout/LoadingSpinner";
import { Category } from "../../@types/Categories";
import AutoDismissAlert from "../../components/layout/Alert";

export const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            if (response.data) {
                setCategories(response.data);
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
    }, []);

    if (loading) {
        return <LoadingSpinner size={60} color="primary" />
    }

    if (error) {
        if (error) {
            <AutoDismissAlert
                type="error"
                message={error}
            />
        }
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

             <Typography variant="h3" gutterBottom>
                Categorias
            </Typography>

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
        </div>
    );
};
