import { useState, type FC } from 'react';
import styles from './index.module.less';
import { Button, Card, Empty, Form, Input, message, Select, Spin } from 'antd';
import { ClearOutlined, LoadingOutlined } from '@ant-design/icons';
import { currentUser } from '../../mock';
import { rewriteWithDeepSeek } from '../../services';

interface FormValues {
    original: string;
    domain: string;
    style: string;
    requirement: string;
}

const initialValues: Partial<FormValues> = {};

const AppContent: FC = () => {
    const [form] = Form.useForm<{
        original: string;
        domain: string;
        style: string;
        requirement: string;
    }>();
    const originalValue = Form.useWatch('original', form);
    const [rewrittenText, setRewrittenText] = useState('');
    const [loading, setLoading] = useState(false);
    const [firstBuild, setFirstBuild] = useState(true);

    const build = async () => {
        setFirstBuild(false);
        const values = await form.validateFields();

        if (!values.original) {
            message.warning('请输入原文内容');
            return;
        }

        setRewrittenText('');
        setLoading(true);

        try {
            const { title, content } = await rewriteWithDeepSeek(values);
            setRewrittenText([title, content].join('\n\n'));
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

    const clear = () => {
        form.resetFields();
        setRewrittenText('');
    };

    const buildButtonText = (() => {
        if (!currentUser) {
            return '登录后生成文章';
        }

        if (loading) {
            return '生成中...';
        }

        return '生成文章';
    })();

    return (
        <div className={styles.container}>
            <Card className={styles.editor}>
                <div className={styles.cardBody}>
                    <Spin
                        spinning={loading}
                        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
                    >
                        <div className={styles.textBox}>
                            <Input.TextArea
                                placeholder=''
                                rows={10}
                                showCount
                                disabled={firstBuild}
                                value={rewrittenText}
                                onChange={e => setRewrittenText(e.target.value)}
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
                        <div></div>
                        <div className={styles.settingButtons}>
                            <Button onClick={clear} icon={<ClearOutlined />}>
                                重置
                            </Button>
                        </div>
                    </div>
                    <div className={styles.actionButtons}>
                        <Button
                            type='primary'
                            size='large'
                            block
                            disabled={!originalValue || !currentUser}
                            onClick={build}
                            loading={loading}
                        >
                            {buildButtonText}
                        </Button>
                        <Button size='large' block disabled={!rewrittenText} onClick={post}>
                            发布头条
                        </Button>
                    </div>
                    <Form
                        className={styles.form}
                        layout={'vertical'}
                        form={form}
                        initialValues={initialValues}
                    >
                        <Form.Item
                            label='原文'
                            name='original'
                            rules={[
                                { required: true, message: '原文不能为空' },
                                { whitespace: true },
                            ]}
                        >
                            <Input.TextArea placeholder='输入原文' rows={10} showCount />
                        </Form.Item>
                        <Form.Item
                            label='大V'
                            name='style'
                            extra='从大V用户中选择，参考他们独特的风格来改写文章。'
                        >
                            <Select
                                placeholder='选择大V'
                                options={[
                                    {
                                        value: 'mi_meng',
                                        label: '咪蒙',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label='其他要求' name='requirement'>
                            <Input.TextArea
                                placeholder='例如：精简到300字以内、使用更正式的语气、增加技术术语等'
                                rows={4}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    );
};

export default AppContent;
