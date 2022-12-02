export type DashboardNavItem = {
  name: string;
  slug: string;
  role?: string[];
  description?: string;
  icon?: string;
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    name: 'User',
    slug: 'user',
    role: ['employee'],
  },
  {
    name: 'Society',
    slug: 'society',
    role: ['employee'],
  },
  {
    name: 'Ballot',
    slug: 'ballot',
    role: ['employee', 'societyContact'],
  },
  {
    name: 'Office',
    slug: 'office',
    role: ['employee'],
  },
  {
    name: 'Candidate',
    slug: 'candidate',
    role: ['employee'],
  },
];
