const isProd = process.env.NODE_ENV === 'production'

const rehypePrism = require('@mapbox/rehype-prism')
// Adds github.com/mdx-js/mdx to Next.js
const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    hastPlugins: [rehypePrism],
  },
})

const docsRedirects = [
  [
    'v2/git-integrations/zeit-now-for-bitbucket',
    'git-integrations/vercel-for-bitbucket',
  ],
  [
    'v2/git-integrations/zeit-now-for-github',
    'git-integrations/vercel-for-github',
  ],
  [
    'v2/git-integrations/zeit-now-for-gitlab',
    'git-integrations/vercel-for-gitlab',
  ],
  [
    'error/application/NO_STATUS_CODE_FROM_FUNCTION',
    'error/application/NO_RESPONSE_FROM_FUNCTION',
  ],
  ['what-is-directory-listing', 'directory-listing'],
  ['v2/edge-network/directory-listing', 'directory-listing'],
  ['v2/platform/regions', 'edge-network/regions'],
].map(([before, after]) => ({
  source: `/docs/${before}{/}?`,
  destination: `/docs/${after}`,
  permanent: true,
}))

const guidesRedirects = [
  [
    'client-side-error-reports-with-uriports-zeit-now',
    'client-side-error-reports-with-uriports-vercel',
  ],
  [
    'deploying-a-faunadb-powered-guestbook-with-zeit-now',
    'deploying-a-faunadb-powered-guestbook-with-vercel',
  ],
  [
    'deploying-a-mongodb-powered-api-with-node-and-now',
    'deploying-a-mongodb-powered-api-with-node-and-vercel',
  ],
  ['deploying-angular-with-now', 'deploying-angular-with-vercel'],
  ['deploying-aurelia-with-zeit-now', 'deploying-aurelia-with-vercel'],
  ['deploying-charge-with-now', 'deploying-charge-with-vercel'],
  ['deploying-crystallize-with-zeit-now', 'deploying-crystallize-with-vercel'],
  ['deploying-docusaurus-with-zeit-now', 'deploying-docusaurus-with-vercel'],
  ['deploying-dojo-with-zeit-now', 'deploying-dojo-with-vercel'],
  ['deploying-eleventy-with-zeit-now', 'deploying-eleventy-with-vercel'],
  ['deploying-ember-with-zeit-now', 'deploying-ember-with-vercel'],
  ['deploying-foundation-with-zeit-now', 'deploying-foundation-with-vercel'],
  ['deploying-gatsby-with-now', 'deploying-gatsby-with-vercel'],
  ['deploying-gridsome-with-zeit-now', 'deploying-gridsome-with-vercel'],
  ['deploying-hexo-with-zeit-now', 'deploying-hexo-with-vercel'],
  ['deploying-hugo-with-now', 'deploying-hugo-with-vercel'],
  [
    'deploying-ionic-angular-with-zeit-now',
    'deploying-ionic-angular-with-vercel',
  ],
  ['deploying-ionic-react-with-zeit-now', 'deploying-ionic-react-with-vercel'],
  ['deploying-mdx-deck-with-zeit-now', 'deploying-mdx-deck-with-vercel'],
  [
    'deploying-next-and-buttercms-with-now',
    'deploying-next-and-buttercms-with-vercel',
  ],
  [
    'deploying-next-and-contentful-with-now',
    'deploying-next-and-contentful-with-vercel',
  ],
  ['deploying-next-and-mysql-with-now', 'deploying-next-and-mysql-with-vercel'],
  [
    'deploying-next-and-prismic-with-now',
    'deploying-next-and-prismic-with-vercel',
  ],
  [
    'deploying-next-and-storyblok-with-now',
    'deploying-next-and-storyblok-with-vercel',
  ],
  [
    'deploying-nextjs-nodejs-and-faunadb-with-zeit-now',
    'deploying-nextjs-nodejs-and-faunadb-with-vercel',
  ],
  [
    'deploying-nextjs-nodejs-and-sendgrid-with-zeit-now',
    'deploying-nextjs-nodejs-and-sendgrid-with-vercel',
  ],
  ['deploying-nextjs-with-now', 'deploying-nextjs-with-vercel'],
  ['deploying-nuxtjs-with-zeit-now', 'deploying-nuxtjs-with-vercel'],
  ['deploying-polymer-with-zeit-now', 'deploying-polymer-with-vercel'],
  ['deploying-preact-with-zeit-now', 'deploying-preact-with-vercel'],
  [
    'deploying-pusher-channels-with-zeit-now',
    'deploying-pusher-channels-with-vercel',
  ],
  [
    'deploying-react-forms-using-formspree-with-zeit-now',
    'deploying-react-forms-using-formspree-with-vercel',
  ],
  ['deploying-react-with-now-cra', 'deploying-react-with-vercel-cra'],
  ['deploying-saber-with-zeit-now', 'deploying-saber-with-vercel'],
  ['deploying-sanity-studio-with-now', 'deploying-sanity-studio-with-vercel'],
  ['deploying-scully-with-zeit-now', 'deploying-scully-with-vercel'],
  ['deploying-statickit-with-zeit-now', 'deploying-statickit-with-vercel'],
  [
    'deploying-nextjs-nodejs-and-sendgrid-with-vercel',
    'deploying-statickit-with-vercel',
  ],
  ['deploying-stencil-with-zeit-now', 'deploying-stencil-with-vercel'],
  ['deploying-storybook-with-zeit-now', 'deploying-storybook-with-vercel'],
  ['deploying-svelte-with-zeit-now', 'deploying-svelte-with-vercel'],
  ['deploying-takeshape-with-zeit-now', 'deploying-takeshape-with-vercel'],
  ['deploying-umijs-with-zeit-now', 'deploying-umijs-with-vercel'],
  ['deploying-vuejs-to-now', 'deploying-vuejs-to-vercel'],
  ['deploying-vuepress-to-now', 'deploying-vuepress-to-vercel'],
  [
    'getting-started-with-now-for-gitlab',
    'getting-started-with-vercel-for-gitlab',
  ],
  ['migrate-to-zeit-now', 'migrate-to-vercel'],
  [
    'monitor-frontend-performance-with-debugbear-and-zeit-now',
    'monitor-frontend-performance-with-debugbear-and-vercel',
  ],
  [
    'debugging-and-troubleshooting-zeit-now-logs-with-sematext',
    'debugging-and-troubleshooting-vercel-logs-with-sematext',
  ],
  [
    'monitoring-performance-with-calibre-and-zeit-now',
    'monitoring-performance-with-calibre-and-vercel',
  ],
  ['setup-godaddy-domain-now', 'setup-godaddy-domain-vercel'],
  ['setup-namecheap-domain-now', 'setup-namecheap-domain-vercel'],
  ['transferring-domains-to-zeit-now', 'transferring-domains-to-vercel'],
  ['updating-now-cli', 'updating-vercel-cli'],
  [
    'vue-js-html-forms-with-formcarry-zeit-now',
    'vue-js-html-forms-with-formcarry-vercel',
  ],
  [
    'prevent-uploading-sourcepaths-with-nowignore',
    'prevent-uploading-sourcepaths-with-vercelignore',
  ],
  ['handling-node-request-body-with-micro', 'handling-node-request-body'],
].map(([before, after]) => ({
  source: `/guides/${before}{/}?`,
  destination: `/guides/${after}`,
  permanent: true,
}))

module.exports = withMDX({
  target: 'serverless',

  rewrites() {
    return [
      // TODO: test out basePath to replace below rewrites
      {
        source: '/docs/sitemap.xml',
        destination: '/sitemap.xml',
      },
      {
        source: '/docs/_next/:path*',
        destination: '/_next/:path*',
      },
      {
        source: '/docs/static/:path*',
        destination: '/static/:path*',
      },
    ]
  },

  redirects() {
    return [
      ...guidesRedirects,
      ...docsRedirects,
      {
        source: '/:path+/',
        permanent: true,
        destination: '/:path+',
      },
      {
        source: '/api(|/?)',
        permanent: true,
        destination: '/docs/api',
      },
      {
        source: '/docs/builders',
        permanent: true,
        destination: '/docs/runtimes',
      },
      {
        source: '/docs/github',
        permanent: true,
        destination: '/docs/git-integrations/vercel-for-github',
      },
      {
        source: '/docs/gitlab',
        permanent: true,
        destination: '/docs/git-integrations/vercel-for-gitlab',
      },
      {
        source: '/docs/bitbucket',
        permanent: true,
        destination: '/docs/git-integrations/vercel-for-bitbucket',
      },
      {
        source: '/docs/v2/git-integration',
        permanent: true,
        destination: '/docs/git-integrations',
      },
      {
        source: '/docs/v2/more/now-for-github',
        permanent: true,
        destination: '/docs/git-integrations/vercel-for-github',
      },
      {
        source: '/docs/v2/more/now-for-gitlab',
        permanent: true,
        destination: '/docs/git-integrations/vercel-for-gitlab',
      },
      {
        source: '/docs/v2/more/now-for-bitbucket',
        permanent: true,
        destination: '/docs/git-integrations/vercel-for-bitbucket',
      },
      {
        source: '/docs/:name(integrations|now-cli)/v2/:path*',
        permanent: true,
        destination: '/docs/:name/:path*',
      },
      {
        source: '/docs/v2/deployments/ignoring-source-paths',
        permanent: true,
        destination: '/guides/prevent-uploading-sourcepaths-with-nowignore',
      },
      {
        source: '/docs/v2/:name(deployments|advanced)/configuration/:path*',
        permanent: true,
        destination: '/docs/configuration/:path*',
      },

      {
        source: '/docs/v2/integrations/now-for-github',
        permanent: true,
        destination: '/docs/git-integrations/vercel-for-github',
      },
      {
        source: '/docs/v2/integrations/now-for-gitlab',
        permanent: true,
        destination: '/docs/git-integrations/vercel-for-gitlab',
      },
      {
        source: '/docs/v2/integrations/now-for-bitbucket',
        permanent: true,
        destination: '/docs/git-integrations/vercel-for-bitbucket',
      },
      {
        source: '/docs/aliasing',
        permanent: true,
        destination: '/docs/aliasing-a-deployment',
      },
      {
        source: '/docs/v2/routing/:path*',
        permanent: true,
        destination: '/docs/edge-network/:path*',
      },
      {
        source: '/docs/v2/network/:path*',
        permanent: true,
        destination: '/docs/edge-network/:path*',
      },
      {
        source: '/docs/v2/edge-network/regions-and-providers/:path*',
        permanent: true,
        destination: '/docs/edge-network/regions/:path*',
      },
      {
        source: '/docs/(|v1/)guides/updating-now-cli',
        permanent: true,
        destination: '/guides/updating-now-cli',
      },
      {
        source: '/docs/guides/(.*)',
        permanent: true,
        destination: '/guides',
      },
      {
        source: '/docs/getting-started/(.*)',
        permanent: true,
        destination: '/docs/introduction',
      },
      {
        source:
          '/docs/v2/((?:deployments|advanced))/builders/developer-guide(.*)',
        permanent: true,
        destination:
          'https://github.com/vercel/vercel/blob/master/DEVELOPING_A_RUNTIME.md',
      },
      {
        source: '/docs/v2/deployments/((?:builders|official-builders))/(.*)',
        permanent: true,
        destination: '/docs/runtimes',
      },
      {
        source: '/docs/v2/advanced/builders(.*)',
        permanent: true,
        destination: '/docs/runtimes',
      },
      {
        source: '/docs/v2/deployments/environment-variables-and-secrets',
        permanent: true,
        destination: '/docs/build-step#environment-variables',
      },
      {
        source: '/docs/v2/advanced/concepts(.*)',
        permanent: true,
        destination: '/docs/platform/deployments',
      },
      {
        source: '/docs/v2/deployments/routes(.*)',
        permanent: true,
        destination: '/docs/configuration#routes',
      },
      {
        source: '/docs/v2/deployments/builds',
        permanent: true,
        destination: '/docs/runtimes',
      },
      {
        source: '/docs/v2/deployments/(.*)',
        permanent: true,
        destination: '/docs/introduction',
      },
      {
        source: '/docs/v2/domains-and-aliases/transferring-a-domain(.*)',
        permanent: true,
        destination: '/guides/transferring-domains-to-vercel',
      },
      {
        source: '/docs/v2/domains-and-aliases/zero-downtime-domain-migration',
        permanent: true,
        destination: '/guides/zero-downtime-domain-migration',
      },
      {
        source: '/docs/v2/domains-and-aliases/aliasing-a-deployment',
        permanent: true,
        destination: '/docs/custom-domains#deploying-with-your-domain',
      },
      {
        source: '/docs/v2/domains-and-aliases/aliasing-a-deployment',
        permanent: true,
        destination: '/docs/custom-domains#deploying-with-your-domain',
      },
      {
        source: '/docs/v2/domains-and-aliases/cdn',
        permanent: true,
        destination: '/docs/serverless-functions/edge-caching',
      },
      {
        source: '/examples/nodejs-express',
        permanent: true,
        destination: '/examples/express',
      },
      {
        source: '/examples(.*)',
        permanent: true,
        destination: 'https://github.com/vercel/vercel/tree/master/examples',
      },
      {
        source: '/docs/v1/examples/(.*)',
        permanent: true,
        destination: 'https://github.com/vercel/vercel/tree/master/examples',
      },
      {
        source: '/docs/v2/platform/global-configuration(.*)',
        permanent: true,
        destination: '/docs/configuration#global',
      },
      {
        source: '/docs/v2/advanced/platform/:path*',
        permanent: true,
        destination: '/docs/platform/:path*',
      },
      {
        source: '/docs/v2/development/basic/(.*)',
        permanent: true,
        destination: '/docs/deployment/serverless-functions#local-development',
      },
      {
        source: '/docs/v2/development/environment-variables(.*)',
        permanent: true,
        destination: '/docs/build-step#environment-variables',
      },
      {
        source: '/docs/v2/development/(.*)',
        permanent: true,
        destination: '/docs/serverless-functions/introduction',
      },
      {
        source: '/docs/v2/domains-and-aliases/(.*)',
        permanent: true,
        destination: '/docs/custom-domains',
      },
      {
        source: '/docs/domains-and-aliases/(.*)',
        permanent: true,
        destination: '/docs/custom-domains',
      },
      {
        source: '/docs/v2/advanced/:path*',
        permanent: true,
        destination: '/docs/more/:path*',
      },
      {
        source: '/docs/advanced/:path*',
        permanent: true,
        destination: '/docs/more/:path*',
      },
      {
        source: '/docs/version-detection',
        permanent: true,
        destination:
          '/docs/platform/frequently-asked-questions#platform-version-detection',
      },
      {
        source: '/docs/v2/version-config',
        permanent: true,
        destination: '/docs/configuration#project/version',
      },
      {
        source: '/docs/v1/guides/how-to-use-cloudflare',
        permanent: true,
        destination: '/docs/custom-domains#cloudflare',
      },
      {
        source: '/docs/v2/serverless-functions/env-and-secrets',
        permanent: true,
        destination: '/docs/build-step#environment-variables',
      },
      {
        source: '/docs/now-cli/:path*',
        permanent: true,
        destination: '/docs/cli/:path*',
      },
      {
        source: '/guides/setup-godaddy-domain-vercel',
        permanent: true,
        destination: '/docs/custom-domains',
      },
      {
        source: '/guides/setup-namecheap-domain-vercel',
        permanent: true,
        destination: '/docs/custom-domains',
      },
      {
        source: '/guides/redirect-from-www',
        permanent: true,
        destination: '/docs/custom-domains/#redirecting-domains',
      },
      {
        source: '/docs/v2/upgrade-to-2-0',
        permanent: true,
        destination: '/guides/migrate-to-vercel',
      },
      {
        source: '/docs/v2/v1-upgrade',
        permanent: true,
        destination: '/guides/migrate-to-vercel',
      },
      {
        source: '/docs/v1-upgrade',
        permanent: true,
        destination: '/guides/migrate-to-vercel',
      },
      {
        source: '/',
        permanent: true,
        destination: '/docs',
      },
      {
        source: '/docs/v2/:path*',
        permanent: true,
        destination: '/docs/:path*',
      },
    ]
  },

  // Allow mdx and md files to be pages
  pageExtensions: ['jsx', 'js', 'mdx', 'md'],

  assetPrefix: isProd ? '/docs' : '',

  env: {
    NOW_GITHUB_COMMIT_SHA: process.env.NOW_GITHUB_COMMIT_SHA,
    IMAGE_ASSETS_URL: 'https://assets.vercel.com/image/upload/front',
    VIDEO_ASSETS_URL: 'https://assets.vercel.com/video/upload/front',
    RAW_ASSETS_URL: 'https://assets.vercel.com/raw/upload/front',
    ASSETS: isProd ? '/docs/static' : '/static',
    DATOCMS_API_ENDPOINT: 'https://graphql.datocms.com/',
    DATOCMS_PREVIEW_API_ENDPOINT: 'https://graphql.datocms.com/preview',
  },

  webpack(config, { isServer }) {
    if (isServer) {
      require('./scripts/generate-site-map')
    }
    return config
  },
})
