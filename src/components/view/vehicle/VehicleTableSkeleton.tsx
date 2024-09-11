import { Skeleton, TableCell, TableRow } from '@components';

export const TableSkeleton = () => {
  return (
    <>
      {[...Array(7)].map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-full mr-2" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full mr-2" />
          </TableCell>
          <TableCell>
            {' '}
            <Skeleton className="h-4 w-full mr-2" />
          </TableCell>
          <TableCell>
            {' '}
            <Skeleton className="h-4 w-full mr-2" />
          </TableCell>
          <TableCell>
            {' '}
            <Skeleton className="h-4 w-full mr-2" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full mr-2" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full mr-2" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
