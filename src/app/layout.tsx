import type { Metadata } from 'next';
import '../scss/null.scss';
import Navbar from '@/components/Navbar';
import { routes } from '@/routes/routesConfig';

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
