"use client";

import { useState } from 'react';
import styles from './page.module.css';
import { Card } from '@/components/ui/Card';
import {
    FileText,
    Layers,
    Image as ImageIcon,
    GitBranch
} from 'lucide-react';
import Image from 'next/image';

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState('executive-summary');

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
                <h1 className={styles.title}>Project Documentation</h1>
                <p className={styles.subtitle}>Technical specifications, architecture, and wireframes for Payroll Bureau.</p>
            </header>

            <div className={styles.content}>
                <aside className={styles.sidebar}>
                    <nav className={styles.nav}>
                        <button
                            onClick={() => scrollToSection('executive-summary')}
                            className={`${styles.navItem} ${activeSection === 'executive-summary' ? styles.active : ''}`}
                        >
                            Executive Summary
                        </button>
                        <button
                            onClick={() => scrollToSection('architecture')}
                            className={`${styles.navItem} ${activeSection === 'architecture' ? styles.active : ''}`}
                        >
                            Technical Architecture
                        </button>
                        <button
                            onClick={() => scrollToSection('wireframes')}
                            className={`${styles.navItem} ${activeSection === 'wireframes' ? styles.active : ''}`}
                        >
                            Wireframes
                        </button>
                        <button
                            onClick={() => scrollToSection('user-flows')}
                            className={`${styles.navItem} ${activeSection === 'user-flows' ? styles.active : ''}`}
                        >
                            User Flows
                        </button>
                    </nav>
                </aside>

                <main className={styles.mainContent}>
                    <section id="executive-summary" className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <FileText size={24} />
                                Executive Summary
                            </div>
                        </h2>
                        <div className={styles.sectionContent}>
                            <p>
                                <strong>Product Name:</strong> Payroll Bureau (SaaS Prototype)<br />
                                <strong>Version:</strong> 1.0 (High-Fidelity Prototype)
                            </p>
                            <p style={{ marginTop: 16 }}>
                                The Payroll Bureau is a centralized, multi-tenant payroll processing platform designed for mid-to-large enterprises.
                                It enables organizations to manage payroll data, execute complex processing rules, handle exceptions,
                                and ensure statutory compliance through a secure, modern web interface.
                            </p>
                        </div>
                    </section>

                    <section id="architecture" className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <Layers size={24} />
                                Technical Architecture
                            </div>
                        </h2>
                        <div className={styles.sectionContent}>
                            <Card className={styles.card}>
                                <h3 className={styles.cardTitle}>Tech Stack</h3>
                                <ul>
                                    <li><strong>Framework:</strong> Next.js 15 (App Router, TypeScript)</li>
                                    <li><strong>Styling:</strong> Vanilla CSS Modules (Zero-runtime overhead, scoped styling)</li>
                                    <li><strong>Icons:</strong> Lucide React</li>
                                    <li><strong>Charts:</strong> Recharts</li>
                                    <li><strong>State Management:</strong> React Hooks & Context (Local state for prototype)</li>
                                </ul>
                            </Card>

                            <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: '1.1rem', fontWeight: 600 }}>Project Structure</h3>
                            <div className={styles.codeBlock}>
                                {`src/
├── app/                  # App Router pages
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Protected dashboard routes
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global design system
├── components/
│   ├── layout/           # Sidebar, Header
│   └── ui/               # Reusable primitives (Card, Button, Badge)
└── context/              # Global State (PayrollContext)`}
                            </div>
                        </div>
                    </section>

                    <section id="wireframes" className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <ImageIcon size={24} />
                                High-Fidelity Wireframes
                            </div>
                        </h2>
                        <div className={styles.sectionContent}>
                            <p>Below are the high-fidelity wireframes for the core application modules.</p>

                            <div className={styles.wireframeGrid}>
                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>A. Login & Onboarding</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Secure entry point with toggle for Registration.</p>
                                    <div className={styles.imageContainer}>
                                        <Image src="/assets/login_page_1770825473197.png" alt="Login Screen" width={400} height={250} style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>B. Dashboard (Home)</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Central hub for payroll status and metrics.</p>
                                    <div className={styles.imageContainer}>
                                        <Image src="/assets/dashboard_view_1770825316192.png" alt="Dashboard" width={400} height={250} style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>C. Data Ingestion</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Upload CSV files and map fields.</p>
                                    <div className={styles.imageContainer}>
                                        <Image src="/assets/data_ingestion_view_1770825328243.png" alt="Data Ingestion" width={400} height={250} style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>D. Processing Engine</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Step-by-step computation engine.</p>
                                    <div className={styles.imageContainer}>
                                        <Image src="/assets/processing_screen_1770825981096.png" alt="Processing" width={400} height={250} style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>E. Exception Management</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Track and resolve payroll errors.</p>
                                    <div className={styles.imageContainer}>
                                        <Image src="/assets/exceptions_screen_1770826002378.png" alt="Exceptions" width={400} height={250} style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>F. Approvals & Workflow</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Multi-step approval chains.</p>
                                    <div className={styles.imageContainer}>
                                        <Image src="/assets/approvals_screen_1770825996368.png" alt="Approvals" width={400} height={250} style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>G. Compliance & Audit</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Statutory obligations and logs.</p>
                                    <div className={styles.imageContainer}>
                                        <Image src="/assets/compliance_screen_1770826016013.png" alt="Compliance" width={400} height={250} style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>H. Employee Self-Service</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Employee portal for payslips.</p>
                                    <div className={styles.imageContainer}>
                                        <Image src="/assets/self_service_screen_1770826033846.png" alt="Self Service" width={400} height={250} style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>I. Reports & Analytics</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Visual insights and cost tracking.</p>
                                    <div className={styles.imageContainer}>
                                        <Image src="/assets/reports_page_1770825493670.png" alt="Reports" width={400} height={250} style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="user-flows" className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <GitBranch size={24} />
                                User Flows
                            </div>
                        </h2>
                        <div className={styles.sectionContent}>
                            <h3 className={styles.cardTitle}>Main Payroll Cycle Flow</h3>
                            <div className={styles.codeBlock}>
                                {`Start 
  --> Data Ingestion 
  --> Processing Engine 
  --> Exceptions? 
      -- Yes --> Exception Mgmt --> Processing Engine
      -- No --> Approvals 
  --> Compliance & Audit 
  --> Finalize`}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
