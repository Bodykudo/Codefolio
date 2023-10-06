import { Metadata } from 'next';
import Modal from '@/components/Modal';
import { getUserProjects } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session';
import { UserProfile } from '@/types';
import ProifleForm from './components/ProifleForm';

export const metadata: Metadata = {
  title: 'Codefolio - Edit Profile',
};

export default async function EditProfile() {
  const session = await getCurrentUser();
  const result = (await getUserProjects(session?.user.id, 100)) as {
    user: UserProfile;
  };

  if (!result.user) {
    return (
      <p className="my-10 w-full px-2 text-center">
        Failed to fetch user information
      </p>
    );
  }

  return (
    <Modal>
      <h3 className="w-full max-w-5xl text-left text-3xl font-extrabold md:text-5xl">
        Edit Profile
      </h3>
      <ProifleForm session={session} user={result.user} />
    </Modal>
  );
}
