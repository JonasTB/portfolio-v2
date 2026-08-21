import { NavLink } from 'react-router';
import { navItems } from '../../config/navigation';
import { cn } from '../../lib/cn';

export function DesktopNav() {
  return (
    <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            cn(
              'rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors duration-150 ease-signature hover:text-text',
              isActive && 'text-text',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
