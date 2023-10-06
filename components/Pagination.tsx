'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Button from './Button';

type Props = {
  endCursor: string;
  hasNextPage: boolean;
};

export default function Pagination({ endCursor, hasNextPage }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const [cursors, setCursors] = useState<string[]>([]);

  const handleNavigation = (type: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (type === 'prev' && cursors.length > 0) {
      const currCurser = cursors[cursors.length - 2];
      if (currCurser) {
        currentParams.set('endcursor', currCurser);
      } else {
        currentParams.delete('endcursor');
      }
      setCursors(cursors.slice(0, -1));
    } else if (type === 'next' && hasNextPage) {
      setCursors([...cursors, endCursor]);
      currentParams.set('endcursor', endCursor);
    }

    router.push(`${pathName}?${currentParams.toString()}`);
  };

  return (
    <div className="mt-10 flex w-full items-center justify-center gap-5">
      {(cursors.length > 0 || hasNextPage) && (
        <>
          <Button
            title="Previous Page"
            isDisabled={cursors.length === 0}
            handleClick={() => handleNavigation('prev')}
          />
          <Button
            title="Next Page"
            isDisabled={!hasNextPage}
            handleClick={() => handleNavigation('next')}
          />
        </>
      )}
    </div>
  );
}
