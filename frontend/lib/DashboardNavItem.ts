export type DashboardNavItem = {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    name: 'User',
    slug: 'user',
  },
  {
    name: 'Society',
    slug: 'society',
  },
  {
    name: 'Ballot',
    slug: 'ballot',
  },
  {
    name: 'Office',
    slug: 'office',
  },
  {
    name: 'TBD...',
    slug: '.',
  },
];
