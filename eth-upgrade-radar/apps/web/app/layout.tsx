import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const items = [
    ['/', 'Dashboard'],
    ['/upgrade/fusaka', 'Upgrade'],
    ['/eip/4844', 'EIP'],
    ['/meeting/acde-201', 'Meeting'],
    ['/search', 'Search'],
    ['/watchlist', 'Watchlist']
  ];

  return (
    <html lang="en">
      <body>
        <header className="top">
          <div className="top-inner">
            <div className="brand">Eth Upgrade Radar</div>
            <nav className="nav">
              {items.map(([href, label]) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
