import type { Metadata } from 'next';
import './globals.css';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Payroll Bureau',
  description: 'Enterprise Payroll Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
