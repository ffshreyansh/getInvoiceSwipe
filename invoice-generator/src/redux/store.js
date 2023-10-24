import { configureStore } from '@reduxjs/toolkit'
import InvoiceSlice from '../redux/slices/formEvents/index'

export const store = configureStore({
    reducer: {
        invoices: InvoiceSlice,
    },
});
