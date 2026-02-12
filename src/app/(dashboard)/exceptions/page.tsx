"use client";

import { useState, Fragment } from 'react';
import {
    AlertTriangle,
    CheckCircle,
    Calendar,
    User,
    MoreVertical,
    MessageSquare
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import styles from './page.module.css';

const initialExceptions = [
    { id: 1, employee: 'John Doe', empId: 'E0045', type: 'Missing Tax ID', severity: 'High', status: 'Open', date: 'Feb 26, 2026' },
    { id: 2, employee: 'Sarah Smith', empId: 'E0092', type: 'Negative Net Pay', severity: 'Critical', status: 'Investigating', date: 'Feb 26, 2026' },
    { id: 3, employee: 'Mike Johnson', empId: 'E0105', type: 'Bank Details Invalid', severity: 'Medium', status: 'Resolved', date: 'Feb 25, 2026' },
    { id: 4, employee: 'Emily Davis', empId: 'E0122', type: 'Overtime Exceeds Limit', severity: 'Low', status: 'Open', date: 'Feb 25, 2026' },
];

export default function ExceptionsPage() {
    const [exceptions, setExceptions] = useState(initialExceptions);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleResolve = (id: number) => {
        setExceptions(exceptions.map(ex =>
            ex.id === id ? { ...ex, status: 'Resolved' } : ex
        ));
        setSelectedId(null);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Exception Management</h1>
                    <p className={styles.subtitle}>Track and resolve payroll anomalies and errors.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="outline">
                        <Calendar size={16} style={{ marginRight: 8 }} />
                        Filter by Date
                    </Button>
                    <Button>Reprocess Resolved</Button>
                </div>
            </header>

            <div className={styles.filters}>
                <select className={styles.filterSelect}>
                    <option>All Severities</option>
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
                <select className={styles.filterSelect}>
                    <option>All Statuses</option>
                    <option>Open</option>
                    <option>Investigating</option>
                    <option>Resolved</option>
                </select>
            </div>

            <Card>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Issue Type</th>
                            <th>Employee</th>
                            <th>Severity</th>
                            <th>Status</th>
                            <th>Date Detected</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exceptions.map((ex) => (
                            <Fragment key={ex.id}>
                                <tr>
                                    <td className={styles.issueCell}>
                                        <span className={styles.issueTitle}>{ex.type}</span>
                                        <span className={styles.issueDesc}>Validation Rule #402</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <User size={14} />
                                            </div>
                                            <div>
                                                <div>{ex.employee}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{ex.empId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Badge variant={
                                            ex.severity === 'Critical' ? 'error' :
                                                ex.severity === 'High' ? 'warning' : 'neutral'
                                        }>{ex.severity}</Badge>
                                    </td>
                                    <td>
                                        <Badge variant={
                                            ex.status === 'Resolved' ? 'success' : 'default'
                                        }>{ex.status}</Badge>
                                    </td>
                                    <td>{ex.date}</td>
                                    <td>
                                        <Button variant="ghost" onClick={() => setSelectedId(selectedId === ex.id ? null : ex.id)}>
                                            {selectedId === ex.id ? 'Close' : 'Manage'}
                                        </Button>
                                    </td>
                                </tr>
                                {selectedId === ex.id && (
                                    <tr>
                                        <td colSpan={6} style={{ padding: 0, borderBottom: 'none' }}>
                                            <div className={styles.actionPanel}>
                                                <div style={{ display: 'flex', gap: '16px' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <h4>Resolution Notes</h4>
                                                        <textarea
                                                            className={styles.commentInput}
                                                            rows={3}
                                                            placeholder="Describe how this issue was resolved..."
                                                        />
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            <Button size="sm" onClick={() => handleResolve(ex.id)}>Mark as Resolved</Button>
                                                            <Button variant="outline" size="sm">Assign to HR</Button>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: '300px', borderLeft: '1px solid var(--border)', paddingLeft: '16px' }}>
                                                        <h4>Audit Trail</h4>
                                                        <ul style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px', listStyle: 'none' }}>
                                                            <li>Feb 26, 10:00 AM - Detected by System</li>
                                                            <li>Feb 26, 10:05 AM - Auto-notification sent to Admin</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
