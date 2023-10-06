import Link from 'next/link';
import { getUserProjects } from '@/lib/actions';
import { UserProfile, ProjectInterface } from '@/types';
import ProjectCard from '@/components/ProjectCard';

type Props = {
  userId: string;
  projectId: string;
};

export default async function RelatedProjects({ userId, projectId }: Props) {
  const result = (await getUserProjects(userId)) as { user?: UserProfile };

  const filteredProjects = result?.user?.projects?.edges?.filter(
    ({ node }: { node: ProjectInterface }) => node.id !== projectId
  );

  if (filteredProjects?.length === 0) return null;

  return (
    <section className="mt-32 flex w-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-base font-bold">More by {result?.user?.name}</p>
        <Link
          href={`/profile/${userId}`}
          className="text-base text-primary-purple"
        >
          View All
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {filteredProjects
          ?.reverse()
          .map(({ node }: { node: ProjectInterface }) => (
            <ProjectCard
              key={node.id}
              id={node.id}
              image={node.image}
              title={node.title}
              isMini
            />
          ))}
      </div>
    </section>
  );
}
