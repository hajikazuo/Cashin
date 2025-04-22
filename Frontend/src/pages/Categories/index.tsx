import { useState, useEffect } from "react";
import { deleteCategory, getCategories } from "../../services/requests";
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
    IconButton,
} from "@mui/material";
import Breadcrumb from "../../components/layout/Breadcrumb";
import LoadingSpinner from "../../components/layout/LoadingSpinner";
import { Category } from "../../@types/Categories";
import AutoDismissAlert from "../../components/layout/Alert";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from "../../components/layout/ConfirmationModal";

export const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [toDelete, setToDelete] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleEdit = (id: string) => navigate(`/categorias/editar/${id}`)

    const handleDelete = async (id: string) => {
        try {
            await deleteCategory(id);
            setModalOpen(false);
            handleGetCategories();
        } catch (error) {
            console.error(error);
            setError('Erro ao deletar');
        }
    }

    const handleGetCategories = async () => {
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
        handleGetCategories();
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
                                <TableCell><strong>Ações</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        {category.userId && (
                                            <>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEdit(category.id)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => {
                                                        setToDelete(category.id);
                                                        setModalOpen(true);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <ConfirmationModal
                open={modalOpen}
                message="Tem certeza que deseja excluir esta categoria?"
                onClose={() => setModalOpen(false)}
                onConfirm={() => toDelete && handleDelete(toDelete)}
            />
        </div>
    );
};
