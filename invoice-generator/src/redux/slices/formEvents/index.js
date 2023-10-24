import { createSlice } from "@reduxjs/toolkit";
import { loadInvoices, saveInvoices } from "../../../localInvoices/local";


const initialState = {
    invoices: loadInvoices(),
};

const InvoiceSlice = createSlice({
    name: "invoices",
    initialState,
    reducers: {
        addInvoice: (state, action) => {
            const existingInvoiceNumbers = state.invoices.map((invoice) => invoice.invoiceNumber);

            const maxInvoiceNumber = Math.max(...existingInvoiceNumbers, 0);

            let newInvoiceNumber = maxInvoiceNumber + 1;
            while (existingInvoiceNumbers.includes(newInvoiceNumber)) {
                newInvoiceNumber++; 
            }

            const newInvoice = {
                ...action.payload,
                invoiceNumber: newInvoiceNumber,
                isOpen: false,
            };
            state.invoices.push(newInvoice);

            saveInvoices(state.invoices);
        },


        editInvoice: (state, action) => {
            state.invoices = state.invoices.map((invoice) =>
                invoice.invoiceNumber === action.payload.invoiceNumber ? action.payload : invoice
            );
            saveInvoices(state.invoices);
        },

        deleteInvoice: (state, action) => {
            const invoiceNumberToDelete = action.payload;

            state.invoices = state.invoices.filter(
                (invoice) => invoice.invoiceNumber !== invoiceNumberToDelete
            );
            saveInvoices(state.invoices);
        },

    },
});

export const { addInvoice, editInvoice, deleteInvoice } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
