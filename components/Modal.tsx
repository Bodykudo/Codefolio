'use client';

import { MouseEvent, ReactNode, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  children: ReactNode;
};

export default function Modal({ children }: Props) {
  const overylay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === overylay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overylay]
  );

  return (
    <div
      ref={overylay}
      onClick={handleClick}
      className="fixed bottom-0 left-0 right-0 top-0 z-50 mx-auto bg-black/80"
    >
      <button
        type="button"
        onClick={onDismiss}
        className="absolute right-8 top-4"
      >
        <Image src="/close.svg" width={17} height={17} alt="Close" />
      </button>

      <div
        ref={wrapper}
        className="absolute bottom-0 flex h-[95%] w-full flex-col items-center justify-start overflow-auto rounded-t-3xl bg-white px-8 pb-72 pt-14 lg:px-40"
      >
        {children}
      </div>
    </div>
  );
}
