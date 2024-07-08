import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from './lib/registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Get your recipe',
  description: "Generate recipes by voice for people who can't write",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body style={inter.style}>{children}</body>
      </StyledComponentsRegistry>
    </html>
  );
}
