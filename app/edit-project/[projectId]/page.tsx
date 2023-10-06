import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session';
import { ProjectInterface } from '@/types';
import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';

export const metadata: Metadata = {
  title: 'Codefolio - Edit Project',
};

export default async function EditProject({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  const session = await getCurrentUser();

  if (!session?.user) redirect('/');

  const result = (await getProjectDetails(projectId)) as {
    project?: ProjectInterface;
  };

  if (result.project?.createdBy.id !== session?.user.id) redirect('/');

  return (
    <Modal>
      <h3 className="w-full max-w-5xl text-left text-3xl font-extrabold md:text-5xl">
        Edit Project
      </h3>
      <ProjectForm type="edit" session={session} project={result?.project} />
    </Modal>
  );
}
