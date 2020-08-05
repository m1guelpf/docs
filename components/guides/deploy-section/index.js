import GitDeploy from './git-deploy.mdx'
import Link from '~/components/text/link'
import { DeployButton } from '~/components/buttons'

export default function DeploySection({ meta }) {
  return (
    <>
      <GitDeploy env={meta.env} name={meta.name} type={meta.type} />
      {meta.demo && (
        <p>
          Once deployed, you will get a URL to see your {meta.type} live, such
          as the following: <Link href={meta.demo}>{meta.demo}</Link>
        </p>
      )}
      {meta.demo && meta.example && (
        <>
          <p>
            Set up a {meta.name} {meta.type} with a few clicks using the Deploy
            button, and create a Git repository for it in the process for
            automatic deployments for your updates.
          </p>
          <DeployButton
            env={meta.env}
            envDescription={meta.envDescription}
            envLink={meta.envLink}
            url={meta.example}
          />
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
