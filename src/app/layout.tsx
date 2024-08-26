import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dory App',
  description: 'Dory app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-w-[1024px]">{children}</body>
    </html>
  );
}
