import React from 'react';

interface Column {
  header: string;
  accessor: string;
  className?: string;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: Record<string, any>[];
  className?: string;
  caption?: string;
  id?: string;
}

export default function ResponsiveTable({
  columns,
  data,
  className = '',
  caption,
  id,
}: ResponsiveTableProps) {
  return (
    <div className="overflow-x-auto w-full" role="region" aria-labelledby={id ? `${id}-caption` : undefined} tabIndex={0}>
      <table className={`min-w-full divide-y divide-gray-200 ${className}`} id={id}>
        {caption && (
          <caption id={id ? `${id}-caption` : undefined} className="sr-only">
            {caption}
          </caption>
        )}
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      colIndex === 0 ? 'font-medium text-gray-900' : 'text-gray-500'
                    } ${column.className || ''}`}
                    data-label={column.header}
                  >
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
