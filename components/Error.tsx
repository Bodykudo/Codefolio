'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

type Props = {
  text: string;
};

export default function Error({ text }: Props) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="dark:bg-gray-800 flex flex-col items-center justify-center rounded-lg bg-white p-16 shadow-lg">
      <Image
        src="/error.svg"
        alt="Page Not Found"
        width={2000}
        height={2000}
        className="mb-4 h-auto w-[100%]"
      />
      <h1 className="mb-5 text-5xl font-bold text-primary-purple">404 Error</h1>
      <p className="dark:text-gray-300 mb-5 text-lg text-[#333333]">{text}</p>

      <Button title="Go Home" handleClick={onDismiss} />
    </div>
  );
}
