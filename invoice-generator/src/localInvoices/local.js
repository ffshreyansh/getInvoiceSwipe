export const saveInvoices = (invoices) => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
};

export const loadInvoices = () => {
    const storedInvoices = localStorage.getItem('invoices');
    return storedInvoices ? JSON.parse(storedInvoices) : [];
};
