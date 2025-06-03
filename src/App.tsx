import { Button, Card, Empty, Form, Input, Spin, Typography } from 'antd';
import styles from './App.module.less';
import { useState } from 'react';
import Layout from './components/Layout';
import { ClearOutlined, LoadingOutlined, SettingOutlined } from '@ant-design/icons';

const { Text } = Typography;

function App() {
    const [form] = Form.useForm();

    const originalValue = Form.useWatch('original', form);

    const [newValue, setNewValue] = useState('');

    const [loading, setLoading] = useState(false);

    const build = () => {
        setNewValue('');
        setLoading(true);
        setTimeout(() => {
            setNewValue(originalValue);
            setLoading(false);
        }, 3000);
    };

    const post = () => {
        window.open('https://www.toutiao.com/');
    };

    const showSettings = () => {};

    const clear = () => {};

    return (
        <Layout>
            <Card>
                <div className={styles.cardBody}>
                    <Spin
                        spinning={loading}
                        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
                    >
                        <div className={styles.textBox}>
                            <Input.TextArea value={newValue} placeholder='' rows={10} disabled />
                            {!newValue && !loading ? (
                                <Empty
                                    className={styles.empty}
                                    description='生成的文章将展示在这里'
                                />
                            ) : null}
                        </div>
                    </Spin>

                    <div className={styles.settingBox}>
                        <Text type='secondary'>{newValue.length || 0} 字</Text>
                        <div className={styles.settingButtons}>
                            <Button onClick={showSettings}>
                                <SettingOutlined />
                            </Button>
                            <Button onClick={clear}>
                                <ClearOutlined />
                            </Button>
                        </div>
                    </div>
                    <div className={styles.actionButtons}>
                        <Button
                            type='primary'
                            size='large'
                            block
                            disabled={!originalValue}
                            onClick={build}
                            loading={loading}
                        >
                            {loading ? '生成中' : '生成文章'}
                        </Button>
                        <Button size='large' block disabled={!newValue} onClick={post}>
                            发布头条
                        </Button>
                    </div>
                    <Form className={styles.form} layout={'vertical'} form={form}>
                        <Form.Item label='原文' name='original'>
                            <Input.TextArea placeholder='输入原文' rows={10} />
                        </Form.Item>
                        <Form.Item label='其他要求（可选）'>
                            <Input.TextArea placeholder='输入要求' rows={4} />
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </Layout>
    );
}

export default App;
