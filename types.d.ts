import { User, Session } from 'next-auth';

type FormState = {
  title: string;
  description: string;
  image: string;
  liveSiteURL: string;
  githubURL: string;
  figmaURL: string;
  category: string;
};

type ProjectInterface = {
  title: string;
  description: string;
  image: string;
  liveSiteURL: string;
  githubURL: string;
  figmaURL: string;
  category: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarURL: string;
    id: string;
  };
};

type UserProfile = {
  id: string;
  name: string;
  email: string;
  jobTitle: string | null;
  description: string | null;
  avatarURL: string;
  githubURL: string | null;
  linkedInURL: string | null;
  behanceURL: string | null;
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
    avatarURL: string;
  };
};

type ProjectForm = {
  title: string;
  description: string;
  image: string;
  liveSiteURL: string;
  githubURL: string;
  figmaURL: string;
  category: string;
};

type UserForm = {
  name: string;
  email: string;
  jobTitle: string;
  description: string;
  linkedInURL: string;
  githubURL: string;
  behanceURL: string;
};
