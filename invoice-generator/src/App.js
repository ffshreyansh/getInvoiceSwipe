import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<InvoiceList/>}/>
        <Route path="/invoice" element={ 
          <Container>
            <InvoiceForm />
          </Container>
        } />
         <Route path="invoice/:id" element={<InvoiceForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
