import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { formatEnumToOptions } from "../../utils/formatEnumToOptions";
import {
    PaymentType,
    TransactionRequest,
    TransactionStatus,
    TransactionType,
} from "../../@types/Transaction";
import { getCategories, getTransaction, updateTransaction } from "../../services/requests";
import LoadingSpinner from "../../components/layout/LoadingSpinner";
import AutoDismissAlert from "../../components/layout/Alert";
import Breadcrumb from "../../components/layout/Breadcrumb";
import { useParams } from "react-router-dom";

export const UpdateTransaction = () => {
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
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [categoryIdValue, setCategoryIdValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [amountValue, setAmountValue] = useState<number | undefined>(undefined);
    const [dateValue, setDateValue] = useState("");
    const [transactionTypeValue, setTransactionTypeValue] = useState<number | string>("");
    const [transactionStatusValue, setTransactionStatusValue] = useState<number | string>("");
    const [paymentTypeValue, setPaymentTypeValue] = useState<number | string>("");

    useEffect(() => {
        if (!id) return;
    
        const fetchTransaction = async () => {
            try {
                const response = await getTransaction(id);
                const t = response?.data;

                if (!t) {
                    throw new Error("Transação não encontrada.");
                }
    
                setCategoryIdValue(t.categoryId ?? "");
                setDescriptionValue(t.description ?? "");
                setAmountValue(t.amount);
                setDateValue(t.date.split("T")[0]); 
                setTransactionTypeValue(t.type);
                setTransactionStatusValue(t.status);
                setPaymentTypeValue(t.paymentType);
            } catch (error) {
                console.error(error);
                setShowAlert({ type: "error", message: "Erro ao carregar transação", show: true });
            }
        };
    
        fetchTransaction();
    }, [id]);

    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response?.data || []);
            } catch (error) {
                console.error(error);
                setShowAlert({ type: "error", message: "Erro ao buscar categorias", show: true });
            }
        };

        fetchCategories();
    }, []);

    const handleOnClick = async () => {
        if (!id) return;

        const transaction: TransactionRequest = {
            categoryId: categoryIdValue,
            description: descriptionValue,
            amount: amountValue ?? 0,
            date: dateValue,
            type: Number(transactionTypeValue),
            status: Number(transactionStatusValue),
            paymentType: Number(paymentTypeValue),
        };

        setLoadingRequest(true);
        const request = await updateTransaction(id,transaction);
        setLoadingRequest(false);

        if (request.error) {
            setShowAlert({ type: "error", message: request.error, show: true });
        } else {
            setShowAlert({
                type: "success",
                message: "Transação editada com sucesso!",
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
                    { label: 'Transações' },
                    { label: 'Editar' },
                ]}
            />

            <Typography variant="h3" gutterBottom>
                Editar transação
            </Typography>

            <Box>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel id="category-label">Categoria</InputLabel>
                    <Select
                        labelId="category-label"
                        value={categoryIdValue}
                        onChange={(e) => setCategoryIdValue(e.target.value)}
                        label="Categoria"
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Descrição"
                    value={descriptionValue}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

                <TextField
                    fullWidth
                    label="Valor"
                    type="number"
                    value={amountValue}
                    onChange={(e) => setAmountValue(Number(e.target.value))}
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginBottom: 2 }}
                />

                <TextField
                    fullWidth
                    label="Data"
                    type="date"
                    value={dateValue}
                    onChange={(e) => setDateValue(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginBottom: 2 }}
                />

                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel id="transaction-type-label">Tipo de Transação</InputLabel>
                    <Select
                        labelId="transaction-type-label"
                        value={transactionTypeValue}
                        onChange={(e) => setTransactionTypeValue(Number(e.target.value))}
                        label="Tipo de Transação"
                    >
                        {formatEnumToOptions(TransactionType).map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel id="transaction-status-label">Status da Transação</InputLabel>
                    <Select
                        labelId="transaction-status-label"
                        value={transactionStatusValue}
                        onChange={(e) => setTransactionStatusValue(Number(e.target.value))}
                        label="Status da Transação"
                    >
                        {formatEnumToOptions(TransactionStatus).map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel id="payment-type-label">Tipo de Pagamento</InputLabel>
                    <Select
                        labelId="payment-type-label"
                        value={paymentTypeValue}
                        onChange={(e) => setPaymentTypeValue(Number(e.target.value))}
                        label="Tipo de Pagamento"
                    >
                        {formatEnumToOptions(PaymentType).map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

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
