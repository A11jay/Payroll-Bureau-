"use client";

import {
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { usePayroll } from '@/context/PayrollContext';
import styles from './page.module.css';

export default function Dashboard() {
  const { employees, payrollRuns } = usePayroll();

  // Compute Real Metrics
  const totalEmployees = employees.length;

  // Get latest run or default to 0
  const latestRun = payrollRuns[0];
  const lastMonthRun = payrollRuns[1]; // Mock for "change" calculation

  const totalPayroll = latestRun ? latestRun.totalGross : 0;

  // Format Currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const metrics = [
    {
      label: 'Total Employees',
      value: totalEmployees.toLocaleString(),
      change: '+12%', // Mock change for now
      icon: Users,
      color: 'text-primary'
    },
    {
      label: 'Total Payroll',
      value: formatCurrency(totalPayroll),
      change: latestRun ? '+2.4%' : '0%',
      icon: DollarSign,
      color: 'text-success'
    },
    {
      label: 'SLA Adherence',
      value: '98.5%',
      change: '-0.5%',
      icon: CheckCircle,
      color: 'text-primary'
    },
    {
      label: 'Errors Flagged',
      value: '3',
      change: '-2',
      icon: AlertTriangle,
      color: 'text-error'
    },
  ];

  const pendingApprovals = [
    { id: 1, type: 'Bonus Payout', requestedBy: 'Sarah Jenkins', amount: '$5,000', time: '2h ago' },
    { id: 2, type: 'Overtime Adjustment', requestedBy: 'Mike Ross', amount: '$450', time: '4h ago' },
  ];

  const exceptions = [
    { id: 1, issue: 'Missing Tax ID - John Doe', severity: 'High', status: 'Unresolved' },
    { id: 2, issue: 'Bank Details Invalid - Jane Smith', severity: 'Medium', status: 'In Review' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Welcome back, Ajay. Here's what's happening today.</p>
        </div>
        <div className={styles.actions}>
          <button className="btn btn-primary">
            <span>Run Final Payroll</span>
            <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </button>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <Card key={index} className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>{metric.label}</span>
              <metric.icon size={20} style={{ color: `var(--${metric.color.split('-')[1]})` }} />
            </div>
            <div className={styles.metricValue}>{metric.value}</div>
            <div className={styles.metricChange}>
              <TrendingUp size={14} />
              <span>{metric.change} from last month</span>
            </div>
          </Card>
        ))}
      </section>

      <div className={styles.mainGrid}>
        {/* Payroll Cycles */}
        <div className={styles.columnMain}>
          <Card title="Payroll Cycles" className={styles.sectionCard}>
            <div className={styles.list}>
              {payrollRuns.length > 0 ? (
                payrollRuns.map((run) => (
                  <div key={run.id} className={styles.listItem}>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{run.period}</span>
                      <span className={styles.itemDate}>Processed: {run.dateProcessed}</span>
                    </div>
                    <div className={styles.itemMeta}>
                      <div className={styles.usageTrack}>
                        <div className={styles.progressBar} style={{ width: run.status === 'Completed' ? '100%' : '65%' }}></div>
                      </div>
                      <Badge variant={
                        run.status === 'Completed' ? 'success' :
                          run.status === 'Approved' ? 'success' :
                            run.status === 'Processing' ? 'default' : 'neutral'
                      }>{run.status}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No active payroll cycles. Start a new run in Processing.
                </div>
              )}
            </div>
          </Card>

          <Card title="Compliance Alerts & Exceptions" className={styles.sectionCard}>
            <div className={styles.list}>
              {exceptions.map((ex) => (
                <div key={ex.id} className={styles.listItem}>
                  <div className={styles.itemInfo}>
                    <div className={styles.exceptionTitle}>
                      <AlertTriangle size={16} color="var(--error)" />
                      <span className={styles.itemName}>{ex.issue}</span>
                    </div>
                    <span className={styles.itemDate}>Severity: {ex.severity}</span>
                  </div>
                  <Badge variant="error">{ex.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar/Secondary Column */}
        <div className={styles.columnSide}>
          <Card title="Pending Approvals" className={styles.sectionCard}>
            <div className={styles.list}>
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className={styles.approvalItem}>
                  <div className={styles.approvalHeader}>
                    <span className={styles.approvalType}>{approval.type}</span>
                    <span className={styles.approvalTime}>{approval.time}</span>
                  </div>
                  <div className={styles.approvalDetails}>
                    <span>{approval.requestedBy}</span>
                    <span className={styles.approvalAmount}>{approval.amount}</span>
                  </div>
                  <div className={styles.approvalActions}>
                    <button className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>Approve</button>
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
