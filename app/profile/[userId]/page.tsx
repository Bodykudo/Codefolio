import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { getUserProjects } from '@/lib/actions';
import { UserProfile } from '@/types';
import ProfilePage from '../components/ProfilePage';
import Error from '@/components/Error';

type Props = {
  params: { userId: string };
  parent?: ResolvingMetadata;
};

export async function generateMetadata({
  params: { userId },
  parent,
}: Props): Promise<Metadata> {
  const result = (await getUserProjects(userId, 100)) as { user: UserProfile };

  if (!result.user) {
    return {};
  }

  let previousImages: any;
  if (parent) {
    previousImages = (await parent).openGraph?.images || [];
  } else {
    previousImages = [];
  }
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  return {
    title: `Codefolio - ${result.user.name}`,
    description: result.user.description,
    openGraph: {
      title: `Codefolio - ${result.user.name}`,
      images: [result.user.avatarURL, ...previousImages],
      url: baseUrl ? `${baseUrl}/profile/${userId}` : 'undefined',
    },
    twitter: {
      title: `Codefolio - ${result.user.name}`,
      images: [result.user.avatarURL, ...previousImages],
    },
  };
}

export default async function Profile({ params: { userId } }: Props) {
  const result = (await getUserProjects(userId, 100)) as { user: UserProfile };

  if (!result.user) {
    return (
      <div className="mx-auto flex items-center justify-center bg-white">
        <Error text="This user could not be found" />
      </div>
    );
  }

  return <ProfilePage user={result.user} />;
}
