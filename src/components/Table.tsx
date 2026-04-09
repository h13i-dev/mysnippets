import type { BaseProps } from '@src/types/base.ts';
import { clsx } from 'clsx';

interface TableRootProps extends BaseProps {
  config?: string;
  cols?: string;
  children:
    | React.ReactElement<
        typeof TableHead | typeof TableBody | typeof TableFooter | typeof TableCaption
      >
    | React.ReactElement<
        typeof TableHead | typeof TableBody | typeof TableFooter | typeof TableCaption
      >[];
}
const TableRoot = ({ config, cols, className, children, ...rest }: TableRootProps) => {
  const parseColClasses = (cols?: string) =>
    cols?.match(/\[([^\[\]]*(?:\[[^\]]*\][^\[\]]*)*)\]/g)?.map((m) => m.slice(1, -1)) || [];

  const colClasses = parseColClasses(cols);
  const isScrollable = config?.includes('[scrollable]');

  const tableElement = (
    <table
      className={clsx('c-table p-table', className)}
      {...(config && { 'data-config': config })}
      {...rest}
    >
      {colClasses.length > 0 && (
        <colgroup>
          {colClasses.map((colClass, index) => (
            <col key={index} className={colClass || undefined} />
          ))}
        </colgroup>
      )}

      {children}
    </table>
  );

  return isScrollable ? (
    <div className="c-scrollable p-scrollable">{tableElement}</div>
  ) : (
    tableElement
  );
};

const TableCaption = ({ className, children, ...rest }: BaseProps) => {
  return (
    <caption className={className} {...rest}>
      {children}
    </caption>
  );
};

interface TableHeadProps extends BaseProps {
  children: React.ReactElement<typeof TableHeader> | React.ReactElement<typeof TableHeader>[];
}
const TableHead = ({ className, children, ...rest }: TableHeadProps) => {
  return (
    <thead className={className} {...rest}>
      <tr>{children}</tr>
    </thead>
  );
};

interface TableBodyProps extends BaseProps {
  children: React.ReactElement<typeof TableRow>[];
}
const TableBody = ({ className, children, ...rest }: TableBodyProps) => {
  return (
    <tbody className={className} {...rest}>
      {children}
    </tbody>
  );
};

const TableFooter = ({ className, children, ...rest }: BaseProps) => {
  return (
    <tfoot className={className} {...rest}>
      {children}
    </tfoot>
  );
};

interface TableRowProps extends BaseProps {
  children:
    | React.ReactElement<typeof TableHeader | typeof TableData>
    | React.ReactElement<typeof TableHeader | typeof TableData>[];
}
const TableRow = ({ className, children, ...rest }: TableRowProps) => {
  return (
    <tr className={className} {...rest}>
      {children}
    </tr>
  );
};

const TableHeader = ({ className, children, ...rest }: BaseProps) => {
  return (
    <th className={className} {...rest}>
      {children}
    </th>
  );
};

const TableData = ({ className, children, ...rest }: BaseProps) => {
  return (
    <td className={className} {...rest}>
      {children}
    </td>
  );
};

const Table = Object.assign(TableRoot, {
  Caption: TableCaption,
  Head: TableHead,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Header: TableHeader,
  Data: TableData,
});

export default Table;
