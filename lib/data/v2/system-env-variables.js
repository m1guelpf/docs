import ProductName from '~/components/name/product-name'
import Link from '~/components/text/link'

export const BASE_SYSTEM_ENVS = [
  {
    name: 'NOW_URL',
    description: 'The URL of the deployment.'
  }
]

export const GITHUB_SYSTEM_ENVS = [
  {
    name: 'NOW_GITHUB_DEPLOYMENT',
    description: (
      <>
        An indicator for whether the app was deployed by <ProductName /> for
        GitHub.
      </>
    )
  },
  {
    name: 'NOW_GITHUB_ORG',
    description:
      'The GitHub organization that owns the repository the deployment is triggered from.'
  },
  {
    name: 'NOW_GITHUB_REPO',
    description: 'The origin repository of the app on GitHub.'
  },
  {
    name: 'NOW_GITHUB_COMMIT_ORG',
    description:
      'The GitHub organization of which the commit belongs. For example, when submitting a pull request from a forked repository.'
  },
  {
    name: 'NOW_GITHUB_COMMIT_REPO',
    description:
      'The GitHub repository of which the commit belongs. For example, when submitting a pull request from a forked repository.'
  },
  {
    name: 'NOW_GITHUB_COMMIT_REF',
    description: 'The GitHub branch that the deployment was made from.'
  },
  {
    name: 'NOW_GITHUB_COMMIT_SHA',
    description: (
      <>
        The GitHub{' '}
        <Link href="https://help.github.com/articles/github-glossary/#commit">
          SHA
        </Link>{' '}
        of the commit the deployment was triggered by.
      </>
    )
  },
  {
    name: 'NOW_GITHUB_COMMIT_AUTHOR_LOGIN',
    description:
      'The GitHub username belonging to the author of the commit that the project was deployed by.'
  },
  {
    name: 'NOW_GITHUB_COMMIT_AUTHOR_NAME',
    description:
      'The GitHub name belonging to the author of the commit that the project was deployed by.'
  }
]

export const GITLAB_SYSTEM_ENVS = [
  {
    name: 'NOW_GITLAB_DEPLOYMENT',
    description: (
      <>
        An indicator for whether the app was deployed by <ProductName /> for
        GitLab.
      </>
    )
  },
  {
    name: 'NOW_GITLAB_PROJECT_NAMESPACE',
    description:
      'The GitLab user, group, or sub-group that the project belongs to.'
  },
  {
    name: 'NOW_GITLAB_PROJECT_NAME',
    description: 'The GitLab name of the deployed project.'
  },
  {
    name: 'NOW_GITLAB_PROJECT_ID',
    description: 'The GitLab ID of the deployed project.'
  },
  {
    name: 'NOW_GITLAB_PROJECT_PATH',
    description: 'The GitLab project path.'
  },
  {
    name: 'NOW_GITLAB_COMMIT_REF',
    description: 'The GitLab branch that the deployment was triggered by.'
  },
  {
    name: 'NOW_GITLAB_COMMIT_SHA',
    description: 'The GitLab sha of the commit the deployment was triggered by.'
  },
  {
    name: 'NOW_GITLAB_COMMIT_MESSAGE',
    description:
      'The message accompanying the GitLab commit that the deployment was triggered by.'
  },
  {
    name: 'NOW_GITLAB_COMMIT_AUTHOR_LOGIN',
    description:
      'The username belonging to the author of the commit that was deployed on GitLab.'
  },
  {
    name: 'NOW_GITLAB_COMMIT_AUTHOR_NAME',
    description:
      'The name belonging to the author of the commit that was deployed on GitLab.'
  }
]

export const BITBUCKET_SYSTEM_ENVS = [
  {
    name: 'NOW_BITBUCKET_DEPLOYMENT',
    description: (
      <>
        An indicator for whether the app was deployed by <ProductName /> for
        Bitbucket.
      </>
    )
  },
  {
    name: 'NOW_BITBUCKET_REPO_OWNER',
    description: 'The Bitbucket user or team that the project belongs to.'
  },
  {
    name: 'NOW_BITBUCKET_REPO_SLUG',
    description: 'The slug of the Bitbucket repository that was deployed.'
  },
  {
    name: 'NOW_BITBUCKET_REPO_NAME',
    description: 'The name of the Bitbucket repository that was deployed.'
  },
  {
    name: 'NOW_BITBUCKET_COMMIT_REF',
    description: 'The Bitbucket branch that the deployment was triggered by.'
  },
  {
    name: 'NOW_BITBUCKET_COMMIT_SHA',
    description:
      'The Bitbucket sha of the commit the deployment was triggered by.'
  },
  {
    name: 'NOW_BITBUCKET_COMMIT_MESSAGE',
    description:
      'The message accompanying the Bitbucket commit that was deployed.'
  },
  {
    name: 'NOW_BITBUCKET_COMMIT_AUTHOR_NAME',
    description: 'The name of the commit author on Bitbucket.'
  },
  {
    name: 'NOW_BITBUCKET_COMMIT_AUTHOR_URL',
    description: 'Bitbucket profile URL of the commit author.'
  }
]

export const SYSTEM_ENVS = [
  ...BASE_SYSTEM_ENVS,
  ...GITHUB_SYSTEM_ENVS,
  ...GITLAB_SYSTEM_ENVS,
  ...BITBUCKET_SYSTEM_ENVS
]
