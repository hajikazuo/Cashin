import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCategory, updateCategory } from "../../services/requests";
import LoadingSpinner from "../../components/layout/LoadingSpinner";
import AutoDismissAlert from "../../components/layout/Alert";
import Breadcrumb from "../../components/layout/Breadcrumb";
import { CategoryRequest } from "../../@types/Categories";
import { useParams } from "react-router-dom";

export const UpdateCategory = () => {
    const { id } = useParams<{ id: string }>();
    const [loadingRequest, setLoadingRequest] = useState(false);

    const [showAlert, setShowAlert] = useState<{
        type: 'error' | 'success',
        message: string,
        show: boolean
    }>({
        type: 'error',
        message: '',
        show: false
    });

    const [nameValue, setNameValue] = useState("");

    useEffect(() => {
            if (!id) return;
        
            const fetchCategory = async () => {
                try {
                    const response = await getCategory(id);
                    const t = response?.data;
    
                    if (!t) {
                        throw new Error("Categoria não encontrada.");
                    }                 
                    setNameValue(t.name);
                } catch (error) {
                    console.error(error);
                    setShowAlert({ type: "error", message: "Erro ao carregar categoria", show: true });
                }
            };
        
            fetchCategory();
        }, [id]);

    const handleOnClick = async () => {
        if (!id) return;

        const category: CategoryRequest = {
            name: nameValue
        };

        setLoadingRequest(true);
        const request = await updateCategory(id, category);
        setLoadingRequest(false);

        if (request.error) {
            setShowAlert({ type: "error", message: request.error, show: true });
        } else {
            setShowAlert({
                type: "success",
                message: "Categoria editada com sucesso!",
                show: true,
            });
        }
    };

    if (loadingRequest) {
        return <LoadingSpinner size={60} color="primary" />
    }

    return (
        <div>
            {showAlert.show && (
                <AutoDismissAlert
                    type={showAlert.type}
                    message={showAlert.message}
                />
            )}

            <Breadcrumb
                paths={[
                    { label: 'Home', href: '/home' },
                    { label: 'Categorias' },
                    { label: 'Editar' },
                ]}
            />

            <Typography variant="h3" gutterBottom>
                Editar categoria
            </Typography>

            <Box>
                <TextField
                    fullWidth
                    label="Nome"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

                <Button
                    variant="contained"
                    onClick={handleOnClick}
                    fullWidth
                    disabled={loadingRequest}
                >
                    {loadingRequest ? "Enviando..." : "Salvar"}
                </Button>
            </Box>
        </div>
    );
};
