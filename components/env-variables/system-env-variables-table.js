import { InlineCode } from '~/components/text/code'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableRowCell,
  TableHeadCell
} from '~/components/table'

export default function SystemEnvVariablesTable({ envs }) {
  return (
    <Table>
      <TableHead>
        <TableRow noTagName>
          <TableHeadCell className="head-cell">Name</TableHeadCell>
          <TableHeadCell className="head-cell">Description</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {envs.map(systemEnv => (
          <TableRow key={systemEnv.name} noTagName>
            <TableRowCell>
              <InlineCode>{systemEnv.name}</InlineCode>
            </TableRowCell>
            <TableRowCell>
              {systemEnv.description}
              {systemEnv.example ? (
                <>
                  {' '}
                  Example: <InlineCode>{systemEnv.example}</InlineCode>.
                </>
              ) : null}
            </TableRowCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
