import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Currency Converter',
  description: 'Simple currency converter.',
};

// const linkList = ['Home', 'Converter', 'Currency List', 'Something'];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <nav>
          <ul>
            {linkList.map((link, index) => (
              <div key={index}>{link}</div>
            ))}
          </ul>
        </nav> */}
        <main>{children}</main>
      </body>
    </html>
  );
}
