import { Button, Card, Form, Input, Spin } from 'antd';
import styles from './App.module.less';
import { useState } from 'react';

function App() {
    const [form] = Form.useForm();

    const originalValue = Form.useWatch('original', form);

    const [newValue, setNewValue] = useState('');

    const [loading, setLoading] = useState(false);

    const build = () => {
        setLoading(true);
        setTimeout(() => {
            setNewValue(originalValue);
            setLoading(false);
        }, 3000);
    };

    const post = () => {
        window.open('https://www.toutiao.com/');
    };

    return (
        <div className={styles.app}>
            <Card>
                <div className={styles.cardBody}>
                    <Spin spinning={loading} tip='正在生成文章...'>
                        <Input.TextArea value={newValue} placeholder='' rows={10} />
                    </Spin>
                    <div className={styles.buttons}>
                        <Button
                            type='primary'
                            size='large'
                            block
                            disabled={!originalValue}
                            onClick={build}
                            loading={loading}
                        >
                            生成文章
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
        </div>
    );
}

export default App;
