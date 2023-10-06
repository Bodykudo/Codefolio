'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { categoryFilters } from '@/constants';

export default function Categories() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get('category');

  const handleTags = (filter: string) => {
    if (category === filter) {
      router.push(pathName);
    } else {
      router.push(`${pathName}?category=${filter}`);
    }
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-5">
      <ul className="flex gap-2 overflow-auto scrollbar-thin scrollbar-track-[#f1f1f1] scrollbar-thumb-[#888] scrollbar-track-rounded-md scrollbar-thumb-rounded-md hover:scrollbar-thumb-[#888]/80">
        {categoryFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleTags(filter)}
            className={`${
              category === filter
                ? 'bg-light-white-300 font-medium'
                : 'font-normal'
            } whitespace-nowrap rounded-lg px-4 py-3 capitalize`}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
}
