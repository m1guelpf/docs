import productNames from './name-constants.json'

// UI Constants
export const HEADER_HEIGHT = 64

// API Endpoints
export const API_USER = '/api/www/user'
export const API_USER_TOKENS = '/v3/user/tokens'
export const API_USER_TOKEN_TESTING = '/api/user/tokens/testing'
export const API_TEAMS = '/api/teams'
export const API_DOCS_FEEDBACK = 'https://zeit.co/feedback-api'
export const API_LIMITS = 'https://api.zeit.co/v1/ratelimits'
export const API_FRAMEWORKS = '/api/v1/frameworks'

// Product names: Use JSON so it can be imported in scripts
export const PRODUCT_NAME = productNames.productName
export const CDN_NAME = productNames.cdnName
export const ORG_NAME = productNames.orgName
export const PRODUCT_SHORT_NAME = productNames.productShortName
export const GITHUB_APP_NAME = productNames.githubAppName
export const GITLAB_APP_NAME = productNames.gitlabAppName
export const BITBUCKET_APP_NAME = productNames.bitbucketAppName
// For v1 docs, use separate variable names just in case
export const PRODUCT_V1_NAME = productNames.productV1Name
export const ORG_V1_NAME = productNames.orgV1Name
export const PRODUCT_SHORT_V1_NAME = productNames.productShortV1Name
export const CLI_V1_NAME = productNames.cliV1Name
