import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { routes } from '@/routes/routesConfig';

import '../scss/null.scss';

export const metadata: Metadata = {
  title: 'Currency Converter',
  description: 'Simple currency converter.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Navbar title="Currency converter" linkList={routes} />
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
