import { Button, Card, Form, Input } from 'antd';
import styles from './App.module.less';

function App() {
    const [form] = Form.useForm();

    return (
        <div className={styles.app}>
            <div className={styles.header}></div>
            <div className={styles.content}>
                <Card>
                    <div className={styles.cardBody}>
                        <Input.TextArea placeholder='' rows={5} maxLength={10} />
                        <div className={styles.buttons}>
                            <Button className={styles.button} type='primary'>
                                生成文章
                            </Button>
                            <Button className={styles.button}>发布头条</Button>
                        </div>
                        <Form className={styles.form} layout={'vertical'} form={form}>
                            <Form.Item label='原文'>
                                <Input.TextArea placeholder='输入原文' rows={5} maxLength={10} />
                            </Form.Item>
                            <Form.Item label='其他要求（可选）'>
                                <Input.TextArea placeholder='输入要求' rows={2} maxLength={2} />
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
            <div className={styles.footer}></div>
        </div>
    );
}

export default App;
