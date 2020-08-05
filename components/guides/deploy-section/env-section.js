import { InlineCode } from '~/components/text/code'
import { UL, LI } from '~/components/list'

const EnvSection = ({ env }) => {
  if (!env) return null
  return (
    <>
      <p>
        During the import process, you will need to add the following
        environment variable{env.length > 1 ? 's' : ''}:
      </p>
      <UL>
        {env.map(e => (
          <LI key={e}>
            <InlineCode>{e}</InlineCode>
          </LI>
        ))}
      </UL>
    </>
  )
}

export default EnvSection
