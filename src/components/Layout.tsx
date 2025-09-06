import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    role: 'CITIZEN' | 'STAFF' | 'ADMIN';
  } | null;
  onSignOut?: () => void;
}

export function Layout({ children, user, onSignOut }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onSignOut={onSignOut} />
      <main>{children}</main>
    </div>
  );
}