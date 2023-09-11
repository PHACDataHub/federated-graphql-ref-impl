// Header.tsx
import React from 'react';
import { theme } from 'antd';

import { Layout } from 'antd';
const { Header } = Layout;

const CustomHeader: React.FC = () => {
    const { token: { colorBgContainer } } = theme.useToken();
    return (
        <Header style={{ background: colorBgContainer }}>
            My Header
        </Header>
    );
};

export default CustomHeader;
