"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, Calendar } from 'lucide-react';
import styles from './page.module.css';

const dataCost = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 2000 },
    { name: 'Apr', amount: 2780 },
    { name: 'May', amount: 1890 },
    { name: 'Jun', amount: 2390 },
];

const dataOvertime = [
    { name: 'Week 1', hours: 45 },
    { name: 'Week 2', hours: 55 },
    { name: 'Week 3', hours: 40 },
    { name: 'Week 4', hours: 60 },
];

const dataComp = [
    { name: 'Engineering', value: 400 },
    { name: 'Sales', value: 300 },
    { name: 'Marketing', value: 300 },
    { name: 'HR', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ReportsPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Reports & Analytics</h1>
                    <p className={styles.subtitle}>Insights into payroll costs, overtime, and distribution.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="outline">
                        <Calendar size={16} style={{ marginRight: 8 }} />
                        Last 6 Months
                    </Button>
                    <Button>
                        <Download size={16} style={{ marginRight: 8 }} />
                        Export PDF
                    </Button>
                </div>
            </header>

            <div className={styles.kpiGrid}>
                <Card className={styles.kpiCard}>
                    <div className={styles.kpiValue}>$4.2M</div>
                    <div className={styles.kpiLabel}>Total Payroll (YTD)</div>
                </Card>
                <Card className={styles.kpiCard}>
                    <div className={styles.kpiValue}>$320k</div>
                    <div className={styles.kpiLabel}>Overtime Cost</div>
                </Card>
                <Card className={styles.kpiCard}>
                    <div className={styles.kpiValue}>12.4%</div>
                    <div className={styles.kpiLabel}>Avg Tax Rate</div>
                </Card>
                <Card className={styles.kpiCard}>
                    <div className={styles.kpiValue}>$5,200</div>
                    <div className={styles.kpiLabel}>Cost per Employee</div>
                </Card>
            </div>

            <div className={styles.grid}>
                <Card title="Payroll Cost Trends">
                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataCost}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip />
                                <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Overtime Hours (Weekly)">
                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataOvertime}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="hours" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Departmental Breakdown">
                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={dataComp}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {dataComp.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
}
