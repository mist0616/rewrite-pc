import type { FC, ReactNode } from 'react';
import styles from './index.module.less';

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export default AppLayout;
