"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    UploadCloud,
    Cpu,
    AlertCircle,
    CheckSquare,
    ShieldCheck,
    Users,
    BarChart3,
    Settings,
    LogOut,
    BookOpen,
    FileCode
} from 'lucide-react';
import styles from './Sidebar.module.css';
import { clsx } from 'clsx';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: UploadCloud, label: 'Data Ingestion', href: '/ingestion' },
    { icon: Cpu, label: 'Processing', href: '/processing' },
    { icon: AlertCircle, label: 'Exceptions', href: '/exceptions' },
    { icon: CheckSquare, label: 'Approvals', href: '/approvals' },
    { icon: ShieldCheck, label: 'Compliance', href: '/compliance' },
    { icon: Users, label: 'Employees', href: '/self-service' },
    { icon: BarChart3, label: 'Reports', href: '/reports' },
    { icon: BookOpen, label: 'Self Guide', href: '/guide' },
    { icon: FileCode, label: 'Project Docs', href: '/docs' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <Image
                    src="/assets/logo.jpg"
                    alt="Payroll Bureau Logo"
                    width={64}
                    height={64}
                    className={styles.logoIcon}
                />
                <span className={styles.logoText}>Payroll Bureau</span>
            </div>

            <nav className={styles.nav}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(styles.navItem, isActive && styles.active)}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <Link href="/settings" className={styles.navItem}>
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
                <button className={clsx(styles.navItem, styles.logoutHost)}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
