export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
      avatarURL
      description
      githubURL
      linkedInURL
    }
  }
`;

export const createUserMutation = `
  mutation CreateUer($input: UserCreateInput!) {
    userCreate(input: $input) {
      user {
        id
        name
        email
        avatarURL
        description
        githubURL
        linkedInURL
      }
    }
  }
`;

export const projectsQuery = `
  query GetProjects($endCursor: String) {
    projectCollection(first: 8, after: $endCursor, orderBy: { createdAt: DESC }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubURL
          description
          liveSiteURL
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarURL
          }
        }
      }
    }
  }
`;

export const projectsFilterQuery = `
  query GetProjects($category: String, $endCursor: String) {
    projectSearch(first: 8, after: $endCursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubURL
          description
          liveSiteURL
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarURL
          }
        }
      }
    }
  }
`;

export const getProjectQuery = `
  query GetProject($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      liveSiteURL
      githubURL
      figmaURL
      category
      createdBy {
        id
        name
        email
        avatarURL
      }
    }
}
`;

export const createProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      jobTitle
      description
      avatarURL
      linkedInURL
      githubURL
      behanceURL
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`;

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const editProjectMutation = `
  mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
    projectUpdate(by: { id: $id }, input: $input) {
      project {
        id
        title
        description
        createdBy {
          email
          name
        }
      }
    }
  }
`;

export const editUserMutation = `
  mutation UpdateUser($id: ID!, $input: UserUpdateInput!) {
    userUpdate(by: { id: $id }, input: $input) {
      user {
        id
        name
        email
      }
    }
  }
`;
