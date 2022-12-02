'use client';

import DashboardStat from '../../../components/dashboard/DashboardStat';

const role = sessionStorage.getItem('role') || '';

export default function Page() {
  return (
    <>
      <div className="w-full">
        <DashboardStat />
      </div>
    </>
  );
}
