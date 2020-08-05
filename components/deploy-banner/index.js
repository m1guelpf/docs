import Note from '~/components/text/note'
import { DeployButton } from '~/components/buttons'
import Link from '~/components/text/link'

export default function DeployBanner({
  env,
  envDescription,
  envLink,
  example,
  demo
}) {
  return (
    <div className="deploy-banner">
      <Note label={false}>
        <span>
          Live demo:{' '}
          <Link color href={demo}>
            {demo}
          </Link>
        </span>
        <DeployButton
          env={env}
          envDescription={envDescription}
          envLink={envLink}
          url={example}
        />
      </Note>
      <style jsx>{`
        .deploy-banner {
          margin-bottom: 32px;
        }

        .deploy-banner :global(> div) {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          padding-top: 8px;
          padding-bottom: 8px;
        }

        @media screen and (max-width: 600px) {
          .deploy-banner :global(.note) {
            flex-direction: column;
            align-items: flex-start;
            padding-top: 16px;
            padding-bottom: 20px;
          }

          .deploy-banner span {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </div>
  )
}
