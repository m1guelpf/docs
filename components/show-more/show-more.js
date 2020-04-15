import cn from 'classnames'
import Arrow from '../icons/chevron-down'

const ShowMore = ({ expanded, onClick }) => {
  return (
    <div className={`expand-toggle ${expanded ? 'expanded' : ''}`}>
      <div className="line" />
      <button onClick={onClick} className="geist-inline-center">
        Show {expanded ? 'Less' : 'More'}
        <span className={cn({ expanded })}>
          <Arrow size={16} />
        </span>
      </button>
      <div className="line" />

      <style jsx>
        {`
          .expand-toggle {
            width: calc(100% - 40px);
            margin-top: 20px;
            margin-left: 20px;
            display: flex;
            align-items: center;
            min-height: 30px;
          }
          .line {
            flex-grow: 1;
            height: 1px;
            background-color: var(--accents-2);
          }
          span {
            display: inline-flex;
            margin-left: var(--geist-gap-quarter);
            transition: transform 0.2s ease-in-out;
          }
          span.expanded {
            transform: rotate(180deg);
          }
          button {
            border: 0;
            padding: 5px 15px;
            border-radius: 100px;
            box-shadow: var(--shadow-small);
            outline: 0;
            cursor: pointer;
            font-size: 12px;
            text-transform: uppercase;
            color: var(--accents-5);
            height: 28px;
            background-color: var(--geist-background);
            transition: all 0.2s ease;
          }
          button:hover {
            color: var(--geist-foreground);
            box-shadow: var(--shadow-medium);
          }
        `}
      </style>
    </div>
  )
}
export default ShowMore
