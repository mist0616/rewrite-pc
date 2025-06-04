import { type FC } from 'react';
import styles from './index.module.less';
import { Avatar, Button, Dropdown, message, Modal, Typography, type MenuProps } from 'antd';
import { DollarOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { currentUser } from '../../mock';

const AppHeader: FC = () => {
    const [modal, contextHolder] = Modal.useModal();

    const login = () => {};

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: '充值积分',
            icon: <DollarOutlined />,
            onClick: () => {},
        },
        {
            key: '2',
            label: '退出登录',
            icon: <LogoutOutlined />,
            onClick: () => {
                modal.confirm({
                    title: '确认要退出登录吗？',
                    okText: '退出登录',
                    okButtonProps: { danger: true },
                    cancelText: '取消',
                    onOk: () => {
                        message.success('退出登录成功');
                        window.location.reload();
                    },
                });
            },
        },
    ];

    return (
        <div className={styles.container}>
            {contextHolder}
            <div className={styles.titleBox}>
                <Typography.Text className={styles.title}>二创狗</Typography.Text>
            </div>
            {currentUser ? (
                <div className={styles.myInfo}>
                    <Avatar className={styles.avatar} size={32} src={currentUser.avatar} />
                    <Typography.Text className={styles.name}>{currentUser.name}</Typography.Text>
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <DownOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 12,
                            }}
                        />
                    </Dropdown>
                </div>
            ) : (
                <Button type='primary' onClick={login}>
                    登录
                </Button>
            )}
        </div>
    );
};

export default AppHeader;
