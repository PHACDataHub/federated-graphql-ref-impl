// Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sider from './Sider';
import { Layout } from 'antd';

const { Content } = Layout;

interface LayoutProps {
    children: React.ReactNode;
}

const CustomLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider />
            <Layout>
                <Header />
                <Content style={{ margin: '6vh 4vh 0' }}>
                    {children}
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
};

export default CustomLayout;
