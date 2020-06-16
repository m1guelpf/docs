import { PRODUCT_NAME } from '~/lib/constants'

export default [
  {
    name: 'Introduction',
    href: '/docs/v2/introduction',
    aliases: ['/docs', '/docs/v2']
  },
  {
    name: 'Git Integrations',
    href: '/docs/v2/git-integrations',
    posts: [
      {
        name: `${PRODUCT_NAME} for GitHub`,
        href: '/docs/v2/git-integrations/vercel-for-github'
      },
      {
        name: `${PRODUCT_NAME} for GitLab`,
        href: '/docs/v2/git-integrations/vercel-for-gitlab'
      },
      {
        name: `${PRODUCT_NAME} for Bitbucket`,
        href: '/docs/v2/git-integrations/vercel-for-bitbucket'
      }
    ]
  },
  {
    name: 'Build Step',
    href: '/docs/v2/build-step'
  },
  {
    name: 'Custom Domains',
    href: '/docs/v2/custom-domains'
  },
  {
    name: 'Serverless Functions',
    href: '/docs/v2/serverless-functions/introduction',
    posts: [
      {
        name: 'Supported Languages',
        href: '/docs/v2/serverless-functions/supported-languages'
      },
      {
        name: 'Edge Caching',
        href: '/docs/v2/serverless-functions/edge-caching'
      }
    ]
  },
  {
    name: 'Platform',
    href: '/docs/v2/platform/overview',
    posts: [
      {
        name: 'Deployments',
        href: '/docs/v2/platform/deployments'
      },
      {
        name: 'Projects',
        href: '/docs/v2/platform/projects'
      },
      {
        name: 'Users and Teams',
        href: '/docs/v2/platform/users-and-teams'
      },
      {
        name: 'Limits',
        href: '/docs/v2/platform/limits'
      },
      {
        name: 'Fair Use Policy',
        href: '/docs/v2/platform/fair-use-policy'
      },
      {
        name: 'Glossary',
        href: '/docs/v2/platform/glossary'
      },
      {
        name: 'Frequently Asked Questions',
        href: '/docs/v2/platform/frequently-asked-questions'
      }
    ]
  },
  {
    name: 'Edge Network',
    href: '/docs/v2/edge-network/overview',
    posts: [
      {
        name: 'Caching',
        href: '/docs/v2/edge-network/caching'
      },
      {
        name: 'Headers',
        href: '/docs/v2/edge-network/headers'
      },
      {
        name: 'Encryption',
        href: '/docs/v2/edge-network/encryption'
      },
      {
        name: 'Compression',
        href: '/docs/v2/edge-network/compression'
      },
      {
        name: 'Regions',
        href: '/docs/v2/edge-network/regions'
      },
      {
        name: 'Frequently Asked Questions',
        href: '/docs/v2/edge-network/frequently-asked-questions'
      }
    ]
  },
  {
    name: 'More',
    href: '/docs/v2/more/introduction',
    posts: [
      {
        name: 'Deploy Button',
        href: '/docs/v2/more/deploy-button'
      },
      {
        name: 'Deploy Hooks',
        href: '/docs/v2/more/deploy-hooks'
      }
    ]
  }
]
