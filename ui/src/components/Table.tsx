// Import necessary dependencies
import React from 'react';
import { Table } from 'antd';

// Define the type for your data
interface DataType {
    key: number;
    name: string;
    age: number;
    address: string;
}

// Create sample data
const data: DataType[] = [
    {
        key: 1,
        name: 'John Doe',
        age: 28,
        address: '123 Main St',
    },
    {
        key: 2,
        name: 'Jane Smith',
        age: 32,
        address: '456 Oak Dr',
    },
    // Add more data as needed
];

// Define columns for the DataTable
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

// Create a functional component to render the DataTable
const MyDataTable: React.FC = () => {
    return (
        <Table<DataType>
            dataSource={data}
            columns={columns}
        />
    );
};

export default MyDataTable;
