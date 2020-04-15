import GitDeploy from './git-deploy.mdx'
import CLIDeploy from './cli-deploy.mdx'
import Tabs from '~/components/tabs'
import Link from '~/components/text/link'
import { DeployButton } from '~/components/buttons'
import { PRODUCT_NAME, PRODUCT_SHORT_NAME } from '~/lib/constants'

export default function DeploySection({ meta }) {
  return (
    <>
      <p>
        There are two ways to deploy with {PRODUCT_NAME}. We recommend using a{' '}
        <Link href="/docs/v2/git-integrations">
          <a>{PRODUCT_NAME} for Git Integration</a>
        </Link>{' '}
        for ease-of-use. Alternatively,{' '}
        <Link href="/download">
          <a>{PRODUCT_SHORT_NAME} CLI</a>
        </Link>{' '}
        can be used to generate a manual{' '}
        <Link href="/docs/v2/platform/deployments#preview">
          <a>Preview Deployment</a>
        </Link>
        .
      </p>
      {meta.demo && (
        <p>
          Once deployed, you will get a URL to see your {meta.type} live, such
          as the following: <Link href={meta.demo}>{meta.demo}</Link>
        </p>
      )}
      <br />
      <Tabs tabs={['With Git', 'Manually']}>
        <GitDeploy name={meta.name} type={meta.type} />
        <CLIDeploy name={meta.name} type={meta.type} />
      </Tabs>
      {meta.demo && meta.example && (
        <>
          <p>
            Set up a {meta.name} {meta.type} with a few clicks using the Deploy
            button, and create a Git repository for it in the process for
            automatic deployments for your updates.
          </p>
          <DeployButton url={meta.example} />
        </>
      )}
      <style jsx>{`
        p {
          line-height: 1.6;
        }
      `}</style>
    </>
  )
}
