import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Drasard — Digital Experiences, Precisely Crafted',
  description: 'Drasard is a premium web design and digital experience studio.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}