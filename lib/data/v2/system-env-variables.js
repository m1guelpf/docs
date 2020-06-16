import ProductName from '~/components/name/product-name'
import { DEPLOYMENT_SUFFIX } from '~/lib/constants'
import Link from '~/components/text/link'

export const BASE_SYSTEM_ENVS = [
  {
    name: 'VERCEL_URL',
    description: 'The URL of the deployment.',
    example: `my-site-7q03y4pi5.${DEPLOYMENT_SUFFIX}`
  }
]

export const GITHUB_SYSTEM_ENVS = [
  {
    name: 'VERCEL_GITHUB_DEPLOYMENT',
    description: (
      <>
        An indicator for whether the app was deployed by <ProductName /> for
        GitHub.
      </>
    ),
    example: '1'
  },
  {
    name: 'VERCEL_GITHUB_ORG',
    description:
      'The GitHub organization that owns the repository the deployment is triggered from.',
    example: 'acme'
  },
  {
    name: 'VERCEL_GITHUB_REPO',
    description: 'The origin repository of the app on GitHub.',
    example: 'my-site'
  },
  {
    name: 'VERCEL_GITHUB_COMMIT_ORG',
    description:
      'The GitHub organization of which the commit belongs. For example, when submitting a pull request from a forked repository.',
    example: 'acme'
  },
  {
    name: 'VERCEL_GITHUB_COMMIT_REPO',
    description:
      'The GitHub repository of which the commit belongs. For example, when submitting a pull request from a forked repository.',
    example: 'my-site'
  },
  {
    name: 'VERCEL_GITHUB_COMMIT_REF',
    description: 'The GitHub branch that the deployment was made from.',
    example: 'improve-about-page'
  },
  {
    name: 'VERCEL_GITHUB_COMMIT_SHA',
    description: (
      <>
        The GitHub{' '}
        <Link href="https://help.github.com/articles/github-glossary/#commit">
          SHA
        </Link>{' '}
        of the commit the deployment was triggered by.
      </>
    ),
    example: 'fa1eade47b73733d6312d5abfad33ce9e4068081'
  },
  {
    name: 'VERCEL_GITHUB_COMMIT_AUTHOR_LOGIN',
    description:
      'The GitHub username belonging to the author of the commit that the project was deployed by.',
    example: 'johndoe'
  },
  {
    name: 'VERCEL_GITHUB_COMMIT_AUTHOR_NAME',
    description:
      'The GitHub name belonging to the author of the commit that the project was deployed by.',
    example: 'John Doe'
  }
]

export const GITLAB_SYSTEM_ENVS = [
  {
    name: 'VERCEL_GITLAB_DEPLOYMENT',
    description: (
      <>
        An indicator for whether the app was deployed by <ProductName /> for
        GitLab.
      </>
    ),
    example: '1'
  },
  {
    name: 'VERCEL_GITLAB_PROJECT_NAMESPACE',
    description:
      'The GitLab user, group, or sub-group that the project belongs to.',
    example: 'Acme'
  },
  {
    name: 'VERCEL_GITLAB_PROJECT_NAME',
    description: 'The GitLab name of the deployed project.',
    example: 'my-site'
  },
  {
    name: 'VERCEL_GITLAB_PROJECT_ID',
    description: 'The GitLab ID of the deployed project.',
    example: '13343236'
  },
  {
    name: 'VERCEL_GITLAB_PROJECT_PATH',
    description: 'The GitLab project path.',
    example: 'acme/my-site'
  },
  {
    name: 'VERCEL_GITLAB_COMMIT_REF',
    description: 'The GitLab branch that the deployment was triggered by.',
    example: 'improve-about-page'
  },
  {
    name: 'VERCEL_GITLAB_COMMIT_SHA',
    description:
      'The GitLab sha of the commit the deployment was triggered by.',
    example: 'fa1eade47b73733d6312d5abfad33ce9e4068081'
  },
  {
    name: 'VERCEL_GITLAB_COMMIT_MESSAGE',
    description:
      'The message accompanying the GitLab commit that the deployment was triggered by.',
    example: 'Add John Doe to about page'
  },
  {
    name: 'VERCEL_GITLAB_COMMIT_AUTHOR_LOGIN',
    description:
      'The username belonging to the author of the commit that was deployed on GitLab.',
    example: 'johndoe'
  },
  {
    name: 'VERCEL_GITLAB_COMMIT_AUTHOR_NAME',
    description:
      'The name belonging to the author of the commit that was deployed on GitLab.',
    example: 'John Doe'
  }
]

export const BITBUCKET_SYSTEM_ENVS = [
  {
    name: 'VERCEL_BITBUCKET_DEPLOYMENT',
    description: (
      <>
        An indicator for whether the app was deployed by <ProductName /> for
        Bitbucket.
      </>
    ),
    example: '1'
  },
  {
    name: 'VERCEL_BITBUCKET_REPO_OWNER',
    description: 'The Bitbucket user or team that the project belongs to.',
    example: 'acme'
  },
  {
    name: 'VERCEL_BITBUCKET_REPO_SLUG',
    description: 'The slug of the Bitbucket repository that was deployed.',
    example: 'my-site'
  },
  {
    name: 'VERCEL_BITBUCKET_REPO_NAME',
    description: 'The name of the Bitbucket repository that was deployed.',
    example: 'my-site'
  },
  {
    name: 'VERCEL_BITBUCKET_COMMIT_REF',
    description: 'The Bitbucket branch that the deployment was triggered by.',
    example: 'improve-about-page'
  },
  {
    name: 'VERCEL_BITBUCKET_COMMIT_SHA',
    description:
      'The Bitbucket sha of the commit the deployment was triggered by.',
    example: 'fa1eade47b73733d6312d5abfad33ce9e4068081'
  },
  {
    name: 'VERCEL_BITBUCKET_COMMIT_MESSAGE',
    description:
      'The message accompanying the Bitbucket commit that was deployed.',
    example: 'Add John Doe to about page'
  },
  {
    name: 'VERCEL_BITBUCKET_COMMIT_AUTHOR_NAME',
    description: 'The name of the commit author on Bitbucket.',
    example: 'John Doe'
  },
  {
    name: 'VERCEL_BITBUCKET_COMMIT_AUTHOR_URL',
    description: 'Bitbucket profile URL of the commit author.',
    example: 'https://bitbucket.org/%7B45585b19-b616-401e-89d3-1a47fddb7033%7D/'
  }
]

export const SYSTEM_ENVS = [
  ...BASE_SYSTEM_ENVS,
  ...GITHUB_SYSTEM_ENVS,
  ...GITLAB_SYSTEM_ENVS,
  ...BITBUCKET_SYSTEM_ENVS
]
