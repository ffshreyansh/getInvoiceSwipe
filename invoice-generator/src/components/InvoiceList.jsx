import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { deleteInvoice } from '../redux/slices/formEvents';
import '../App.css';


const InvoiceList = () => {
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const invoices = useSelector((state) => state.invoices.invoices);

    const toggleDropdown = (index) => {
        if (openDropdownIndex === index) {
          setOpenDropdownIndex(null);
        } else {
          setOpenDropdownIndex(index);
        }
      };

    // function hideTG(){
    //     setOpenDropdownIndex(null);
    // }
    const handleAdd = () => {
        navigate("/invoice", { state: null });
    };

    const handleEdit = (invoice) => {
        navigate(`/invoice/${invoice.invoiceNumber}`, {
            state: { ...invoice, copymode: false },
        });
    };

    const handleDelete = (invoiceNumber) => {
        dispatch(deleteInvoice(invoiceNumber));
    };

    const handleCopy = (invoice) => {
        navigate("/invoice", { state: { ...invoice, copymode: true } });
    };


    const openInvoiceModal = (invoice) => {
        setSelectedInvoice(invoice);
        setShowInvoiceModal(true);
    };

    const closeInvoiceModal = () => {
        setSelectedInvoice(null);
        setShowInvoiceModal(false);
    };

    

    return (
        <div className="xp vh-100 " style={{ backgroundColor: "#f2f3f7" }} >
            <div className='bg-white vh-100 border p-2 p-md-4 p-sm-3 ' style={{ borderRadius: "14px", overflow: "hidden" }}>
                <div className="text-center mb-3 d-flex flex-column flex-md-row gap-2 w-md-100 align-items-center justify-content-between mb-5">
                    <h1 className='mb-0'><strong>SWIPE</strong> <em>INVOICES</em></h1>
                    <Button
                        className="text-center btn btn-primary px-5 mt-3 mt-md-0"
                        onClick={handleAdd}
                    >
                        Generate Invoice
                    </Button>
                </div>


                <Table className="text-center">
                    <thead>
                        <tr>
                            <th>S/No.</th>
                            <th>Date</th>
                            <th>Billed To</th>
                            <th>Billed From</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center text-dark border-0">
                                    No Invoices yet...
                                </td>
                            </tr>
                        ) : (
                            invoices.map((invoice, index) => (
                                <tr key={invoice.invoiceNumber}>
                                    <td className="text-center">{invoice.invoiceNumber}</td>
                                    <td className="text-center">{invoice.dateOfIssue}</td>
                                    <td className="text-center">{invoice.billTo}</td>
                                    <td className="text-center">{invoice.billFrom}</td>
                                    <td className="text-center dropdown">
                                        <input type="checkbox" className="dropdown-toggle" id={`dropdown-${invoice.invoiceNumber}`} />
                                        <label htmlFor={`dropdown-${invoice.invoiceNumber}`}>
                                            <i class="fa-solid fa-ellipsis-v fs-5 " onClick={() => toggleDropdown(index)}></i>
                                        </label>
                                        {openDropdownIndex === index && (
                                        <ul className="dropdown-menu">
                                            <li>
                                                <button onClick={() => openInvoiceModal(invoice)} className='d-flex align-items-center justify-content-between gap-3'>
                                                    <i class="fa-solid fa-eye fs-5"></i> View
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => handleEdit(invoice)} className='d-flex align-items-center justify-content-between gap-3'>
                                                    <i class="fa-solid fa-pen-to-square fs-5"></i> Edit
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => handleCopy(invoice)} className='d-flex align-items-center justify-content-between gap-3'>
                                                    <i class="fa-solid fa-copy fs-5"></i> Copy
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => handleDelete(invoice.invoiceNumber)} className='d-flex align-items-center justify-content-between gap-3'>
                                                    <i class="fa-solid fa-trash fs-5"></i> Delete
                                                </button>
                                            </li>
                                        </ul>
                                        )}
                                    </td>
                                </tr>
                            )))
                        }
                    </tbody>
                </Table>

            </div>
            <Modal
                show={showInvoiceModal}
                onHide={closeInvoiceModal}
                dialogClassName="modal-a4"
                centered
                className="mw-100"
            >
                <Modal.Header closeButton className='p-4'>
                    <Modal.Title>Invoice Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedInvoice && (
                        <div className="container mx-auto p-3">
                            <div className="row">
                                <div className="col">
                                    <h3>Invoice</h3>
                                    <p>Invoice Number: {selectedInvoice.invoiceNumber}</p>
                                    <p>Date of Issue: {selectedInvoice.dateOfIssue}</p>
                                </div>
                                <div className="col text-end">
                                    <h3>Bill From</h3>
                                    <p>From: {selectedInvoice.billFrom}</p>
                                    <p>Address: {selectedInvoice.billFromAddress}</p>
                                    <p>Email: {selectedInvoice.billFromEmail}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h3>Bill To</h3>
                                    <p>To: {selectedInvoice.billTo}</p>
                                    <p>Address: {selectedInvoice.billToAddress}</p>
                                    <p>Email: {selectedInvoice.billToEmail}</p>
                                </div>
                            </div>
                            <h5 className="text-center">Items:</h5>
                            <table className="table table-bordered table-centered">
                                <thead>
                                    <tr>
                                        <th className="text-center ">Name</th>
                                        <th className="text-center ">Description</th>
                                        <th className="text-center ">Price</th>
                                        <th className="text-center ">Quantity</th>
                                        <th className="text-center ">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedInvoice.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="text-center ">{item.name}</td>
                                            <td className="text-center ">
                                                {item.description}
                                            </td>
                                            <td className="text-center ">{item.price}</td>
                                            <td className="text-center ">
                                                {item.quantity}
                                            </td>
                                            <td className="text-center ">
                                                {(item.price * item.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="row mt-4">
                                <div className="col">
                                    <p>Notes: {selectedInvoice.notes}</p>
                                </div>
                                <div className="col text-end">
                                    <p>Currency: {selectedInvoice.currency}</p>
                                    <p>Subtotal: {selectedInvoice.subTotal}</p>
                                    <p>
                                        Discount: {selectedInvoice.discountRate}% (
                                        {selectedInvoice.discountAmmount})
                                    </p>
                                    <p>
                                        Tax: {selectedInvoice.taxRate}% (
                                        {selectedInvoice.taxAmmount})
                                    </p>
                                    <h4>Total: {selectedInvoice.total}</h4>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" className='px-5' onClick={closeInvoiceModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InvoiceList;