import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import LogoUpload from './LogoUpload';

const InvoiceForm = () => {
  const [state, setState] = useState({
    isOpen: false,
    currency: '$',
    currentDate: '',
    invoiceNumber: 1,
    dateOfIssue: '',
    billfrom: '',
    billaddress: '',
    billcity: '',
    billstate: '',
    billpincode: '',
    billpan: '',
    billgst: '',
    billsupplace: '',
    billto: '',
    billtoaddress: '',
    billtocity: '',
    billtostate: '',
    billtopincode: '',
    billtout: '',
    shippingname: '',
    shippingaddress: '',
    shippingcity: '',
    shippingstate: '',
    shippingpincode: '',
    shippingut: '',
    shippingplace: '',
    ordernumber: '',
    orderdate: '',
    invoicenumber: '',
    invoicedetail: '',
    invoicedate: '',
    reversecharge: '',
    notes: '',
    total: '0.00',
    subTotal: '0.00',
    taxRate: '18',
    taxType:  '',
    taxAmmount: '0.00',
    discountAmount: '0.00',
    items: [
      {
        id: 0,
        name: '',
        description: '',
        price: '1.00',
        quantity: 1,
        discountRate: '0.00',
        discountAmount: '0.00',
       
      }
    ],
    logo: null,
    logoPreview: null,
    signature: null
  });
 


  useEffect(() => {
    handleCalculateTotal();
  }, [state.items, state.taxRate, state.discountRate]);

  const handleRowDel = (item) => {
    const items = state.items.filter(i => i.id !== item.id);
    setState({ ...state, items });
  };

  const handleAddEvent = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id,
      name: '',
      price: '1.00',
      description: '',
      quantity: 1,
      discountRate: '',
      discountAmount: '0.00',
    };
    setState({ ...state, items: [...state.items, newItem] });
  };

  const handleCalculateTotal = () => {
    const items = state.items;
    let subTotal = 0;
    let discountAmount = 0;

    items.forEach(item => {
      const netAmount = (parseFloat(item.price) * parseInt(item.quantity)) - (parseFloat(item.price) * parseInt(item.quantity) * (parseFloat(item.discountRate) / 100));
      subTotal += netAmount;
      discountAmount += (parseFloat(item.price) * parseInt(item.quantity) * (parseFloat(item.discountRate) / 100));
    });

    const isSamePlace = state.billpincode === state.shippingpincode;
    const taxRate = isSamePlace ? 18 : 18;
    const taxType = isSamePlace ? 'CGST(9%)/SGST(9%)' : 'IGST(18%)';

    const taxAmount = subTotal * (taxRate / 100);
    const cgstAmount = isSamePlace ? taxAmount / 2 : 0;
    const sgstAmount = isSamePlace ? taxAmount / 2 : 0;
    const igstAmount = isSamePlace ? 0 : taxAmount;

    const total = subTotal + taxAmount;

    setState({
      ...state,
      subTotal: subTotal.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      taxType,
      taxRate,
      cgstAmount: cgstAmount.toFixed(2),
      sgstAmount: sgstAmount.toFixed(2),
      igstAmount: igstAmount.toFixed(2),
      taxAmount: taxAmount.toFixed(2),

      total: total.toFixed(2)
    });
  };


  const onItemizedItemEdit = (evt) => {
    const item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    const items = state.items.slice();
    const newItems = items.map(i => {
      if (i.id === item.id) {
        i[item.name] = item.value;
      }
      return i;
    });
    setState({ ...state, items: newItems });
  };



  const editField = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onCurrencyChange = (event) => {
    setState({ ...state, currency: event.target.value });
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setState({ ...state, isOpen: true });
  };

  const closeModal = () => setState({ ...state, isOpen: false });


  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState({ ...state, logo: file, logoPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState({ ...state, signature: file, signaturePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Form onSubmit={openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              
              </div>
              <div className="d-flex flex-row align-items-center">
                

              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Seller Details</Form.Label>
                <Form.Control
                  placeholder="Name of Seller"
                  rows={3}
                  value={state.billfrom}
                  type="text"
                  name="billfrom"
                  className="my-2"
                  onChange={editField}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder="Address Line 1"
                  value={state.billaddress}
                  type="text"
                  name="billaddress"
                  className="my-2"
                  onChange={editField}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder="City"
                  value={state.billcity}
                  type="text"
                  name="billcity"
                  className="my-2"
                  autoComplete="address"
                  onChange={editField}
                  required
                />
                <Form.Control
                  placeholder="State"
                  rows={3}
                  value={state.billstate}
                  type="text"
                  name="billstate"
                  className="my-2"
                  onChange={editField}
                  autoComplete="name"
                  required
                />

                <Form.Control
                  placeholder="Pincode"
                  rows={3}
                  value={state.billpincode}
                  type="integer"
                  name="billpincode"
                  className="my-2"
                  onChange={editField}
                  autoComplete="pincode"
                  required
                />
                <Form.Control
                  placeholder="PAN No."
                  rows={3}
                  value={state.billpan}
                  type="integer"
                  name="billpan"
                  className="my-2"
                  onChange={editField}
                  autoComplete="PAN"
                  required
                />
                <Form.Control
                  placeholder="GST Registration No."
                  rows={3}
                  value={state.billgst}
                  type="integer"
                  name="billgst"
                  className="my-2"
                  onChange={editField}
                  autoComplete="gst"
                  required
                />
                <Form.Control
                  placeholder="Place Of Supply"
                  rows={3}
                  value={state.billsupplace}
                  type="text"
                  name="billsupplace"
                  className="my-2"
                  onChange={editField}
                  autoComplete="place"
                  required
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Billing Details</Form.Label>
                <Form.Control
                  placeholder="Name of Buyer"
                  rows={3}
                  value={state.billto}
                  type="text"
                  name="billto"
                  className="my-2"
                  onChange={editField}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder="Address Line 1"
                  value={state.billtoaddress}
                  type="text"
                  name="billtoaddress"
                  className="my-2"
                  onChange={editField}
                  autoComplete="address"
                  required
                />
                <Form.Control
                  placeholder="City"
                  value={state.billtocity}
                  type="text"
                  name="billtocity"
                  className="my-2"
                  autoComplete="city"
                  onChange={editField}
                  required
                />
                <Form.Control
                  placeholder="State"
                  rows={3}
                  value={state.billtostate}
                  type="text"
                  name="billtostate"
                  className="my-2"
                  onChange={editField}
                  autoComplete="state"
                  required
                />
                <Form.Control
                  placeholder="pincode"
                  rows={3}
                  value={state.billtopincode}
                  type="integer"
                  name="billtopincode"
                  className="my-2"
                  onChange={editField}
                  autoComplete="pincode"
                  required
                />
                <Form.Control
                  placeholder="UT Code"
                  rows={3}
                  value={state.billtout}
                  type="text"
                  name="billtout"
                  className="my-2"
                  onChange={editField}
                  autoComplete="ut"
                  required
                />
              </Col>
            </Row>

            <hr className="my-2" />
            {/* ........................................................................ */}
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Shipping Details</Form.Label>
                <Form.Control
                  placeholder="Name"
                  rows={3}
                  value={state.shippingname}
                  type="text"
                  name="shippingname"
                  className="my-2"
                  onChange={editField}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder="Address Line 1"
                  value={state.shippingaddress}
                  type="text"
                  name="shippingaddress"
                  className="my-2"
                  onChange={editField}
                  autoComplete="address"
                  required
                />
                <Form.Control
                  placeholder="City"
                  value={state.shippingcity}
                  type="text"
                  name="shippingcity"
                  className="my-2"
                  autoComplete="city"
                  onChange={editField}
                  required
                />
                <Form.Control
                  placeholder="State"
                  rows={3}
                  value={state.shippingstate}
                  type="text"
                  name="shippingstate"
                  className="my-2"
                  onChange={editField}
                  autoComplete="state"
                  required
                />

                <Form.Control
                  placeholder="Pincode"
                  rows={3}
                  value={state.shippingpincode}
                  type="integer"
                  name="shippingpincode"
                  className="my-2"
                  onChange={editField}
                  autoComplete="pincode"
                  required
                />
                <Form.Control
                  placeholder="State/UT Code"
                  rows={3}
                  value={state.shippingut}
                  type="text"
                  name="shippingut"
                  className="my-2"
                  onChange={editField}
                  autoComplete="ut"
                  required
                />
                <Form.Control
                  placeholder="Place Of Delivery"
                  rows={3}
                  value={state.shippingplace}
                  type="integer"
                  name="shippingplace"
                  className="my-2"
                  onChange={editField}
                  autoComplete="place"
                  required
                />

              </Col>
              <Col>
                <Col>
                  <Form.Label className="fw-bold">Order Details</Form.Label>
                  <Form.Control
                    placeholder="Order Number"
                    value={state.ordernumber}
                    type="text"
                    name="ordernumber"
                    className="my-2"
                    onChange={editField}
                    autoComplete="off"
                    required
                  />
                  <Row className="mb-3">
                    <Col xs="auto">
                      <Form.Label className="my-2">Order Date:</Form.Label>
                    </Col>
                    <Col>
                      <DatePicker
                        selected={state.orderdate ? new Date(state.orderdate) : null}
                        onChange={(date) => editField({ target: { name: 'orderdate', value: date.toISOString().split('T')[0] } })}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select order date"
                        customInput={
                          <Form.Control
                            type="text"
                            value={state.orderdate}
                            name="orderdate"
                            placeholder="Select order date"
                            className="max-w-xs"
                            required
                          />
                        }
                      />
                    </Col>
                  </Row>
                  <hr className="my-4" />
                </Col>
                <Row>
                  <Form.Label className="fw-bold">Invoice Details</Form.Label>
                  <Form.Control
                    placeholder="Invoice Number"
                    value={state.invoicenumber}
                    type="integer"
                    name="invoicenumber"
                    className="my-2"
                    autoComplete="number"
                    onChange={editField}
                    required
                  />
                  <Form.Control
                    placeholder="Invoice Detail"
                    rows={3}
                    value={state.invoicedetail}
                    type="text"
                    name="invoicedetail"
                    className="my-2"
                    onChange={editField}
                    autoComplete="detail"
                    required
                  />
                  <Row className="flex justify-center items-center">
                    <Col className="my-2">
                      <Form.Label>Invoice Date:</Form.Label>
                    </Col>
                    <Col >
                      <DatePicker
                        selected={state.invoicedate ? new Date(state.invoicedate) : null}
                        onChange={(date) => editField({ target: { name: 'invoicedate', value: date.toISOString().split('T')[0] } })}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select invoice date"
                        customInput={
                          <Form.Control
                            type="text"
                            value={state.invoicedate}
                            name="invoicedate"
                            placeholder="Select invoice date"
                            className="max-w-xs"
                            required
                          />
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center my-2">
                    <Col xs={12} md={6}>
                      <Form.Label className="mb-0">Reverse Charge</Form.Label>
                    </Col>
                    <Col xs={8} md={4}>
                      <Form.Control
                        as="select"
                        value={state.reversecharge}
                        name="reversecharge"
                        onChange={editField}
                        autoComplete="off"
                        required
                        className="form-select"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Form.Control>
                    </Col>
                  </Row>

                </Row>

              </Col>
              <hr className="my-3" />
            </Row>


            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={state.currency}
              items={state.items}
            />
          

            <Row className="mt-4">
              <Col md={5} className="ms-auto">
                <InputGroup className="d-flex justify-content-end">
                  <InputGroup.Text className="bg-light fw-bold">Discount</InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={state.discountAmount}
                    name="discountAmount"
                    readOnly
                  />
                </InputGroup>


                <InputGroup className="d-flex justify-content-end">
                  <InputGroup.Text className="bg-light fw-bold">Subtotal</InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={state.subTotal}
                    name="subTotal"
                    readOnly
                  />
                </InputGroup>
                
                <InputGroup className="d-flex justify-content-end">
                  <InputGroup.Text className="bg-light fw-bold">Tax Rate (%)</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={state.taxRate}
                    name="taxRate"
                    readOnly
                  // onChange={editField}
                  // onBlur={handleCalculateTotal}
                  />
                </InputGroup>
                

                <InputGroup className="d-flex justify-content-end">
                  <InputGroup.Text className="bg-light fw-bold">Tax</InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={state.taxAmount}
                    name="taxAmount"
                    readOnly
                  />
                </InputGroup>
                <InputGroup className="d-flex justify-content-end">
                  <InputGroup.Text className="bg-light fw-bold">Total</InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={state.total}
                    name="total"
                    readOnly
                  />
                </InputGroup>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Upload Logo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
              {state.logoPreview && (
                <img
                  src={state.logoPreview}
                  alt="Logo Preview"
                  className="img-fluid mt-2"
                  style={{ maxHeight: '100px', maxWidth: '200px' }}
                />
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Upload Signature</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleSignatureChange}
              />
              {state.signaturePreview && (
                <img
                  src={state.signaturePreview}
                  alt="Signature Preview"
                  className="img-fluid mt-2"
                  style={{ maxHeight: '100px', maxWidth: '200px' }}
                />
              )}
            </Form.Group>



            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="notes"
              value={state.notes}
              onChange={editField}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="d-flex flex-column justify-content-between p-4 p-xl-5 my-3 my-xl-4">
            <Button
              variant="primary"
              type="submit"
              className="d-flex justify-content-center align-items-center mb-4"
              style={{ minHeight: '50px', fontSize: '1.25rem' }}>
              Review Invoice
            </Button>

            <Card className="mt-3 mt-xl-4 p-3 p-xl-4">
              <Form.Label className="fw-bold mb-3">Currency</Form.Label>
              <Form.Select
                aria-label="Select currency"
                onChange={onCurrencyChange}
                value={state.currency}
              >
                <option value="$">USD ( $ )</option>
                <option value="₹">INR ( ₹ )</option>
                <option value="£">GBP ( £ )</option>
                <option value="€">EUR ( € )</option>
              </Form.Select>
              <div className="mt-3">
                <Form.Label className="fw-bold mb-2">Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Notes - any relevant information not already covered"
                  name="notes"
                  value={state.notes}
                  onChange={editField}
                />
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      <InvoiceModal
        showModal={state.isOpen}
        closeModal={closeModal}
        info={state}
        items={state.items}
        currency={state.currency}
        subTotal={state.subTotal}
        taxAmmount={state.taxAmount}
        discountAmount={state.discountAmount}
        total={state.total}
        taxRate={state.taxRate}
        taxType={state.taxType}
        // logo={state.logo}
        // signature={state.signature}
      />
    </Form>
  );
};

export default InvoiceForm;


