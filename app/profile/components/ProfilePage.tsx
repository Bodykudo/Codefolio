import Link from 'next/link';
import Image from 'next/image';
import { getCurrentUser } from '@/lib/session';
import { ProjectInterface, UserProfile } from '@/types';
import Button from '@/components/Button';
import ProjectCard from '@/components/ProjectCard';

type Props = {
  user: UserProfile;
};

export default async function ProfilePage({ user }: Props) {
  const session = await getCurrentUser();

  return (
    <section className="mx-auto flex w-full max-w-10xl flex-col items-center justify-center px-5 py-6 lg:px-20">
      <section className="flex w-full items-center justify-between gap-10 max-lg:flex-col">
        <div className="flex w-full flex-col items-start">
          <Image
            src={user.avatarURL}
            width={100}
            height={100}
            alt={`${user.name} profile picture`}
            className="rounded-full"
          />
          <p className="mt-10 text-4xl font-bold">{user.name}</p>
          {user.jobTitle && (
            <p className="max-w-lg text-3xl font-extrabold md:mt-6 md:text-5xl">
              {user.jobTitle}
            </p>
          )}
          {user.description && (
            <p className="text-md mt-4 max-w-sm whitespace-break-spaces">
              {user.description}
            </p>
          )}

          <div className="mt-8 flex w-full flex-col flex-wrap gap-5">
            {session?.user?.email === user.email ? (
              <div className="flex items-center justify-start gap-2">
                <Link href="/edit-profile">
                  <Button
                    title="Edit"
                    leftIcon="/pencile.svg"
                    bgColor="bg-light-white-400"
                    textColor="black"
                  />
                </Link>
              </div>
            ) : (
              <Link href={`mailto:${user.email}`}>
                <Button title="Hire Me" leftIcon="/email.svg" />
              </Link>
            )}
            <div className="flex flex-wrap items-center justify-start gap-2">
              {user.linkedInURL && (
                <Link href={user.linkedInURL} target="_blank">
                  <Button title="LinkedIn" leftIcon="/email.svg" />
                </Link>
              )}

              {user.githubURL && (
                <Link href={user.githubURL} target="_blank">
                  <Button title="Github" leftIcon="/github.svg" />
                </Link>
              )}

              {user.behanceURL && (
                <Link href={user.behanceURL} target="_blank">
                  <Button title="Behance" leftIcon="/behance.svg" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {user.projects?.edges?.length > 0 ? (
          <Image
            src={user.projects.edges.reverse()[0].node.image}
            alt={`${user.projects.edges.reverse()[0].node.title} project image`}
            width={739}
            height={554}
            className="rounded-xl object-contain"
          />
        ) : (
          <Image
            src="/profile-post.png"
            width={739}
            height={554}
            alt=""
            className="rounded-xl"
          />
        )}
      </section>

      <section className="mt-16 flex w-full flex-col items-center justify-start lg:mt-28">
        <p className="w-full text-left text-lg font-semibold">Recent Work</p>
        <div className="mt-5 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {user?.projects?.edges
            ?.reverse()
            .map(({ node }: { node: ProjectInterface }) => (
              <ProjectCard
                key={`${node?.id}`}
                id={node?.id}
                image={node?.image}
                title={node?.title}
                name={user.name}
                avatarURL={user.avatarURL}
                userId={user.id}
              />
            ))}
        </div>
      </section>
    </section>
  );
}
