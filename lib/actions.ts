import {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  editProjectMutation,
  editUserMutation,
  getProjectQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsFilterQuery,
  projectsQuery,
} from '@/graphql';
import { GraphQLClient } from 'graphql-request';
import { ProjectForm, UserForm } from '@/types';
import { isBase64DataURL } from './utils';

const isProduction = process.env.NODE_ENV === 'production';
const apiURL = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ''
  : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ''
  : 'letmein';
const serverURL = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : 'http://localhost:3000';

const client = new GraphQLClient(apiURL);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = (email: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarURL: string) => {
  client.setHeader('x-api-key', apiKey);
  const variables = {
    input: {
      name,
      email,
      avatarURL,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverURL}/api/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverURL}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageURL = await uploadImage(form.image);
  if (imageURL.url) {
    client.setHeader('Authorization', `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: imageURL.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const fetchAllProjects = ({
  category,
  endCursor,
}: {
  category?: string;
  endCursor?: string;
}) => {
  client.setHeader('x-api-key', apiKey);
  if (category) {
    if (endCursor) {
      return makeGraphQLRequest(projectsFilterQuery, { category, endCursor });
    } else {
      return makeGraphQLRequest(projectsFilterQuery, { category });
    }
  } else {
    if (endCursor) {
      return makeGraphQLRequest(projectsQuery, { endCursor });
    } else {
      return makeGraphQLRequest(projectsQuery, {});
    }
  }
};

export const getProjectDetails = async (id: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getProjectQuery, { id });
};

export const getUserProjects = async (id: string, last?: number) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const deleteProject = async (id: string, token: string) => {
  client.setHeader('Authorization', `Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const editProject = async (
  form: ProjectForm,
  projectId: string,
  token: string
) => {
  client.setHeader('Authorization', `Bearer ${token}`);
  let updatedForm = { ...form };
  const isNewImage = isBase64DataURL(form.image);

  if (isNewImage) {
    const imageUrl = await uploadImage(form.image);
    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  client.setHeader('Authorization', `Bearer ${token}`);
  const variables = {
    id: projectId,
    input: updatedForm,
  };
  return makeGraphQLRequest(editProjectMutation, variables);
};

export const editUser = async (
  form: UserForm,
  userId: string,
  token: string
) => {
  client.setHeader('Authorization', `Bearer ${token}`);
  let updatedForm: UserForm = {
    ...form,
    linkedInURL:
      form.linkedInURL && 'https://www.linkedin.com/in/' + form.linkedInURL,
    githubURL: form.githubURL && 'https://github.com/' + form.githubURL,
    behanceURL: form.behanceURL && 'https://www.behance.net/' + form.behanceURL,
  };

  client.setHeader('Authorization', `Bearer ${token}`);
  const variables = {
    id: userId,
    input: updatedForm,
  };
  return makeGraphQLRequest(editUserMutation, variables);
};
