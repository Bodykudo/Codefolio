'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { deleteProject, fetchToken } from '@/lib/actions';

type Props = {
  projectId: string;
};

export default function ProjectActions({ projectId }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteProject = async () => {
    setIsDeleting(true);
    const { token } = await fetchToken();
    const loading = toast.loading('Deleting project...');

    try {
      await deleteProject(projectId, token);
      toast.remove(loading);
      toast.success('Project deleted successfully!');
      router.push('/');
    } catch (error) {
      toast.remove(loading);
      toast.error('Project failed to delete');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flex items-center justify-center rounded-lg bg-light-white-400 p-3 text-sm font-medium text-gray-100 hover:bg-light-white-200"
      >
        <Image src="/pencile.svg" width={15} height={15} alt="Edit Project" />
      </Link>

      <button
        type="button"
        className={`flex items-center justify-center rounded-lg p-3 text-sm font-medium text-gray-100 transition-all hover:bg-red-600 ${
          isDeleting ? 'bg-gray' : 'bg-primary-purple'
        }`}
        onClick={handleDeleteProject}
      >
        <Image src="/trash.svg" width={15} height={15} alt="Delete Project" />
      </button>
    </>
  );
}
