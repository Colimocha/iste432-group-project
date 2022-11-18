export type DashboardNavItem = {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    name: 'User',
    slug: 'employee',
  },
  {
    name: 'Ballot',
    slug: 'societyContact',
  },
  {
    name: 'Office',
    slug: '.',
  },
  {
    name: 'TBD...',
    slug: '.',
  },
];
