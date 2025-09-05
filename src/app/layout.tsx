import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Automata Theory Quiz',
  description: 'Active recall quiz for Automata Theory concepts covering finite automata, regular languages, context-free grammars, and computational complexity.',
  keywords: ['automata theory', 'computer science', 'finite automata', 'regular languages', 'context-free grammars', 'turing machines', 'complexity theory', 'quiz', 'active recall'],
  authors: [{ name: 'Automata Theory Quiz' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}