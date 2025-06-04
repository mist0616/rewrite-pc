import { useState, type FC } from 'react';
import styles from './index.module.less';
import {
    Button,
    Card,
    Col,
    Empty,
    Form,
    Input,
    List,
    message,
    Row,
    Select,
    Spin,
    Typography,
} from 'antd';
import { ClearOutlined, LoadingOutlined, SettingOutlined } from '@ant-design/icons';
import { currentUser, trendingTopics } from '../../mock';
import { rewriteWithDeepSeek } from '../../services';

interface FormValues {
    original: string;
    domain: string;
    style: string;
    requirement: string;
}

const initialValues: Partial<FormValues> = {
    domain: 'ti_yu',
    style: 'normal',
};

const AppContent: FC = () => {
    const [form] = Form.useForm<{
        original: string;
        requirement: string;
        domain: string;
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
            <Row gutter={16}>
                <Col span={8}>
                    <Card className={styles.hotList} title='头条热榜(24H)'>
                        <List
                            dataSource={trendingTopics}
                            renderItem={item => (
                                <List.Item className={styles.item}>
                                    <div className={styles.titleBox}>
                                        <Typography.Text type='secondary' className={styles.rank}>
                                            {item.rank}
                                        </Typography.Text>
                                        <Typography.Text className={styles.title}>
                                            {item.title}
                                        </Typography.Text>
                                    </div>
                                    <Typography.Text type='secondary' className={styles.views}>
                                        {item.views}
                                    </Typography.Text>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={16}>
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
                                    rules={[{ required: true, message: '请输入原文内容' }]}
                                >
                                    <Input.TextArea placeholder='输入原文' rows={10} showCount />
                                </Form.Item>
                                <Form.Item label='领域' name='domain'>
                                    <Select
                                        placeholder='请选择领域'
                                        options={[
                                            {
                                                value: 'ti_yu',
                                                label: '体育',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='大V'
                                    name='style'
                                    extra='从大V用户中选择，参考他们独特的风格来改写文章。'
                                >
                                    <Select
                                        placeholder='请选择大V'
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
                </Col>
            </Row>
        </div>
    );
};

export default AppContent;
