import Link from 'next/link';
import { cn } from '../lib/utils';
import { Poppins } from 'next/font/google';
import { ModeToggle } from './mode-toggle';

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
});

interface NavbarProps {
  title: string;
}

export const Navbar = ({ title }: NavbarProps) => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <Link href="/">
          <h1
            className={cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary',
              font.className
            )}
          >
            {title}
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <ModeToggle />
      </div>
    </div>
  );
};
