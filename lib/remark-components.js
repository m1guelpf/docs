import { Code, Pre } from '~/components/remark-code'
import Link from '~/components/text/link'
import { H1, H2, H3, H4, H5, H6, P } from '~/components/text'
import HR from '~/components/text/hr'
import { UL, LI } from '~/components/list'
import Quote from '~/components/text/quote'
import Strong from '~/components/text/strong'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableRowCell,
  TableHeadCell
} from '~/components/table'

const components = {
  a: props => <Link color {...props} />,
  blockquote: Quote,
  code: Code,
  pre: Pre,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  hr: HR,
  li: LI,
  p: P,
  strong: Strong,
  ul: UL,
  tr: TableRow,
  th: TableHeadCell,
  td: TableRowCell,
  thead: TableHead,
  tbody: TableBody,
  table: Table
}

export default components
