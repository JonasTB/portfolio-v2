export interface NavItem {
  label: string;
  to: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Journey', to: '/journey' },
  { label: 'Work', to: '/work' },
  { label: 'Projects', to: '/projects' },
  { label: 'Posts', to: '/posts' },
  { label: 'Lab', to: '/lab' },
  { label: 'Contact', to: '/contact' },
];
