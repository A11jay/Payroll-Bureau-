"use client";

import {
    Check,
    Clock,
    UserCheck,
    DollarSign,
    X,
    FileText
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { clsx } from 'clsx';
import { usePayroll } from '@/context/PayrollContext';
import styles from './page.module.css';

export default function ApprovalsPage() {
    const { payrollRuns, updatePayrollStatus } = usePayroll();

    // Filter for Pending Approvals
    // In a real app, this might come from a specific 'Approvals' API
    // For this prototype, we treat any Payroll Run in 'Pending Approval' as an item here.
    const pendingRuns = payrollRuns.filter(run => run.status === 'Pending Approval');

    const handleApprove = (id: string) => {
        updatePayrollStatus(id, 'Approved');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Approvals</h1>
                    <p className={styles.subtitle}>Manage pending payroll releases and budget requests.</p>
                </div>
            </header>

            {pendingRuns.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)', background: 'var(--surface)', borderRadius: 'var(--radius-md)' }}>
                    <Check size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
                    <h3>All Caught Up!</h3>
                    <p>No pending approvals at this time.</p>
                </div>
            )}

            {pendingRuns.map((run) => (
                <div key={run.id} className={styles.approvalCard}>
                    <div className={styles.approvalHeader}>
                        <div>
                            <h3 className={styles.requestTitle}>Payroll Run - {run.period}</h3>
                            <div className={styles.requestMeta}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <UserCheck size={14} /> System Auto-Generated
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Clock size={14} /> {run.dateProcessed}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <DollarSign size={14} /> {run.totalNet.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <Badge variant="warning">Action Required</Badge>
                    </div>

                    <div className={styles.approvalChain}>
                        <div className={styles.chainConnector} />

                        {/* Mock Steps for Visuals */}
                        <div className={clsx(styles.chainStep, styles.stepCompleted)}>
                            <div className={styles.stepIcon}><Check size={16} /></div>
                            <span className={styles.stepLabel}>Processing</span>
                            <span className={styles.stepDate}>System</span>
                        </div>

                        <div className={clsx(styles.chainStep, styles.stepCurrent)}>
                            <div className={styles.stepIcon}><Clock size={16} /></div>
                            <span className={styles.stepLabel}>Final Approval</span>
                            <span className={styles.stepDate}>You</span>
                        </div>

                        <div className={clsx(styles.chainStep)}>
                            <div className={styles.stepIcon}><div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--border)' }} /></div>
                            <span className={styles.stepLabel}>Disbursement</span>
                            <span className={styles.stepDate}>Bank</span>
                        </div>
                    </div>

                    <div className={styles.actionArea}>
                        <Button variant="ghost">
                            <FileText size={16} style={{ marginRight: 8 }} />
                            View Summary
                        </Button>
                        <Button variant="outline" style={{ color: 'var(--error)', borderColor: 'var(--error)' }}>
                            <X size={16} style={{ marginRight: 8 }} />
                            Reject
                        </Button>
                        <Button onClick={() => handleApprove(run.id)}>
                            <Check size={16} style={{ marginRight: 8 }} />
                            Approve Run
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
