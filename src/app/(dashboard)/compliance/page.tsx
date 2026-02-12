"use client";

import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    Download,
    FileText,
    ShieldCheck
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import styles from './page.module.css';

const checklistItems = [
    { id: 1, title: 'Tax Filings Submitted (Form 941)', desc: 'Quarterly federal tax return due by Apr 30.', status: 'completed' },
    { id: 2, title: 'State Unemployment Tax', desc: 'SUTA payments reconciled for all active states.', status: 'completed' },
    { id: 3, title: 'New Hire Reporting', desc: '5 employees pending reporting to state agencies.', status: 'warning' },
    { id: 4, title: 'Labor Law Posters', desc: 'Digital compliance posters updated for 2026.', status: 'completed' },
];

const auditLogs = [
    { id: 1, action: 'Payroll Run Approved', user: 'Sarah Jenkins', role: 'HR Manager', time: 'Feb 26, 02:30 PM', ip: '192.168.1.45' },
    { id: 2, action: 'Employee Tax Code Update', user: 'System (Auto)', role: 'Bot', time: 'Feb 26, 12:00 PM', ip: '-' },
    { id: 3, action: 'Salary Override Applied', user: 'Mike Ross', role: 'Sales Dir', time: 'Feb 25, 09:15 AM', ip: '10.0.0.12' },
    { id: 4, action: 'Login Attempt Failed', user: 'unknown', role: '-', time: 'Feb 24, 11:42 PM', ip: '45.32.11.90' },
];

export default function CompliancePage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Compliance & Audit</h1>
                    <p className={styles.subtitle}>Statutory compliance tracking and system audit logs.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="outline">
                        <ShieldCheck size={16} style={{ marginRight: 8 }} />
                        Run Compliance Check
                    </Button>
                </div>
            </header>

            <div className={styles.grid}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Card title="Statutory Compliance Checklist">
                        <div className={styles.checklist}>
                            {checklistItems.map((item) => (
                                <div key={item.id} className={styles.checklistItem}>
                                    {item.status === 'completed' ? (
                                        <CheckCircle size={24} color="var(--success)" />
                                    ) : item.status === 'warning' ? (
                                        <AlertTriangle size={24} color="var(--warning)" />
                                    ) : (
                                        <XCircle size={24} color="var(--error)" />
                                    )}
                                    <div className={styles.checklistContent}>
                                        <div className={styles.checkTitle}>{item.title}</div>
                                        <div className={styles.checkDesc}>{item.desc}</div>
                                    </div>
                                    <Badge variant={
                                        item.status === 'completed' ? 'success' :
                                            item.status === 'warning' ? 'warning' : 'error'
                                    }>
                                        {item.status === 'completed' ? 'Compliant' : 'Attention Needed'}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card title="Recent Audit Logs">
                        <table className={styles.auditTable}>
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Date & Time</th>
                                    <th>IP Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditLogs.map((log) => (
                                    <tr key={log.id}>
                                        <td style={{ fontWeight: 500 }}>{log.action}</td>
                                        <td>{log.user}</td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{log.role}</td>
                                        <td>{log.time}</td>
                                        <td style={{ fontFamily: 'monospace' }}>{log.ip}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
                            <Button variant="ghost">View All Logs</Button>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card title="Compliance Reports">
                        <div className={styles.reportList}>
                            <div className={styles.reportItem}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <FileText size={18} color="var(--primary)" />
                                    <span className={styles.reportName}>Form 941 (Q1 2026)</span>
                                </div>
                                <Download size={16} color="var(--text-secondary)" />
                            </div>
                            <div className={styles.reportItem}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <FileText size={18} color="var(--primary)" />
                                    <span className={styles.reportName}>SUTA Summary Report</span>
                                </div>
                                <Download size={16} color="var(--text-secondary)" />
                            </div>
                            <div className={styles.reportItem}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <FileText size={18} color="var(--primary)" />
                                    <span className={styles.reportName}>W-2 Preview (2025)</span>
                                </div>
                                <Download size={16} color="var(--text-secondary)" />
                            </div>
                            <div className={styles.reportItem}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <FileText size={18} color="var(--primary)" />
                                    <span className={styles.reportName}>Audit Trail Export (CSV)</span>
                                </div>
                                <Download size={16} color="var(--text-secondary)" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
