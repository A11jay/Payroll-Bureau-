"use client";

import { useState, useRef } from 'react';
import {
    UploadCloud,
    Database,
    ArrowRight,
    AlertCircle,
    CheckCircle,
    RefreshCw
} from 'lucide-react';
import Papa from 'papaparse';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { usePayroll, Employee } from '@/context/PayrollContext';
import styles from './page.module.css';

export default function IngestionPage() {
    const { addEmployees } = usePayroll();
    const [file, setFile] = useState<File | null>(null);
    const [parsedData, setParsedData] = useState<any[]>([]);
    const [isValidating, setIsValidating] = useState(false);
    const [isProcessed, setIsProcessed] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            parseFile(selectedFile);
        }
    };

    const parseFile = (file: File) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                setParsedData(results.data);
            },
            error: (error) => {
                console.error("Error parsing CSV:", error);
            }
        });
    };

    const handleProcess = () => {
        setIsValidating(true);

        // Map parsed data to Employee structure
        // Assuming CSV headers: id, name, role, department, salary
        const newEmployees: Employee[] = parsedData.map((row: any) => ({
            id: row.id || `EMP-${Math.floor(Math.random() * 10000)}`,
            name: row.name || 'Unknown',
            role: row.role || 'Staff',
            department: row.department || 'General',
            salary: parseFloat(row.salary) || 50000,
            status: 'Active'
        }));

        setTimeout(() => {
            addEmployees(newEmployees);
            setIsValidating(false);
            setIsProcessed(true);
            setFile(null);
            setParsedData([]);
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Data Ingestion</h1>
                    <p className={styles.subtitle}>Import payroll data from files or connected HR systems.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="outline" onClick={() => {
                        setFile(new File([""], "sample_data.csv"));
                        setParsedData([
                            { id: 'E1001', name: 'Alice Walker', role: 'Frontend Dev', department: 'Engineering', salary: '95000' },
                            { id: 'E1002', name: 'Bob Harris', role: 'Sales Lead', department: 'Sales', salary: '88000' },
                            { id: 'E1003', name: 'Charlie Kim', role: 'Designer', department: 'Design', salary: '72000' },
                        ]);
                    }}>
                        <RefreshCw size={16} style={{ marginRight: 8 }} />
                        Load Sample Data
                    </Button>
                    <Button variant="outline">
                        <RefreshCw size={16} style={{ marginRight: 8 }} />
                        Sync HRIS
                    </Button>
                </div>
            </header>

            <div className={styles.grid}>
                <Card title="File Upload">
                    <input
                        type="file"
                        accept=".csv"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <div className={styles.uploadArea} onClick={handleUploadClick}>
                        <UploadCloud size={48} className={styles.uploadIcon} />
                        <h3 className={styles.uploadText}>
                            {file ? file.name : 'Click to Upload CSV'}
                        </h3>
                        <p className={styles.uploadSubtext}>
                            {file ? 'File ready for processing' : 'Supports CSV (id, name, role, department, salary)'}
                        </p>
                    </div>
                </Card>

                <Card title="Connected Integrations">
                    <div className={styles.connectorGrid}>
                        <div className={styles.connector}>
                            <Database size={20} color="var(--primary)" />
                            <span className={styles.connectorName}>Workday</span>
                        </div>
                        <div className={styles.connector}>
                            <Database size={20} color="var(--success)" />
                            <span className={styles.connectorName}>BambooHR</span>
                        </div>
                        <div className={styles.connector}>
                            <Database size={20} color="var(--warning)" />
                            <span className={styles.connectorName}>ADP Workforce</span>
                        </div>
                        <div className={styles.connector} style={{ borderStyle: 'dashed', opacity: 0.6 }}>
                            <span className={styles.connectorName}>+ Add Connector</span>
                        </div>
                    </div>
                </Card>
            </div>

            {file && parsedData.length > 0 && !isProcessed && (
                <Card title="Data Preview & Processing" className={styles.validationSection}>
                    <div className={styles.alert} style={{ backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                        <CheckCircle size={20} />
                        <div>
                            <strong>{parsedData.length} Records Found</strong>
                            <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                                Ready to import employees from {file?.name}.
                            </p>
                        </div>
                    </div>

                    <table className={styles.mappingTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parsedData.slice(0, 3).map((row, index) => (
                                <tr key={index}>
                                    <td>{row.name}</td>
                                    <td>{row.role}</td>
                                    <td>{row.department}</td>
                                    <td>{row.salary}</td>
                                </tr>
                            ))}
                            {parsedData.length > 3 && (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                        ...and {parsedData.length - 3} more records
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleProcess} disabled={isValidating}>
                            {isValidating ? 'Processing...' : 'Import Data'}
                            <ArrowRight size={16} style={{ marginLeft: 8 }} />
                        </Button>
                    </div>
                </Card>
            )}

            {isProcessed && (
                <div className={styles.alert} style={{ backgroundColor: '#dcfce7', borderColor: '#22c55e', color: '#15803d', marginTop: '24px' }}>
                    <CheckCircle size={20} />
                    <div>
                        <strong>Import Successful!</strong>
                        <p style={{ fontSize: '0.875rem' }}>
                            Employee data has been added to the system. You can now proceed to Payroll Processing.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
