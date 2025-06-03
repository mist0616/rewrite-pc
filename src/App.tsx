import { Button, Card, Empty, Form, Input, Spin, Typography, message } from 'antd';
import styles from './App.module.less';
import { useState } from 'react';
import Layout from './components/Layout';
import { ClearOutlined, LoadingOutlined, SettingOutlined } from '@ant-design/icons';

const { Text } = Typography;

const process = {
    env: {
        REACT_APP_DEEPSEEK_API_KEY: 'sk-5315771729b94896a4aa627fae9df25b',
    },
};

// DeepSeek API 调用函数
const rewriteWithDeepSeek = async (original: string, requirement: string = '') => {
    const prompt = `请改写这篇文章。要求：保持原意但优化表达${
        requirement ? `，同时满足以下要求：${requirement}` : ''
    }。改写后的文章：`;

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: '你是一名专业的文章改写助手' },
                    { role: 'user', content: `${prompt}\n\n原文：${original}` },
                ],
                temperature: 0.7,
                max_tokens: 2000,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API请求失败');
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('DeepSeek API错误:', error);
        throw error;
    }
};

function App() {
    const [form] = Form.useForm<{
        original: string;
        requirement: string;
    }>();
    const originalValue = Form.useWatch('original', form);

    const [rewrittenText, setRewrittenText] = useState('');
    const [loading, setLoading] = useState(false);

    const build = async () => {
        const values = await form.validateFields();

        if (!values.original) {
            message.warning('请输入原文内容');
            return;
        }

        setRewrittenText('');
        setLoading(true);

        try {
            const _rewrittenText = await rewriteWithDeepSeek(values.original, values.requirement);
            setRewrittenText(_rewrittenText);
        } catch (error) {
            message.error(`改写失败: ${error.message}`);
            console.error('改写错误:', error);
        } finally {
            setLoading(false);
        }
    };

    const post = () => {
        window.open('https://www.toutiao.com/');
    };

    const showSettings = () => {
        // 设置逻辑
    };

    const clear = () => {
        form.resetFields();
        setRewrittenText('');
    };

    return (
        <Layout>
            <Card>
                <div className={styles.cardBody}>
                    <Spin
                        spinning={loading}
                        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
                    >
                        <div className={styles.textBox}>
                            <Input.TextArea
                                value={rewrittenText}
                                placeholder=''
                                rows={10}
                                readOnly
                            />
                            {!rewrittenText && !loading && (
                                <Empty
                                    className={styles.empty}
                                    description='生成的文章将展示在这里'
                                />
                            )}
                        </div>
                    </Spin>

                    <div className={styles.settingBox}>
                        <Text type='secondary'>{rewrittenText.length || 0} 字</Text>
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
                            disabled={!originalValue?.trim()}
                            onClick={build}
                            loading={loading}
                        >
                            {loading ? '生成中...' : '生成文章'}
                        </Button>
                        <Button size='large' block disabled={!rewrittenText} onClick={post}>
                            发布头条
                        </Button>
                    </div>
                    <Form className={styles.form} layout={'vertical'} form={form}>
                        <Form.Item
                            label='原文'
                            name='original'
                            rules={[{ required: true, message: '请输入原文内容' }]}
                        >
                            <Input.TextArea
                                placeholder='输入原文'
                                rows={10}
                                showCount
                                maxLength={5000}
                            />
                        </Form.Item>
                        <Form.Item label='其他要求（可选）' name='requirement'>
                            <Input.TextArea
                                placeholder='例如：精简到300字以内、使用更正式的语气、增加技术术语等'
                                rows={4}
                                maxLength={500}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </Layout>
    );
}

export default App;
