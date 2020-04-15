import ConfigurationRef from '~/components/references-mdx/configuration/index.mdx'
import ReferenceLayout from '~/components/layout/reference'
import { PRODUCT_NAME } from '~/lib/constants'

export default () => (
  <ReferenceLayout
    Data={<ConfigurationRef />}
    title="Configuration"
    description={`A complete reference of configuration for ${PRODUCT_NAME} deployments; listing configuration options and their usage.`}
    defaultActiveCategory="introduction"
    defaultActiveSection="configuration-reference"
  />
)
