import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from 'react-icons/bi';
import EditableField from './EditableField';

const InvoiceItem = ({ items, onItemizedItemEdit, onRowDel, onRowAdd, currency }) => {
  const handleRowDel = (item) => {
    onRowDel(item);
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th>DISCOUNT%</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onItemizedItemEdit={onItemizedItemEdit}
              onRowDel={handleRowDel}
              currency={currency}
            />
          ))}
        </tbody>
      </Table>
      <Button className="fw-bold" onClick={onRowAdd} aria-label="Add Item">
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = ({ item, onItemizedItemEdit, onRowDel, currency }) => {
  const handleDelEvent = () => {
    onRowDel(item);
  };

  return (
    <tr>
      <td style={{ width: '100%' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: 'text',
            name: 'name',
            placeholder: 'Item name',
            value: item.name,
            id: item.id.toString(),
          }}
        />
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: 'text',
            name: 'description',
            placeholder: 'Item description',
            value: item.description,
            id: item.id.toString(),
          }}
        />
      </td>
      <td style={{ minWidth: '70px' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: 'number',
            name: 'quantity',
            min: 1,
            step: '1',
            value: item.quantity,
            id: item.id.toString(),
          }}
        />
      </td>
      <td style={{ minWidth: '130px' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: 'number',
            name: 'price',
            min: 1,
            step: '0.01',
            precision: 2, 
            textAlign: 'text-end',
            value: item.price,
            id: item.id.toString(),
          }}
        />
      </td>

      <td style={{ minWidth: '70px' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: 'number',
            name: 'discountRate',
            min: 0,
            max: 100,
            step: '1',
            value: item.discountRate,
            id: item.id.toString(),
          }}
        />
        </td>
      <td className="text-center" style={{ minWidth: '50px' }}>
        <BiTrash
          onClick={handleDelEvent}
          style={{ height: '33px', width: '33px', padding: '7.5px' }}
          className="text-white mt-1 btn btn-danger"
          aria-label="Delete Item"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
