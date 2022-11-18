import '#/styles/globals.css';
import DashboardLayout from '../layouts/dashboard/layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <DashboardLayout>{children}</DashboardLayout>
    </html>
  );
}
