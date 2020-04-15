import BuildStep from '~/components/build-step-mdx/build-step.mdx'
import Doc from '~/components/layout/docs'
import fetchAPI from '~/lib/fetch-api'
import components from '~/lib/mdx-components'
import { PRODUCT_NAME, API_FRAMEWORKS } from '~/lib/constants'

export const meta = {
  title: 'Build Step',
  description: `Providing ${PRODUCT_NAME} with a build step.`,
  editUrl: 'components/build-step-mdx/build-step.mdx',
  lastEdited: '2020-03-17T21:39:09.000Z'
}

export default ({ frameworks }) => (
  <Doc meta={meta}>
    <BuildStep
      frameworks={
        frameworks?.length ? (
          <components.ul>
            {frameworks.map(framework => (
              <components.li key={framework.name}>
                {framework.website ? (
                  <components.a href={framework.website}>
                    {framework.name}
                  </components.a>
                ) : (
                  framework.name
                )}
              </components.li>
            ))}
          </components.ul>
        ) : null
      }
    />
  </Doc>
)

export async function getStaticProps() {
  const frameworks = (await fetchAPI(API_FRAMEWORKS)) || []
  return { props: { frameworks } }
}
