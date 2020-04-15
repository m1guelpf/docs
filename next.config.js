const isProd = process.env.NODE_ENV === 'production'

const rehypePrism = require('@mapbox/rehype-prism')
// Adds github.com/mdx-js/mdx to Next.js
const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    hastPlugins: [rehypePrism]
  }
})

module.exports = withMDX({
  target: 'serverless',

  experimental: {
    pages404: true,
    polyfillsOptimization: true,

    rewrites() {
      return [
        // TODO: test out basePath to replace below rewrites
        {
          source: '/docs/sitemap.xml',
          destination: '/sitemap.xml'
        },
        {
          source: '/docs/_next/:path*',
          destination: '/_next/:path*'
        },
        {
          source: '/docs/static/:path*',
          destination: '/static/:path*'
        }
      ]
    },

    redirects() {
      return [
        {
          source: '/:path+/',
          permanent: true,
          destination: '/:path+'
        },
        {
          source: '/api(|/.*)',
          permanent: true,
          destination: '/docs/api'
        },

        {
          source: '/docs/builders',
          permanent: true,
          destination: '/docs/runtimes'
        },
        {
          source: '/docs/github',
          permanent: true,
          destination: '/docs/v2/git-integrations/zeit-now-for-github'
        },
        {
          source: '/docs/gitlab',
          permanent: true,
          destination: '/docs/v2/git-integrations/zeit-now-for-gitlab'
        },
        {
          source: '/docs/bitbucket',
          permanent: true,
          destination: '/docs/v2/git-integrations/zeit-now-for-bitbucket'
        },
        {
          source: '/docs/v2/git-integration',
          permanent: true,
          destination: '/docs/v2/git-integrations'
        },
        {
          source: '/docs/v2/more/now-for-github',
          permanent: true,
          destination: '/docs/v2/git-integrations/zeit-now-for-github'
        },
        {
          source: '/docs/v2/more/now-for-gitlab',
          permanent: true,
          destination: '/docs/v2/git-integrations/zeit-now-for-gitlab'
        },
        {
          source: '/docs/v2/more/now-for-bitbucket',
          permanent: true,
          destination: '/docs/v2/git-integrations/zeit-now-for-bitbucket'
        },
        {
          source: '/docs/:name(integrations|now-cli)/v2/:path*',
          permanent: true,
          destination: '/docs/:name/:path*'
        },
        {
          source: '/docs/v2/deployments/ignoring-source-paths',
          permanent: true,
          destination: '/guides/prevent-uploading-sourcepaths-with-nowignore'
        },
        {
          source: '/docs/v2/:name(deployments|advanced)/configuration/:path*',
          permanent: true,
          destination: '/docs/configuration/:path*'
        },

        {
          source: '/docs/v2/integrations/now-for-github',
          permanent: true,
          destination: '/docs/v2/git-integrations/zeit-now-for-github'
        },
        {
          source: '/docs/v2/integrations/now-for-gitlab',
          permanent: true,
          destination: '/docs/v2/git-integrations/zeit-now-for-gitlab'
        },
        {
          source: '/docs/v2/integrations/now-for-bitbucket',
          permanent: true,
          destination: '/docs/v2/git-integrations/zeit-now-for-bitbucket'
        },
        {
          source: '/docs/aliasing',
          permanent: true,
          destination: '/docs/v2/aliasing-a-deployment'
        },
        {
          source: '/docs/v2/routing/:path*',
          permanent: true,
          destination: '/docs/v2/network/:path*'
        },
        {
          source: '/docs/features/:path*',
          permanent: true,
          destination: '/docs/v1/features/:path*'
        },
        {
          source: '/docs/static-deployments/:path*',
          permanent: true,
          destination: '/docs/v1/static-deployments/:path*'
        },
        {
          source: '/docs/deployment-types/:path*',
          permanent: true,
          destination: '/docs/v1/deployment-types/:path*'
        },
        {
          source: '/docs/(|v1/)guides/updating-now-cli',
          permanent: true,
          destination: '/guides/updating-now-cli'
        },
        {
          source: '/docs/guides/(.*)',
          permanent: true,
          destination: '/guides'
        },
        {
          source: '/docs/getting-started/:path*',
          permanent: true,
          destination: '/docs/v1/getting-started/:path*'
        },
        {
          source: '/docs/v2/getting-started/(.*)',
          permanent: true,
          destination: '/docs/v2/introduction'
        },
        {
          source:
            '/docs/v2/((?:deployments|advanced))/builders/developer-guide(.*)',
          permanent: true,
          destination:
            'https://github.com/zeit/now/blob/master/DEVELOPING_A_RUNTIME.md'
        },
        {
          source: '/docs/v2/deployments/((?:builders|official-builders))/(.*)',
          permanent: true,
          destination: '/docs/runtimes'
        },
        {
          source: '/docs/v2/advanced/builders(.*)',
          permanent: true,
          destination: '/docs/runtimes'
        },
        {
          source: '/docs/v2/deployments/environment-variables-and-secrets',
          permanent: true,
          destination: '/docs/v2/build-step#environment-variables'
        },
        {
          source: '/docs/v2/advanced/concepts(.*)',
          permanent: true,
          destination: '/docs/v2/platform/deployments'
        },
        {
          source: '/docs/v2/deployments/routes(.*)',
          permanent: true,
          destination: '/docs/configuration#routes'
        },
        {
          source: '/docs/v2/deployments/builds',
          permanent: true,
          destination: '/docs/runtimes'
        },
        {
          source: '/docs/v2/deployments/(.*)',
          permanent: true,
          destination: '/docs/v2/introduction'
        },
        {
          source: '/docs/v2/domains-and-aliases/aliasing-a-deployment',
          permanent: true,
          destination: '/docs/v2/custom-domains#deploying-with-your-domain'
        },
        {
          source: '/docs/v2/domains-and-aliases/aliasing-a-deployment',
          permanent: true,
          destination: '/docs/v2/custom-domains#deploying-with-your-domain'
        },
        {
          source: '/docs/v2/domains-and-aliases/cdn',
          permanent: true,
          destination: '/docs/v2/serverless-functions/edge-caching'
        },
        {
          source: '/docs/other/:path*',
          permanent: true,
          destination: '/docs/v1/other/:path*'
        },
        {
          source: '/docs/clients/:path*',
          permanent: true,
          destination: '/docs/v1/clients/:path*'
        },
        {
          source: '/examples/nodejs-express',
          permanent: true,
          destination: '/examples/express'
        },
        {
          source: '/examples(.*)',
          permanent: true,
          destination: 'https://github.com/zeit/now/tree/master/examples'
        },
        {
          source: '/docs/v1/examples/(.*)',
          permanent: true,
          destination: 'https://github.com/zeit/now/tree/master/examples'
        },
        {
          source: '/docs/v2/platform/global-configuration(.*)',
          permanent: true,
          destination: '/docs/configuration#global'
        },
        {
          source: '/docs/v2/advanced/platform/:path*',
          permanent: true,
          destination: '/docs/v2/platform/:path*'
        },
        {
          source: '/docs/v2/development/basic/(.*)',
          permanent: true,
          destination:
            '/docs/v2/deployment/serverless-functions#local-development'
        },
        {
          source: '/docs/v2/development/environment-variables(.*)',
          permanent: true,
          destination: '/docs/v2/build-step#environment-variables'
        },
        {
          source: '/docs/v2/development/(.*)',
          permanent: true,
          destination: '/docs/v2/serverless-functions/introduction'
        },
        {
          source: '/docs/v2/domains-and-aliases/(.*)',
          permanent: true,
          destination: '/docs/v2/custom-domains'
        },
        {
          source: '/docs/v2/advanced/:path*',
          permanent: true,
          destination: '/docs/v2/more/:path*'
        },
        {
          source: '/docs/version-detection',
          permanent: true,
          destination:
            '/docs/v2/platform/frequently-asked-questions#platform-version-detection'
        },
        {
          source: '/docs/v1/guides/how-to-use-cloudflare',
          permanent: true,
          destination: '/docs/v2/custom-domains#cloudflare'
        },
        {
          source: '/docs/v2/serverless-functions/env-and-secrets',
          permanent: true,
          destination: '/docs/v2/build-step#environment-variables'
        }
      ]
    }
  },

  // Allow mdx and md files to be pages
  pageExtensions: ['jsx', 'js', 'mdx', 'md'],

  assetPrefix: isProd ? '/docs' : '',

  env: {
    NOW_GITHUB_COMMIT_SHA: process.env.NOW_GITHUB_COMMIT_SHA,
    API_URL: process.env.API_URL,
    IMAGE_ASSETS_URL: 'https://assets.zeit.co/image/upload/front',
    VIDEO_ASSETS_URL: 'https://assets.zeit.co/video/upload/front',
    RAW_ASSETS_URL: 'https://assets.zeit.co/raw/upload/front',
    ASSETS: isProd ? '/docs/static' : '/static'
  },

  webpack(config, { isServer }) {
    if (isServer) {
      require('./scripts/generate-site-map')
    }
    return config
  }
})
