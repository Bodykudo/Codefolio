import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';

export const metadata: Metadata = {
  title: 'Codefolio - Share Work',
};

export default async function CreateProject() {
  const session = await getCurrentUser();

  if (!session?.user) redirect('/');

  return (
    <Modal>
      <h3 className="w-full max-w-5xl text-left text-3xl font-extrabold md:text-5xl">
        Create a New Project
      </h3>
      <ProjectForm type="create" session={session} />
    </Modal>
  );
}
