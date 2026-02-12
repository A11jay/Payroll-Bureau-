"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Lock, Mail, Globe, Building } from 'lucide-react';
import styles from './page.module.css';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/');
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <div className={styles.brandPattern} />
                <div className={styles.branding}>
                    <h1 className={styles.logo}>Payroll Bureau</h1>
                    <p className={styles.tagline}>
                        Secure, compliant, and automated payroll tailored for modern enterprises.
                    </p>
                </div>
            </div>

            <div className={styles.rightPanel}>
                <div className={styles.authCard}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>
                            {isLogin ? 'Welcome Back' : 'Start Your Journey'}
                        </h2>
                        <p className={styles.subtitle}>
                            {isLogin
                                ? 'Sign in to access your payroll dashboard'
                                : 'Set up your organization in minutes'}
                        </p>
                    </div>

                    <form className={styles.form} onSubmit={handleLogin}>
                        {isLogin ? (
                            <>
                                <Input
                                    label="Work Email"
                                    placeholder="name@company.com"
                                    type="email"
                                    required
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                />
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button type="button" className={styles.link} style={{ fontSize: '0.75rem' }}>
                                        Forgot password?
                                    </button>
                                </div>
                                <Button type="submit" fullWidth>Sign In</Button>
                            </>
                        ) : (
                            <>
                                <Input
                                    label="Organization Name"
                                    placeholder="Acme Corp"
                                    required
                                />
                                <Input
                                    label="Admin Email"
                                    type="email"
                                    placeholder="admin@company.com"
                                    required
                                />
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <Input
                                        label="Country"
                                        placeholder="United States"
                                        style={{ flex: 1 }}
                                    />
                                    <Input
                                        label="Employees"
                                        type="number"
                                        placeholder="100+"
                                        style={{ flex: 1 }}
                                    />
                                </div>
                                <Button type="submit" fullWidth>Create Account</Button>
                            </>
                        )}
                    </form>

                    <div className={styles.divider}>
                        <span>OR</span>
                    </div>

                    <Button variant="outline" fullWidth>
                        <Globe size={18} style={{ marginRight: 8 }} />
                        App Center SSO
                    </Button>

                    <p className={styles.switchMode}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            className={styles.link}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Register Organization' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
