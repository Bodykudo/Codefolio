import { fetchAllProjects } from '@/lib/actions';
import { ProjectInterface } from '@/types';
import Categories from '@/components/Categories';
import Pagination from '@/components/Pagination';
import ProjectCard from '@/components/ProjectCard';

type ProjectSearch = {
  projectCollection?: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
  projectSearch?: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
};

type Props = {
  searchParams: SearchParams;
};

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default async function Home({
  searchParams: { category, endcursor },
}: Props) {
  const data = (await fetchAllProjects({
    category: category || '',
    endCursor: endcursor || '',
  })) as ProjectSearch;

  const projectsToDisplay = category
    ? data.projectSearch?.edges.reverse()
    : data.projectCollection?.edges || [];

  if (projectsToDisplay?.length === 0) {
    return (
      <section className="flex flex-col items-center justify-start px-5 py-6 lg:px-20">
        <Categories />
        <p className="my-10 w-full px-2 text-center">
          No projects found, go create some first.
        </p>
      </section>
    );
  }

  const pagination = category
    ? data.projectSearch?.pageInfo
    : data.projectCollection?.pageInfo;

  return (
    <section className="mb-16 flex flex-col items-center justify-start px-5 py-6 lg:px-20">
      <Categories />
      <section className="mt-10 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {projectsToDisplay?.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node.id}
            id={node.id}
            image={node.image}
            title={node.title}
            name={node.createdBy.name}
            avatarURL={node.createdBy.avatarURL}
            userId={node.createdBy.id}
          />
        ))}
      </section>
      <Pagination
        endCursor={pagination?.endCursor || ''}
        hasNextPage={pagination?.hasNextPage || false}
      />
    </section>
  );
}
