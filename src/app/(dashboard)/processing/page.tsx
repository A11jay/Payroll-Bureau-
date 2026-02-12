"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Play,
    FileText,
    Loader2
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { usePayroll } from '@/context/PayrollContext';
import styles from './page.module.css';

type ProcessingState = 'idle' | 'running' | 'completed';

export default function ProcessingPage() {
    const { employees, createPayrollRun } = usePayroll();
    const router = useRouter();
    const [state, setState] = useState<ProcessingState>('idle');
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<{ msg: string, type: 'info' | 'success' | 'warning' }[]>([]);
    const [paymentDate, setPaymentDate] = useState('2026-02-28');

    // Calculated Results
    const [results, setResults] = useState({
        totalGross: 0,
        totalTax: 0,
        totalDeductions: 0,
        totalNet: 0
    });

    const runProcessing = () => {
        if (employees.length === 0) {
            alert("No employees found. Please ingest data first.");
            return;
        }

        setState('running');
        setProgress(0);
        setLogs([]);

        const steps = [
            { msg: 'Initializing payroll engine...', type: 'info' },
            { msg: `Loading employee data (${employees.length} records)...`, type: 'info' },
            { msg: 'Validating tax rules for Jurisdiction: US-CA...', type: 'info' },
            { msg: 'Computing gross pay...', type: 'info' },
            { msg: 'Calculating deductions (Health, 401k)...', type: 'info' },
            { msg: 'Applying post-tax benefits...', type: 'info' },
            { msg: 'Generating net pay...', type: 'success' },
            { msg: 'Finalizing batch...', type: 'success' }
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i >= steps.length) {
                clearInterval(interval);
                finishProcessing();
                return;
            }
            console.log(`Processing step ${i}:`, steps[i]);
            if (steps[i]) {
                // @ts-ignore
                setLogs(prev => {
                    if (!steps[i]) return prev;
                    return [...prev, steps[i]];
                });
            } else {
                console.error('Undef step encountered at index ' + i);
            }
            setProgress(((i + 1) / steps.length) * 100);
            i++;
        }, 800);
    };

    const finishProcessing = () => {
        // Real Calculation Logic
        const gross = employees.reduce((acc, emp) => acc + (emp.salary / 12), 0);
        const tax = gross * 0.25; // 25% flat tax for prototype
        const deductions = gross * 0.05; // 5% deductions
        const net = gross - tax - deductions;

        setResults({
            totalGross: gross,
            totalTax: tax,
            totalDeductions: deductions,
            totalNet: net
        });

        // Update Global State
        createPayrollRun("Feb 2026 - Cycle A");
        setState('completed');
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Payroll Processing</h1>
                    <p className={styles.subtitle}>Execute payroll rules and generate earnings.</p>
                </div>
                {state === 'completed' && (
                    <Button onClick={() => setState('idle')} variant="outline">
                        Start New Run
                    </Button>
                )}
            </header>

            {state === 'idle' && (
                <Card title="Configure Run">
                    <div className={styles.selectionGrid}>
                        <Input label="Pay Cycle" value="Feb 2026 - Cycle A" readOnly />
                        <Input label="Pay Group" value={`All Employees (${employees.length})`} readOnly />
                        <Input
                            label="Payment Date"
                            type="date"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={runProcessing}>
                            <Play size={16} style={{ marginRight: 8 }} />
                            Start Processing
                        </Button>
                    </div>
                </Card>
            )}

            {state === 'running' && (
                <Card>
                    <div className={styles.stepContainer}>
                        <Loader2 size={48} className="animate-spin" style={{ color: 'var(--primary)' }} />
                        <h3 style={{ fontSize: '1.25rem' }}>Processing Payroll...</h3>

                        <div className={styles.progressContainer}>
                            <div className={styles.progressBarTrack}>
                                <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
                            </div>
                            <div className={styles.progressStatus}>
                                <span>{Math.round(progress)}% Complete</span>
                                <span>{logs[logs.length - 1]?.msg}</span>
                            </div>
                        </div>

                        <div className={styles.logContainer}>
                            {logs.map((log, idx) => {
                                if (!log) return null; // Defensive check
                                return (
                                    <div key={idx} className={styles.logItem}>
                                        <span>{'>'}</span>
                                        <span className={
                                            log.type === 'success' ? styles.logSuccess :
                                                log.type === 'warning' ? styles.logWarning : styles.logInfo
                                        }>{log.msg}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            )}

            {state === 'completed' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className={styles.summaryGrid}>
                        <Card className={styles.statCard}>
                            <div className={styles.statValue}>{formatCurrency(results.totalGross)}</div>
                            <div className={styles.statLabel}>Total Gross Pay</div>
                        </Card>
                        <Card className={styles.statCard}>
                            <div className={styles.statValue}>{formatCurrency(results.totalTax)}</div>
                            <div className={styles.statLabel}>Total Taxes</div>
                        </Card>
                        <Card className={styles.statCard}>
                            <div className={styles.statValue}>{formatCurrency(results.totalDeductions)}</div>
                            <div className={styles.statLabel}>Total Deductions</div>
                        </Card>
                        <Card className={styles.statCard}>
                            <div className={styles.statValue} style={{ color: 'var(--success)' }}>{formatCurrency(results.totalNet)}</div>
                            <div className={styles.statLabel}>Net Pay</div>
                        </Card>
                    </div>

                    <Card title="Processing Results">
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Department</th>
                                    <th>Gross Pay</th>
                                    <th>Taxes</th>
                                    <th>Net Pay</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.slice(0, 5).map((emp) => {
                                    const monthly = emp.salary / 12;
                                    const tax = monthly * 0.25;
                                    const net = monthly - tax - (monthly * 0.05);

                                    return (
                                        <tr key={emp.id}>
                                            <td>
                                                <div style={{ fontWeight: 500 }}>{emp.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{emp.id}</div>
                                            </td>
                                            <td>{emp.department}</td>
                                            <td className={styles.amount}>{formatCurrency(monthly)}</td>
                                            <td className={styles.amount}>{formatCurrency(tax)}</td>
                                            <td className={styles.amount}>{formatCurrency(net)}</td>
                                            <td>
                                                <Badge variant="success">Ready</Badge>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <Button variant="outline"> <FileText size={16} style={{ marginRight: 8 }} /> Download Report</Button>
                            <Button
                                onClick={() => {
                                    // In a real app, we might update a status here.
                                    // Since createPayrollRun in context already sets it to 'Pending Approval' after timeout,
                                    // we just need to navigate the user to the approvals page.
                                    router.push('/approvals');
                                }}
                            >
                                Submit for Approval
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
