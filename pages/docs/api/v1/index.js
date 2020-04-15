import ApiDocs from '~/components/references-mdx/api/v1/index.mdx'
import ReferenceLayout from '~/components/layout/reference'
import { PRODUCT_V1_NAME } from '~/lib/constants'

export default () => (
  <ReferenceLayout
    Data={<ApiDocs />}
    versioned
    description={`A guide to the legacy ${PRODUCT_V1_NAME} API.`}
    title={`${PRODUCT_V1_NAME} API Documentation`}
  />
)
