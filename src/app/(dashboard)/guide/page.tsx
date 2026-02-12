"use client";

import { useState } from 'react';
import styles from './page.module.css';
import { Card } from '@/components/ui/Card';
import {
    BookOpen,
    UploadCloud,
    Cpu,
    CheckSquare,
    BarChart3,
    ShieldCheck,
    Users
} from 'lucide-react';

export default function GuidePage() {
    const [activeSection, setActiveSection] = useState('overview');

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>User Guide</h1>
                <p className={styles.subtitle}>Comprehensive manual for the Payroll Bureau System</p>
            </header>

            <div className={styles.content}>
                <aside className={styles.sidebar}>
                    <nav className={styles.nav}>
                        <button
                            onClick={() => scrollToSection('overview')}
                            className={`${styles.navItem} ${activeSection === 'overview' ? styles.active : ''}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => scrollToSection('ingestion')}
                            className={`${styles.navItem} ${activeSection === 'ingestion' ? styles.active : ''}`}
                        >
                            Data Ingestion
                        </button>
                        <button
                            onClick={() => scrollToSection('processing')}
                            className={`${styles.navItem} ${activeSection === 'processing' ? styles.active : ''}`}
                        >
                            Processing Engine
                        </button>
                        <button
                            onClick={() => scrollToSection('approvals')}
                            className={`${styles.navItem} ${activeSection === 'approvals' ? styles.active : ''}`}
                        >
                            Approvals
                        </button>
                        <button
                            onClick={() => scrollToSection('reports')}
                            className={`${styles.navItem} ${activeSection === 'reports' ? styles.active : ''}`}
                        >
                            Reports & Analytics
                        </button>
                    </nav>
                </aside>

                <main className={styles.mainContent}>
                    <section id="overview" className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <BookOpen size={24} />
                                System Overview
                            </div>
                        </h2>
                        <div className={styles.sectionContent}>
                            <p>
                                The Payroll Bureau is a centralized platform designed for managing payroll data, executing complex processing rules,
                                and ensuring statutory compliance. This guide covers the end-to-end workflow from data ingestion to final reporting.
                            </p>
                            <Card className={styles.card}>
                                <h3 className={styles.cardTitle}>Quick Start Flow</h3>
                                <ol style={{ marginLeft: 20 }}>
                                    <li><strong>Ingest Data:</strong> Upload CSV files or sync with HRIS.</li>
                                    <li><strong>Process Payroll:</strong> Run the calculation engine.</li>
                                    <li><strong>Verify & Approve:</strong> Check totals and approve the run.</li>
                                </ol>
                            </Card>
                        </div>
                    </section>

                    <section id="ingestion" className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <UploadCloud size={24} />
                                Data Ingestion
                            </div>
                        </h2>
                        <div className={styles.sectionContent}>
                            <p>
                                The data ingestion module allows you to bring employee and payroll data into the system.
                                You can upload CSV files or use the provided sample data for testing.
                            </p>
                            <ul>
                                <li><strong>Load Sample Data:</strong> Quickly populates the system with test records.</li>
                                <li><strong>CSV Upload:</strong> Supports standard payroll input formats.</li>
                                <li><strong>Data Preview:</strong> Validate data before importing it into the active session.</li>
                            </ul>
                        </div>
                    </section>

                    <section id="processing" className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <Cpu size={24} />
                                Processing Engine
                            </div>
                        </h2>
                        <div className={styles.sectionContent}>
                            <p>
                                The core engine calculating gross-to-net pay. This module applies tax rules, deductions, and benefits.
                            </p>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Key Features</h3>
                                <p>
                                    - Real-time calculation feedback<br />
                                    - Automated tax computation (Mock rates applied)<br />
                                    - Instant gross, tax, and net pay summaries
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="approvals" className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <CheckSquare size={24} />
                                Approvals Workflow
                            </div>
                        </h2>
                        <div className={styles.sectionContent}>
                            <p>
                                Once payroll is processed, it moves to the "Pending Approval" stage.
                                Authorized users must review the summary and explicitly approve the run before it is finalized.
                            </p>
                        </div>
                    </section>

                    <section id="reports" className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <BarChart3 size={24} />
                                Reports & Analytics
                            </div>
                        </h2>
                        <div className={styles.sectionContent}>
                            <p>
                                Visualize payroll trends, cost distribution, and overtime metrics through interactive charts.
                            </p>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
