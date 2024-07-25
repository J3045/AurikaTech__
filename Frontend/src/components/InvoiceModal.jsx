import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from 'react-icons/bi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const generateInvoice = (captureId) => {
  html2canvas(document.querySelector(captureId)).then((canvas) => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [1224, 1584]
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // if (logoUrl) {
    //   pdf.addImage(logoUrl, 'PNG', 10, 10, 50, 50); // Adjust positioning and size as needed
    // }

    pdf.save('invoice-001.pdf');
  }).catch(error => {
    console.error('Error generating PDF:', error);
  });
};

const InvoiceModal = ({ showModal, closeModal, info, items, currency, total, subTotal, taxAmmount, discountAmount, taxRate, taxType, logo, signature }) => {
  const handleGenerateInvoice = () => {
    generateInvoice("#invoiceCapture");
  };
  
  return (
    <div>
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <div id="invoiceCapture">
          <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
            <div className="w-100">
              
              <h6 className="fw-bold text-secondary mb-1">
                Invoice #: {info.invoicenumber || ''}
              </h6>

              <div>{logo && <img src={info.logo} alt="Logo" style={{ maxWidth: '100px' }} />}</div>
            </div>
            <div className="text-end ms-4">
             

             
            </div>
          </div>
          <div className="p-4">
            <Row className="mb-4 ">
              <Col md={6}>
                <div className="fw-bold">Sold By:</div>
                <div>{info.billfrom || ''}</div>
                <div>{info.billaddress || ''}</div>
                <div>{info.billcity || ''}</div>
                <div>{info.billstate || ''}</div>
                <div>{info.billpincode || ''}</div>

              <Row><Col>
                <div className='fw-bold'>Pan No:</div>
                </Col>
                <Col>
              <div>{info.billpan || ''}</div>
              </Col>
              </Row>
              <Row><Col>
                <div className='fw-bold'>GST No:</div>
                </Col>
                <Col>
                <div>{info.billgst || ''}</div>
              </Col>
              </Row>
               <Row className='mt-5'>
                <Col>
                <div className='fw-bold'>Order Number:</div>
                </Col>
                <Col>
                <div>{info.ordernumber || ''}</div>
                </Col>
               </Row>
               <Row>
                <Col>
                <div className='fw-bold'>Order Date:</div>
                </Col>
                <Col>
                <div>{info.orderdate || ''}</div>
                </Col>
               </Row>
                
                
              </Col>
              <Col md={6}>
                <div className="fw-bold">Billing Address:</div>
                <div>{info.billto || ''}</div>
                <div>{info.billtoaddress || ''}</div>
                <div>{info.billtocity || ''}</div>
                <div>{info.billtostate || ''}</div>
                <div>{info.billtopincode || ''}</div>
                <div><span className='fw-bold'>State/UT Code:</span> {info.billtout || ''}</div>

                <div className="fw-bold">Shipping Address:</div>
                <div>{info.shippingname || ''}</div>
                <div>{info.shippingaddress || ''}</div>
                <div>{info.shippingcity || ''}</div>
                <div>{info.shippingstate || ''}</div>
                <div>{info.shippingpincode || ''}</div>
                <div><span className='fw-bold'>State/UT Code:</span>{info.shippingut || ''} </div>
                  <div><span className='fw-bold'>Place of Supply:</span>{info.billsupplace || ''}</div>
                  <div><span className='fw-bold'>Place of Delivery:</span>{info.shippingplace || ''}</div>
                  <div><span className='fw-bold'>Invoice Number:</span>{info.invoicenumber || ''}</div>
                  <div><span className='fw-bold'>Invoice Details:</span>{info.invoicedetail || ''}</div>
                  <div><span className='fw-bold'>Invoice Date:</span>{info.invoicedate || ''}</div>
          

              </Col>
            
            </Row>
            <Table className="mb-0">
              <thead>
                <tr>
                  <th>QTY</th>
                  <th>DESCRIPTION</th>
                  <th className="text-end">Unit Price</th>
               
                  <th className="text-end">Discount</th> 
                  <th className="text-end">Discount Ammount</th>
                  <th className="text-end">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr id={i} key={i}>
                    <td style={{ width: '70px' }}>{item.quantity}</td>
                    <td>{item.name} - {item.description}</td>
                    <td className="text-end" style={{ width: '100px' }}>{currency} {item.price}</td>
                    <td className="text-end" style={{ width: '100px' }}> {item.discountRate}%</td>
                    <td className="text-end" style={{ width: '100px' }}>{currency} {(item.price * item.quantity * (item.discountRate / 100)).toFixed(2)}</td>
                    <td className="text-end" style={{ width: '100px' }}>{currency} {(item.price * item.quantity - item.price * item.quantity * (item.discountRate / 100)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Table>
              <tbody>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: '100px' }}>SUBTOTAL</td>
                  <td className="text-end" style={{ width: '100px' }}>{currency} {subTotal}</td>
                </tr>
                 
                
              
                
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: '100px' }}>Tax Type</td>
                    <td className="text-end" style={{ width: '100px' }}>{taxType}</td>
                  </tr>
                
                {taxRate !== 0.00 && (
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: '100px' }}>Total Tax</td>
                    <td className="text-end" style={{ width: '100px' }}>{taxRate}%</td>
                  </tr>
                )}
                {taxAmmount !== 0.00 && (
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: '100px' }}>TAX Amount</td>
                    <td className="text-end" style={{ width: '100px' }}>{taxAmmount}</td>
                  </tr>
                )}
                {/* {discountAmmount !== 0.00 && (
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: '100px' }}>DISCOUNT</td>
                    <td className="text-end" style={{ width: '100px' }}>{currency} {discountAmmount}</td>
                  </tr>
                )} */}
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: '100px' }}>TOTAL</td>
                  <td className="fw-bold text-end" style={{ width: '100px' }}>{currency} {total}</td>
                </tr>
              </tbody>
            </Table>
            {info.notes && (
              <div className="bg-light py-3 px-4 rounded">
                {info.notes}
              </div>
            )}
          </div>
        </div>
        <div className="pb-4 px-4">
          <Row>
            <Col md={6}>
              <Button variant="primary" className="d-block w-100" onClick={handleGenerateInvoice}>
                <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />
                Send Invoice
              </Button>
            </Col>
            <Col md={6}>
              <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={handleGenerateInvoice}>
                <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
                Download Copy
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
      <hr className="mt-4 mb-3" />
    </div>
  );
};

export default InvoiceModal;
