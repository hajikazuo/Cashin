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
import { getCategories, newTransaction } from "../../services/requests";
import LoadingSpinner from "../../components/layout/LoadingSpinner";
import AutoDismissAlert from "../../components/layout/Alert";
import Breadcrumb from "../../components/layout/Breadcrumb";

export const NewTransaction = () => {
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
        const request = await newTransaction(transaction);
        setLoadingRequest(false);

        if (request.error) {
            setShowAlert({ type: "error", message: request.error, show: true });
        } else {
            setShowAlert({
                type: "success",
                message: "Transação criada com sucesso!",
                show: true,
            });
            setCategoryIdValue("");
            setDescriptionValue("");
            setAmountValue(undefined);
            setDateValue("");
            setTransactionTypeValue("");
            setTransactionStatusValue("");
            setPaymentTypeValue("");
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
                    { label: 'Adicionar' },
                ]}
            />

            <Typography variant="h3" gutterBottom>
                Adicionar transação
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
                    {loadingRequest ? "Enviando..." : "Cadastrar"}
                </Button>
            </Box>
        </div>
    );
};
