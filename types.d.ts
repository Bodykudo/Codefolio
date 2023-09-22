import { User, Session } from 'next-auth';

type FormState = {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

type ProjectInterface = {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    id: string;
  };
};

type UserProfile = {
  id: string;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  projects: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

type SessionInterface = Session & {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
};

type ProjectForm = {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};
