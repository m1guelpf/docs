import Link from '~/components/text/link'
import formatDate from 'date-fns/format'

const ContentFooter = ({ lastEdited, editUrl }) => (
  <footer>
    <span>Last Edited on {formatDate(lastEdited, 'MMMM Do YYYY')}</span>
    <Link href={`https://github.com/vercel/docs/edit/master/${editUrl}`}>
      Edit This Page on GitHub
    </Link>

    <style jsx>{`
      footer {
        border-top: 1px solid var(--accents-2);
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
        padding: 24px 0;
        font-size: var(--font-size-small);
        line-height: var(--line-height-small);
        color: var(--accents-5);
      }

      @media (max-width: 400px) {
        footer {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-bottom: 48px;
        }

        footer > span {
          margin-bottom: 16px;
        }
      }
    `}</style>
  </footer>
)

export default ContentFooter
