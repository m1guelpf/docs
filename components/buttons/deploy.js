import Logo from '~/components/icons/logo-light'
import Button from './button'

export default function DeployButton({ url }) {
  const deployUrl = url.includes('github.com/zeit/now/tree/master/examples')
    ? `https://zeit.co/import/project?template=${url}`
    : `https://zeit.co/import/${url}`

  return (
    <div className="deploy-button">
      <a href={deployUrl} target="_blank" rel="noopener">
        <Button type="success" icon={<Logo height={16} width={16} />}>
          Deploy
        </Button>
      </a>
      <style jsx>{`
        .deploy-button a {
          text-decoration: none;
        }

        .deploy-button :global(.button) {
          padding: 0;
          min-width: 124px;
        }

        .deploy-button :global(.button:hover) {
          background: var(--geist-success-dark);
          color: #fff;
        }

        .deploy-button :global(.button .text) {
          flex: 1 0 auto;
        }

        .deploy-button :global(.button .icon) {
          position: relative;
          left: auto;
          top: 0;
          bottom: 0;
          border-right: 1px solid var(--geist-success-dark);
          padding: 0 10px;
          height: 100%;
          display: flex;
          align-item: center;
          height: 38px;
          background: var(--geist-success);
        }

        .deploy-button :global(.button.icon-color:hover .icon svg path) {
          fill: #fff;
        }
      `}</style>
    </div>
  )
}
