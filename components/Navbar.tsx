import Link from 'next/link';
import Image from 'next/image';
import { getCurrentUser } from '@/lib/session';
import AuthProviders from './AuthProviders';
import ProfileMenu from './ProfileMenu';
import Button from './Button';

export default async function Navbar() {
  const session = await getCurrentUser();

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-nav-border bg-white px-8 py-5">
      <div className="flex flex-1 items-center justify-start gap-10">
        <Link href="/">
          <Image src="/logo.png" width={200} height={400} alt="Codefolio" />
        </Link>
      </div>

      <div className="flex items-center justify-center gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href="/create-project">
              <Button title="Share Work" />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
}
