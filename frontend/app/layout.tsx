import '#/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="winter">
      <head />
      <body className="overflow-y-scroll bg-gray-800 bg-[url('/grid.svg')]">
        {children}
      </body>
    </html>
  );
}
