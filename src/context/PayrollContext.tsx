"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- Types ---

export interface Employee {
    id: string;
    name: string;
    role: string;
    department: string;
    salary: number;
    status: 'Active' | 'Inactive';
}

export interface PayrollRun {
    id: string;
    period: string; // e.g., "Feb 2026"
    status: 'Draft' | 'Processing' | 'Pending Approval' | 'Approved' | 'Completed';
    totalGross: number;
    totalTax: number;
    totalNet: number;
    dateProcessed: string;
    employeesIncluded: number;
}

export interface PayrollContextType {
    employees: Employee[];
    payrollRuns: PayrollRun[];
    addEmployees: (newEmployees: Employee[]) => void;
    createPayrollRun: (period: string) => void;
    updatePayrollStatus: (runId: string, status: PayrollRun['status']) => void;
    getLatestRun: () => PayrollRun | undefined;
}

const PayrollContext = createContext<PayrollContextType | undefined>(undefined);

// --- Provider ---

export function PayrollProvider({ children }: { children: ReactNode }) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([]);

    // Initial Mock Data to populate the state if empty
    useEffect(() => {
        if (employees.length === 0) {
            setEmployees([
                { id: 'E001', name: 'John Doe', role: 'Software Engineer', department: 'Engineering', salary: 120000, status: 'Active' },
                { id: 'E002', name: 'Jane Smith', role: 'Product Manager', department: 'Product', salary: 135000, status: 'Active' },
                { id: 'E003', name: 'Mike Johnson', role: 'Designer', department: 'Design', salary: 110000, status: 'Active' },
            ]);
        }
    }, []);

    const addEmployees = (newEmployees: Employee[]) => {
        setEmployees((prev) => [...prev, ...newEmployees]);
    };

    const createPayrollRun = (period: string) => {
        // Simple mock calculation logic
        const totalGross = employees.reduce((acc, emp) => acc + (emp.salary / 12), 0);
        const totalTax = totalGross * 0.25; // 25% tax rate
        const totalNet = totalGross - totalTax;

        const newRun: PayrollRun = {
            id: `RUN-${Date.now()}`,
            period,
            status: 'Processing',
            totalGross,
            totalTax,
            totalNet,
            dateProcessed: new Date().toISOString().split('T')[0],
            employeesIncluded: employees.length,
        };

        setPayrollRuns((prev) => [newRun, ...prev]);

        // Simulate processing time
        setTimeout(() => {
            updatePayrollStatus(newRun.id, 'Pending Approval');
        }, 2000);
    };

    const updatePayrollStatus = (runId: string, status: PayrollRun['status']) => {
        setPayrollRuns((prev) =>
            prev.map((run) => run.id === runId ? { ...run, status } : run)
        );
    };

    const getLatestRun = () => {
        return payrollRuns[0];
    };

    return (
        <PayrollContext.Provider value={{
            employees,
            payrollRuns,
            addEmployees,
            createPayrollRun,
            updatePayrollStatus,
            getLatestRun
        }}>
            {children}
        </PayrollContext.Provider>
    );
}

// --- Hook ---

export function usePayroll() {
    const context = useContext(PayrollContext);
    if (context === undefined) {
        throw new Error('usePayroll must be used within a PayrollProvider');
    }
    return context;
}
