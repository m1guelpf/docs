import { CLI_V1_NAME, PRODUCT_SHORT_V1_NAME } from '~/lib/constants'

export default [
  {
    name: 'Getting Started',
    posts: [
      {
        name: `Introduction to ${PRODUCT_SHORT_V1_NAME}`,
        href: '/docs/v1/getting-started/introduction-to-now',
        aliases: ['/docs/v1']
      },
      {
        name: 'Deployment',
        href: '/docs/v1/getting-started/deployment'
      },
      {
        name: 'Assign a Domain Name',
        href: '/docs/v1/getting-started/assign-a-domain-name'
      },
      {
        name: 'Logs',
        href: '/docs/v1/getting-started/logs'
      },
      {
        name: 'Environment Variables',
        href: '/docs/v1/getting-started/environment-variables'
      },
      {
        name: 'Secrets',
        href: '/docs/v1/getting-started/secrets'
      },
      {
        name: 'Scaling',
        href: '/docs/v1/getting-started/scaling'
      },
      {
        name: "What's Next",
        href: '/docs/v1/getting-started/whats-next'
      }
    ]
  },

  {
    name: 'Clients',
    posts: [
      {
        name: CLI_V1_NAME,
        href: '/docs/v1/clients/now-cli'
      }
    ]
  },

  {
    name: 'Static Deployments',
    posts: [
      {
        name: 'Introduction & Deploying',
        href: '/docs/v1/static-deployments/introduction-and-deploying'
      },
      {
        name: 'Configuration',
        href: '/docs/v1/static-deployments/configuration'
      },
      {
        name: 'Builds',
        posts: [
          {
            name: `Building with ${PRODUCT_SHORT_V1_NAME}`,
            href: '/docs/v1/static-deployments/builds/building-with-now'
          }
        ]
      }
    ]
  },

  {
    name: 'Dynamic Deployments',
    posts: [
      {
        name: 'Docker',
        href: '/docs/v1/deployment-types/docker'
      },
      {
        name: 'Node.js',
        href: '/docs/v1/deployment-types/node'
      }
    ]
  },

  {
    name: 'Features',
    posts: [
      {
        name: 'Aliases and Domains',
        href: '/docs/v1/features/aliases'
      },
      {
        name: 'Global Scaling',
        href: '/docs/v1/features/scaling'
      },
      {
        name: 'DNS Management',
        href: '/docs/v1/features/dns'
      },
      {
        name: 'CDN',
        href: '/docs/v1/features/cdn'
      },
      {
        name: 'Build-Time Env and Secrets',
        href: '/docs/v1/features/build-env-and-secrets'
      },
      {
        name: 'Run-Time Env and Secrets',
        href: '/docs/v1/features/env-and-secrets'
      },
      {
        name: 'Configuration',
        href: '/docs/v1/features/configuration'
      },
      {
        name: 'SSL Certificates',
        href: '/docs/v1/features/certs'
      },
      {
        name: 'Private NPM',
        href: '/docs/v1/features/private-npm'
      },
      {
        name: 'Git Repositories',
        href: '/docs/v1/features/repositories'
      },
      {
        name: 'Path Aliases',
        href: '/docs/v1/features/path-aliases'
      }
    ]
  },

  {
    name: 'Integrations',
    posts: [
      {
        name: `${PRODUCT_SHORT_V1_NAME} for GitHub`,
        href: '/docs/v1/integrations/now-for-github'
      }
    ]
  },

  {
    name: 'Guides',
    posts: [
      {
        name: 'App Lifecycle & Scalability',
        href: '/docs/v1/guides/app-lifecycle-and-scalability'
      },
      {
        name: 'Migrate Your App',
        href: '/docs/v1/guides/migrate-your-app'
      },
      {
        name: `Updating ${CLI_V1_NAME}`,
        href: '/docs/v1/guides/updating-now-cli'
      },
      {
        name: 'Redirect',
        href: '/docs/v1/examples/redirect'
      },
      {
        name: 'Continuous Integration',
        posts: [
          {
            name: 'Travis CI',
            href: '/docs/v1/continuous-integration/travis'
          }
        ]
      }
    ]
  },
  {
    name: 'Other',
    posts: [
      {
        name: 'Support Channels',
        href: '/docs/v1/other/support-channels'
      },
      {
        name: 'FAQ',
        href: '/docs/v1/other/faq'
      },
      {
        name: 'Restrictions',
        href: '/docs/v1/other/restrictions'
      }
    ]
  }
]
