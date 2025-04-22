export enum TransactionType {
    Receita = 1,
    Despesa = 2
}

export enum TransactionStatus {
    Pendente = 1,
    Concluída = 2,
    Falhou = 3,
}

export enum PaymentType {
    Dinheiro = 1,
    CartaoCredito = 2,
    CartaoDebito = 3,
    Pix = 4,
    TransferenciaBancaria = 5,
    Outro = 6
}

export type Transaction = {
    id: string;
    amount: number;
    description?: string;
    date: string;
    type: TransactionType;
    status: TransactionStatus;
    paymentType: PaymentType;
    categoryId: string;
    categoryName: string;
    userName: string;
}

export type TransactionRequest = {
    categoryId: string;
    description?: string;
    amount: number;
    date: string;
    type: TransactionType;
    status: TransactionStatus;
    paymentType: PaymentType;
}

export type ApiGetTransactions = Transaction[];


export type ApiGetTransaction = Transaction;

export type ApiNewTransaction = {
    message: string;
}

export type ApiUpdateTransaction = {
    message: string;
}

export type ApiDeleteTransaction = {
    message: string;
}
