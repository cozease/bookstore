// design a error page for me
import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';
import { Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
const { Title } = Typography;

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="error-page" style={{ textAlign: 'center', padding: '50px' }}>
            <Result
                status="404"
                title="404"
                subTitle="抱歉，您访问的页面不存在或已被删除。"
                extra={
                    <Title level={5} style={{ marginTop: '20px' }}>
                        {error.statusText || error.message}
                    </Title>
                }
            />
            <Link to="/">
                <Button type="primary" icon={<HomeOutlined />}>
                    返回首页
                </Button>
            </Link>
        </div>
    );
}

export default ErrorPage;
