import Image from 'next/image';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';
import { getCurrentUser } from '@/lib/session';
import { getProjectDetails } from '@/lib/actions';
import { ProjectInterface } from '@/types';
import RelatedProjects from '../components/RelatedProjects';
import ProjectActions from '../components/ProjectActions';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Error from '@/components/Error';

type Props = {
  params: { projectId: string };
};

export async function generateMetadata({
  params: { projectId },
}: Props): Promise<Metadata> {
  const result = (await getProjectDetails(projectId)) as {
    project?: ProjectInterface;
  };

  if (!result?.project) {
    return {};
  }

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  return {
    title: `Codefolio - ${result.project?.title}`,
    description: result.project?.description,
    openGraph: {
      title: `Codefolio - ${result.project?.title}`,
      images: [result.project?.image as string, '/codefolio.png', '/logo.png'],
      url: baseUrl ? `${baseUrl}/project/${projectId}` : 'undefined',
    },
    twitter: {
      title: `Codefolio - ${result.project?.title}`,
      images: [result.project?.image as string, '/codefolio.png', '/logo.png'],
    },
  };
}

export default async function Project({ params: { projectId } }: Props) {
  const session = await getCurrentUser();
  const result = (await getProjectDetails(projectId)) as {
    project?: ProjectInterface;
  };

  if (!result?.project) {
    return (
      <div className="mx-auto flex items-center justify-center bg-white">
        <Error text="This project could not be found" />
      </div>
    );
  }

  const projectDetails = result.project;
  const projectCreator = projectDetails.createdBy;

  return (
    <Modal>
      <section className="flex w-full max-w-4xl items-center justify-between gap-y-8 max-xs:flex-col">
        <div className="flex w-full flex-1 items-start gap-5 max-xs:flex-col">
          <Link href={`/profile/${projectCreator.id}`}>
            <Image
              src={projectCreator.avatarURL}
              width={50}
              height={50}
              alt={`${projectCreator.name} Profile`}
              className="rounded-full"
            />
          </Link>

          <div className="flex flex-1 flex-col items-center justify-start gap-1">
            <p className="self-start text-lg font-semibold">
              {projectDetails.title}
            </p>
            <div className="flex w-full flex-wrap gap-2 whitespace-nowrap text-sm font-normal">
              <Link href={`/profile/${projectCreator.id}`}>
                {projectCreator.name}
              </Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${projectDetails.category}`}
                className="font-semibold text-primary-purple"
              >
                {projectDetails.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user.email === projectCreator.email && (
          <div className="flex items-center justify-end gap-2">
            <ProjectActions projectId={projectId} />
          </div>
        )}
      </section>

      <section className="mt-14">
        <Image
          src={projectDetails.image}
          className="rounded-2xl object-cover"
          width={1064}
          height={798}
          alt={`${projectDetails.title} Poster`}
        />
      </section>

      <section className="mt-14 flex flex-col items-center justify-center">
        <p className="max-w-5xl text-xl font-normal">
          {projectDetails.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-5">
          {projectDetails.githubURL && (
            <Link
              href={projectDetails.githubURL}
              target="_blank"
              rel="noreferrer"
            >
              <Button title="Github" leftIcon="/github.svg" />
            </Link>
          )}
          {projectDetails.githubURL && projectDetails.liveSiteURL && (
            <Image src="/dot.svg" width={4} height={4} alt="dot" />
          )}
          {projectDetails.liveSiteURL && (
            <Link
              href={projectDetails.liveSiteURL}
              target="_blank"
              rel="noreferrer"
            >
              <Button title="Live Site" leftIcon="/website.svg" />
            </Link>
          )}
          {projectDetails.liveSiteURL && projectDetails.figmaURL && (
            <Image src="/dot.svg" width={4} height={4} alt="dot" />
          )}
          {projectDetails.figmaURL && (
            <Link
              href={projectDetails.figmaURL}
              target="_blank"
              rel="noreferrer"
            >
              <Button title="Figma Prototype" leftIcon="/figma.svg" />
            </Link>
          )}
        </div>
      </section>

      <section className="mt-28 flex w-full items-center justify-center gap-8">
        <span className="h-0.5 w-full bg-light-white-200" />
        <Link
          href={`/profile/${projectCreator.id}`}
          className="h-[5.125rem] min-w-[5.125rem]"
        >
          <Image
            src={projectCreator.avatarURL}
            className="rounded-full"
            width={82}
            height={82}
            alt={`${projectCreator.name} Avatar`}
          />
        </Link>
        <span className="h-0.5 w-full bg-light-white-200" />
      </section>

      <RelatedProjects userId={projectCreator.id} projectId={projectId} />
    </Modal>
  );
}
