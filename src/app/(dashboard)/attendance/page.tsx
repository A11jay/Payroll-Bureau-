"use client";

import { useState } from 'react';
import styles from './page.module.css';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    CalendarClock,
    UserCheck,
    Clock,
    AlertCircle,
    Check,
    X,
    CalendarDays
} from 'lucide-react';

type Tab = 'overview' | 'requests' | 'attendance';

interface LeaveRequest {
    id: number;
    employee: string;
    type: string;
    dates: string;
    duration: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

interface AttendanceRecord {
    id: string;
    employee: string;
    checkIn: string;
    checkOut: string;
    status: 'Present' | 'Late' | 'Absent' | 'On Leave';
    totalHours: string;
}

export default function AttendancePage() {
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    // Mock Data
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
        { id: 1, employee: 'Sarah Smith', type: 'Annual Leave', dates: 'Mar 10 - Mar 15', duration: '5 Days', reason: 'Family vacation', status: 'Pending' },
        { id: 2, employee: 'Mike Johnson', type: 'Sick Leave', dates: 'Feb 26', duration: '1 Day', reason: 'Flu symptoms', status: 'Pending' },
        { id: 3, employee: 'John Doe', type: 'Personal Leave', dates: 'Mar 01', duration: '1 Day', reason: 'Personal appointments', status: 'Pending' }
    ]);

    const attendanceRecords: AttendanceRecord[] = [
        { id: '1', employee: 'John Doe', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present', totalHours: '8h 30m' },
        { id: '2', employee: 'Jane Smith', checkIn: '09:15 AM', checkOut: '06:00 PM', status: 'Late', totalHours: '8h 45m' },
        { id: '3', employee: 'Mike Johnson', checkIn: '-', checkOut: '-', status: 'Absent', totalHours: '-' },
        { id: '4', employee: 'Emily Davis', checkIn: '-', checkOut: '-', status: 'On Leave', totalHours: '-' },
    ];

    const handleLeaveAction = (id: number, action: 'Approved' | 'Rejected') => {
        setLeaveRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: action } : req
        ));
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Time & Attendance</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage workforce availability, shifts, and leave interaction.</p>
                </div>
                <Button>
                    <CalendarDays size={16} style={{ marginRight: 8 }} />
                    Log Time
                </Button>
            </header>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <UserCheck size={24} />
                    </div>
                    <div className={styles.statInfo}>
                        <div className={styles.statValue}>92%</div>
                        <div className={styles.statLabel}>Attendance Rate</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}>
                        <Clock size={24} />
                    </div>
                    <div className={styles.statInfo}>
                        <div className={styles.statValue}>5</div>
                        <div className={styles.statLabel}>Late Arrivals</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)' }}>
                        <AlertCircle size={24} />
                    </div>
                    <div className={styles.statInfo}>
                        <div className={styles.statValue}>{leaveRequests.filter(r => r.status === 'Pending').length}</div>
                        <div className={styles.statLabel}>Pending Requests</div>
                    </div>
                </div>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'requests' ? styles.active : ''}`}
                    onClick={() => setActiveTab('requests')}
                >
                    Leave Requests
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'attendance' ? styles.active : ''}`}
                    onClick={() => setActiveTab('attendance')}
                >
                    Daily Logs
                </button>
            </div>

            <main className={styles.contentArea}>
                {activeTab === 'overview' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <Card title="Today's Snapshot">
                            <table className={styles.attendanceTable}>
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Check In</th>
                                        <th>Status</th>
                                        <th>Activity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceRecords.slice(0, 3).map(rec => (
                                        <tr key={rec.id}>
                                            <td>{rec.employee}</td>
                                            <td>{rec.checkIn}</td>
                                            <td>
                                                <span className={`${styles.statusBadge} ${rec.status === 'Present' ? styles.statusPresent :
                                                        rec.status === 'Late' ? styles.statusLate :
                                                            rec.status === 'Absent' ? styles.statusAbsent : styles.statusOnLeave
                                                    }`}>{rec.status}</span>
                                            </td>
                                            <td>{rec.status === 'Present' ? 'Working on Project X' : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div style={{ padding: '16px', textAlign: 'center' }}>
                                <Button variant="ghost" onClick={() => setActiveTab('attendance')}>View All Records</Button>
                            </div>
                        </Card>

                        <Card title="Pending Approvals">
                            <div className={styles.requestList}>
                                {leaveRequests.filter(r => r.status === 'Pending').slice(0, 2).map(req => (
                                    <div key={req.id} className={styles.requestCard}>
                                        <div className={styles.userSection}>
                                            <div className={styles.avatar}>{req.employee.charAt(0)}</div>
                                            <div className={styles.userInfo}>
                                                <h4>{req.employee}</h4>
                                                <p>{req.type}</p>
                                            </div>
                                        </div>
                                        <div className={styles.actions}>
                                            <Button size="sm" variant="outline" onClick={() => handleLeaveAction(req.id, 'Rejected')}>Reject</Button>
                                            <Button size="sm" onClick={() => handleLeaveAction(req.id, 'Approved')}>Approve</Button>
                                        </div>
                                    </div>
                                ))}
                                {leaveRequests.filter(r => r.status === 'Pending').length === 0 && (
                                    <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-secondary)' }}>No pending requests</div>
                                )}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'requests' && (
                    <div className={styles.requestList}>
                        {leaveRequests.map(req => (
                            <div key={req.id} className={styles.requestCard} style={{ opacity: req.status !== 'Pending' ? 0.7 : 1 }}>
                                <div className={styles.userSection}>
                                    <div className={styles.avatar}>{req.employee.charAt(0)}</div>
                                    <div className={styles.userInfo}>
                                        <h4>{req.employee}</h4>
                                        <p>{req.type}</p>
                                    </div>
                                </div>
                                <div className={styles.detailsGrid}>
                                    <div className={styles.detailItem}>
                                        <label>Dates</label>
                                        <span>{req.dates}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <label>Duration</label>
                                        <span>{req.duration}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <label>Reason</label>
                                        <span>{req.reason}</span>
                                    </div>
                                </div>
                                <div className={styles.actions}>
                                    {req.status === 'Pending' ? (
                                        <>
                                            <Button size="sm" variant="outline" onClick={() => handleLeaveAction(req.id, 'Rejected')}>
                                                <X size={16} style={{ marginRight: 4 }} /> Reject
                                            </Button>
                                            <Button size="sm" onClick={() => handleLeaveAction(req.id, 'Approved')}>
                                                <Check size={16} style={{ marginRight: 4 }} /> Approve
                                            </Button>
                                        </>
                                    ) : (
                                        <span className={`${styles.statusBadge} ${req.status === 'Approved' ? styles.statusPresent : styles.statusAbsent}`}>
                                            {req.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'attendance' && (
                    <Card>
                        <table className={styles.attendanceTable}>
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>Total Hours</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceRecords.map(rec => (
                                    <tr key={rec.id}>
                                        <td>{rec.employee}</td>
                                        <td>{rec.checkIn}</td>
                                        <td>{rec.checkOut}</td>
                                        <td>{rec.totalHours}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${rec.status === 'Present' ? styles.statusPresent :
                                                    rec.status === 'Late' ? styles.statusLate :
                                                        rec.status === 'Absent' ? styles.statusAbsent : styles.statusOnLeave
                                                }`}>{rec.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}
            </main>
        </div>
    );
}
