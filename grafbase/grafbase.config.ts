import { g, config, auth } from '@grafbase/sdk';

// @ts-ignore
const User = g
  .model('User', {
    name: g.string().length({ min: 2, max: 20 }),
    email: g.string().unique(),
    avatarURL: g.url(),
    jobTitle: g.string().optional(),
    description: g.string().optional(),
    githubURL: g.string().optional(),
    linkedInURL: g.string().optional(),
    behanceURL: g.string().optional(),
    projects: g
      .relation((): any => Project)
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read(), rules.private().create().delete().update();
  });

// @ts-ignore
const Project = g
  .model('Project', {
    title: g.string().length({ min: 3 }),
    description: g.string(),
    image: g.url(),
    liveSiteURL: g.string().optional(),
    githubURL: g.string().optional(),
    figmaURL: g.string().optional(),
    category: g.string().search(),
    createdBy: g.relation(() => User),
    views: g.int().default(0),
  })
  .auth((rules) => {
    rules.public().read(), rules.private().create().delete().update();
  });

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET'),
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
