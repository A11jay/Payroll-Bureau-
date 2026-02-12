"use client";

import {
    Download,
    FileText,
    HelpCircle,
    Plus,
    MessageCircle,
    Clock
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import styles from './page.module.css';

const payslipHistory = [
    { id: 1, period: 'Jan 2026', payDate: 'Jan 31, 2026', netPay: '$3,850.00' },
    { id: 2, period: 'Dec 2025', payDate: 'Dec 31, 2025', netPay: '$3,850.00' },
    { id: 3, period: 'Nov 2025', payDate: 'Nov 30, 2025', netPay: '$3,850.00' },
];

const taxDocuments = [
    { id: 1, name: 'Form W-2 (2025)', date: 'Jan 15, 2026' },
    { id: 2, name: 'Form 1095-C', date: 'Jan 20, 2026' },
];

const queries = [
    { id: 1, subject: 'Incorrect Tax Deduction', id_ref: '#Q-1023', status: 'In Review', date: 'Feb 26, 2026' },
    { id: 2, subject: 'Bonus Eligibility', id_ref: '#Q-0992', status: 'Resolved', date: 'Jan 10, 2026' },
];

export default function SelfServicePage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>My Payroll</h1>
                    <p className={styles.subtitle}>View your payslips, tax forms, and manage queries.</p>
                </div>
                <Button>
                    <Plus size={16} style={{ marginRight: 8 }} />
                    Raise Query
                </Button>
            </header>

            <div className={styles.grid}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className={styles.payslipCard}>
                        <div>
                            <div className={styles.date}>Latest Payslip • Feb 28, 2026</div>
                            <div className={styles.amount}>$3,850.00</div>
                            <div style={{ opacity: 0.9 }}>Net Pay</div>
                        </div>
                        <button className={styles.downloadBtn}>
                            <Download size={20} />
                            <span>Download PDF</span>
                        </button>
                    </div>

                    <Card title="Payslip History">
                        <div className={styles.historyList}>
                            {payslipHistory.map((item) => (
                                <div key={item.id} className={styles.historyItem}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <FileText size={20} className="text-secondary" />
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{item.period}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Paid on {item.payDate}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <span style={{ fontWeight: 600 }}>{item.netPay}</span>
                                        <Button variant="ghost" className="p-2">
                                            <Download size={16} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Card title="Tax Documents">
                        <div className={styles.historyList}>
                            {taxDocuments.map((doc) => (
                                <div key={doc.id} className={styles.historyItem}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <FileText size={20} color="var(--primary)" />
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{doc.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Available since {doc.date}</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="p-2">
                                        <Download size={16} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card title="My Queries">
                        <div className={styles.queryList}>
                            {queries.map((q) => (
                                <div key={q.id} className={styles.queryItem}>
                                    <div className={styles.queryHeader}>
                                        <span className={styles.querySubject}>{q.subject}</span>
                                        <span className={styles.queryMeta}>{q.id_ref}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span className={styles.queryMeta}>{q.date}</span>
                                        <Badge variant={q.status === 'Resolved' ? 'success' : 'warning'}>
                                            {q.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
