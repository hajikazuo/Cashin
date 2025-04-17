import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { newCategory } from "../../services/requests";
import LoadingSpinner from "../../components/layout/LoadingSpinner";
import AutoDismissAlert from "../../components/layout/Alert";
import Breadcrumb from "../../components/layout/Breadcrumb";
import { CategoryRequest } from "../../@types/Categories";

export const NewCategory = () => {
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

    const handleOnClick = async () => {
        const category: CategoryRequest = {
            name: nameValue
        };

        setLoadingRequest(true);
        const request = await newCategory(category);
        setLoadingRequest(false);

        if (request.error) {
            setShowAlert({ type: "error", message: request.error, show: true });
        } else {
            setShowAlert({
                type: "success",
                message: "Categoria criada com sucesso!",
                show: true,
            });
            setNameValue("");
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
                    { label: 'Adicionar' },
                ]}
            />

            <Typography variant="h3" gutterBottom>
                Adicionar categoria
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
                    {loadingRequest ? "Enviando..." : "Cadastrar"}
                </Button>
            </Box>
        </div>
    );
};
