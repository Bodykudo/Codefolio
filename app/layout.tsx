import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { keywords } from '@/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Codefolio',
  description:
    'Codefolio: Showcase your coding prowess with style. Share and discover developer projects, each presented with eye-catching posters and categorized for easy exploration. Elevate your portfolio in the coding community. Start building your digital footprint today.',
  authors: { name: 'Abdallah Magdy' },
  keywords,
  openGraph: {
    title: 'Codefolio',
    type: 'website',
    images: ['/codefolio.png', '/logo.png'],
    url: process.env.NEXT_PUBLIC_SERVER_URL || 'undefined',
    description:
      'Codefolio: Showcase your coding prowess with style. Share and discover developer projects, each presented with eye-catching posters and categorized for easy exploration. Elevate your portfolio in the coding community. Start building your digital footprint today.',
  },
  twitter: {
    title: 'Codefolio',
    description:
      'Codefolio: Showcase your coding prowess with style. Share and discover developer projects, each presented with eye-catching posters and categorized for easy exploration. Elevate your portfolio in the coding community. Start building your digital footprint today.',
    card: 'summary_large_image',
    creator: 'a_m_s666',
    images: ['/codefolio.png', '/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`scrollbar-thin scrollbar-track-[#f1f1f1] scrollbar-thumb-[#888] scrollbar-track-rounded-md scrollbar-thumb-rounded-md hover:scrollbar-thumb-[#888]/80 ${inter.className}`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
