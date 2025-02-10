'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './FrontendLayout.module.css';
import { ReactNode } from 'react';

const FrontendLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  return (
    <div className={s.page}>
      <nav className={s.page__nav}>
        <Link href='/' className={pathname == '/' ? s.page__nav__selected : ''}>Homepage</Link>
        <Link href='/productos' className={pathname == '/productos' ? s.page__nav__selected : ''}>Productos</Link>
      </nav>
      <main>
        {children}
      </main>
    </div>
  );
};

export default FrontendLayout;
