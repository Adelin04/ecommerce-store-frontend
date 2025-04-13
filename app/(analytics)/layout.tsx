import type { Metadata } from 'next'
import React, { ReactElement } from 'react'
import Footer from '../component/footer';
import NavBar from '../component/navBar';


export const metadata: Metadata = {
  title: 'BOUTIQUE',
  description: 'Online Store',
}

export default function AnalyticsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      Analytics Layout
      {children}
    </React.Fragment>

  );
}
