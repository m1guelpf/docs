import ApiDocs from '~/components/references-mdx/api/v2/index.mdx'
import ReferenceLayout from '~/components/layout/reference'
import { PRODUCT_NAME } from '~/lib/constants'

export default () => (
  <ReferenceLayout
    Data={<ApiDocs />}
    versioned
    description={`A comprehensive guide to using the ${PRODUCT_NAME} API and gaining control over the ${PRODUCT_NAME} platform.`}
    title={`${PRODUCT_NAME} API Documentation`}
  />
)
