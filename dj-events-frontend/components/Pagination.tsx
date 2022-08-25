import Link from 'next/link';
import React from 'react';
import { PER_PAGE } from '@/config/index';

interface PaginationProps {
  page: number;
  total: number;
}

export default function Pagination({
  page,
  total,
}: PaginationProps): JSX.Element {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </>
  );
}
