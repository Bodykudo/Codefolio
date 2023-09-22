import { NavLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const session = {};

  return (
    <nav className="flex items-center justify-between gap-4 border-b border-nav-border px-8 py-5">
      <div className="flex flex-1 items-center justify-start gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={43} alt="Codefolio" />
        </Link>
        <ul className="hidden gap-7 text-sm font-medium xl:flex">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center gap-4">
        {session ? (
          <>
            <p>UserPhoto</p>
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <button>Sign In</button>
          // <AuthProviders />
        )}
      </div>
    </nav>
  );
}
