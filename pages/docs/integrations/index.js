import IntegrationsDocs from '~/components/references-mdx/integrations/index.mdx'
import ReferenceLayout from '~/components/layout/reference'
import { PRODUCT_NAME } from '~/lib/constants'

export default () => (
  <ReferenceLayout
    Data={<IntegrationsDocs />}
    title={`${PRODUCT_NAME} Integrations Documentation`}
    description={`A comprehensive guide to creating and using the ${PRODUCT_NAME} Integrations API and gaining control over the ${PRODUCT_NAME} platform.`}
    defaultActiveCategory="introduction"
    defaultActiveSection="zeit-integrations"
  />
)
