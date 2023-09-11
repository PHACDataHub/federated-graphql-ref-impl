// Sider.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const CustomSider: React.FC = () => {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
            >
                {/* Wrap Menu items with Link components */}
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link to="/page1">nav 1</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    <Link to="/page2">nav 2</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    <Link to="/page3">nav 3</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default CustomSider;
