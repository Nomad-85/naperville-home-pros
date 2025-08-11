'use client';

import React, { useState, useMemo } from 'react';

export interface TableColumn<T = any> {
  header: string;
  accessor: keyof T | string;
  cell?: (value: any, row: T, index: number) => React.ReactNode;
  className?: string;
  sortable?: boolean;
  width?: string | number;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: (row: T, index: number) => string;
  caption?: string;
  id?: string;
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  sortable?: boolean;
  defaultSortField?: string;
  defaultSortDirection?: 'asc' | 'desc';
  emptyMessage?: React.ReactNode;
  onRowClick?: (row: T, index: number) => void;
}

export default function Table<T extends Record<string, any>>({
  columns,
  data,
  className = '',
  tableClassName = '',
  headerClassName = '',
  bodyClassName = '',
  rowClassName,
  caption,
  id,
  striped = true,
  bordered = false,
  hoverable = true,
  compact = false,
  sortable = false,
  defaultSortField,
  defaultSortDirection = 'asc',
  emptyMessage = 'No data available',
  onRowClick,
}: TableProps<T>) {
  // Sorting state
  const [sortField, setSortField] = useState<string | undefined>(defaultSortField);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultSortDirection);

  // Handle sort click
  const handleSort = (accessor: string, isSortable: boolean = true) => {
    if (!sortable || !isSortable) return;

    if (sortField === accessor) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(accessor);
      setSortDirection('asc');
    }
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortable || !sortField) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortField as keyof T];
      const bValue = b[sortField as keyof T];

      if (aValue === bValue) return 0;

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? -1 : 1;
      if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? 1 : -1;

      return sortDirection === 'asc'
        ? aValue > bValue ? 1 : -1
        : aValue > bValue ? -1 : 1;
    });
  }, [data, sortField, sortDirection, sortable]);

  // Style classes
  const tableStyles = `
    min-w-full divide-y divide-gray-200
    ${bordered ? 'border border-gray-200' : ''}
    ${tableClassName}
  `;

  const thStyles = `
    px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
    ${compact ? 'py-2' : ''}
    ${headerClassName}
  `;

  const tdStyles = `
    px-6 py-4 whitespace-nowrap text-sm text-gray-500
    ${compact ? 'py-2' : ''}
  `;

  // Get cell value
  const getCellValue = (row: T, column: TableColumn<T>, rowIndex: number) => {
    const accessor = column.accessor as string;
    const value = row[accessor];
    
    return column.cell ? column.cell(value, row, rowIndex) : value;
  };

  return (
    <div className={`overflow-x-auto w-full ${className}`} role="region" aria-labelledby={id ? `${id}-caption` : undefined} tabIndex={0}>
      <table className={tableStyles} id={id}>
        {caption && (
          <caption id={id ? `${id}-caption` : undefined} className="sr-only">
            {caption}
          </caption>
        )}
        <thead className={`bg-gray-50 ${bordered ? 'border-b border-gray-200' : ''}`}>
          <tr>
            {columns.map((column, index) => {
              const isSortable = sortable && (column.sortable !== false);
              const isCurrentSortField = sortField === column.accessor;
              
              return (
                <th
                  key={index}
                  scope="col"
                  className={`${thStyles} ${column.className || ''} ${isSortable ? 'cursor-pointer select-none' : ''}`}
                  style={column.width ? { width: column.width } : {}}
                  onClick={() => handleSort(column.accessor as string, column.sortable)}
                  aria-sort={
                    isCurrentSortField
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {isSortable && (
                      <span className="inline-flex flex-col">
                        <svg
                          className={`w-3 h-3 ${
                            isCurrentSortField && sortDirection === 'asc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                        </svg>
                        <svg
                          className={`w-3 h-3 -mt-1 ${
                            isCurrentSortField && sortDirection === 'desc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                        </svg>
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={`bg-white divide-y divide-gray-200 ${bodyClassName}`}>
          {sortedData.length > 0 ? (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`
                  ${striped && rowIndex % 2 === 1 ? 'bg-gray-50' : ''}
                  ${hoverable ? 'hover:bg-gray-100' : ''}
                  ${onRowClick ? 'cursor-pointer' : ''}
                  ${rowClassName ? rowClassName(row, rowIndex) : ''}
                `}
                onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`${tdStyles} ${
                      colIndex === 0 ? 'font-medium text-gray-900' : ''
                    } ${column.className || ''}`}
                    data-label={column.header}
                  >
                    {getCellValue(row, column, rowIndex)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
