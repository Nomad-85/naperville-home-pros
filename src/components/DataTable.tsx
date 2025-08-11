'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Pagination from './Pagination';

export interface Column<T> {
  header: React.ReactNode;
  accessor: keyof T | ((row: T) => React.ReactNode);
  cell?: (value: any, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  onRowClick?: (row: T, index: number) => void;
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: (row: T, index: number) => string;
  emptyMessage?: React.ReactNode;
  loading?: boolean;
  loadingRows?: number;
  sortable?: boolean;
  initialSortBy?: {
    id: keyof T;
    desc: boolean;
  };
  stickyHeader?: boolean;
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  highlightOnHover?: boolean;
  responsive?: boolean;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  onRowClick,
  className = '',
  tableClassName = '',
  headerClassName = '',
  bodyClassName = '',
  rowClassName,
  emptyMessage = 'No data available',
  loading = false,
  loadingRows = 5,
  sortable = true,
  initialSortBy,
  stickyHeader = false,
  striped = true,
  bordered = true,
  compact = false,
  highlightOnHover = true,
  responsive = true,
}: DataTableProps<T>) {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({
    key: initialSortBy?.id || null,
    direction: initialSortBy?.desc ? 'desc' : 'asc',
  });
  
  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);
  
  // Sort data if needed
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue === bValue) return 0;
      
      // Handle different types of values
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      const comparison = 
        typeof aValue === 'string' 
          ? aValue.localeCompare(bValue) 
          : aValue > bValue ? 1 : -1;
      
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);
  
  // Get current page data
  const currentData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage, pagination]);
  
  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(sortedData.length / itemsPerPage);
  }, [sortedData, itemsPerPage]);
  
  // Handle sort
  const handleSort = (key: keyof T) => {
    if (!sortable) return;
    
    setSortConfig(prevConfig => {
      if (prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      
      return {
        key,
        direction: 'asc',
      };
    });
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Handle page size change
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  
  // Render sort indicator
  const renderSortIndicator = (column: Column<T>) => {
    if (!sortable || !column.sortable) return null;
    
    const isCurrentSort = sortConfig.key === column.accessor;
    const direction = sortConfig.direction;
    
    return (
      <span className="ml-1 inline-flex">
        {isCurrentSort ? (
          direction === 'asc' ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )
        ) : (
          <svg className="w-4 h-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        )}
      </span>
    );
  };
  
  // Render loading skeleton
  const renderLoadingSkeleton = () => {
    return Array.from({ length: loadingRows }).map((_, rowIndex) => (
      <tr key={`loading-row-${rowIndex}`} className="animate-pulse">
        {columns.map((column, colIndex) => (
          <td key={`loading-cell-${rowIndex}-${colIndex}`} className="py-3 px-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </td>
        ))}
      </tr>
    ));
  };
  
  // Render empty state
  const renderEmptyState = () => {
    return (
      <tr>
        <td 
          colSpan={columns.length} 
          className="py-8 px-4 text-center text-gray-500"
        >
          {emptyMessage}
        </td>
      </tr>
    );
  };
  
  // Table style classes
  const tableStyles = [
    'min-w-full divide-y divide-gray-200',
    bordered ? 'border border-gray-200' : '',
    tableClassName,
  ].filter(Boolean).join(' ');
  
  // Header style classes
  const headerStyles = [
    'bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
    stickyHeader ? 'sticky top-0 z-10' : '',
    headerClassName,
  ].filter(Boolean).join(' ');
  
  // Cell padding classes
  const cellPadding = compact ? 'py-2 px-3' : 'py-3 px-4';
  
  return (
    <div className={`${responsive ? 'overflow-x-auto' : ''} ${className}`}>
      <table className={tableStyles}>
        <thead className={headerStyles}>
          <tr>
            {columns.map((column, index) => {
              const isSortable = sortable && column.sortable !== false;
              
              return (
                <th
                  key={index}
                  className={`
                    ${cellPadding}
                    ${isSortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                    ${column.headerClassName || ''}
                  `}
                  style={{ width: column.width }}
                  onClick={() => isSortable && typeof column.accessor === 'string' && handleSort(column.accessor)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {isSortable && typeof column.accessor === 'string' && renderSortIndicator(column)}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        
        <tbody className={`bg-white divide-y divide-gray-200 ${bodyClassName}`}>
          {loading ? (
            renderLoadingSkeleton()
          ) : currentData.length === 0 ? (
            renderEmptyState()
          ) : (
            currentData.map((row, rowIndex) => {
              const rowClass = [
                striped && rowIndex % 2 === 1 ? 'bg-gray-50' : '',
                highlightOnHover ? 'hover:bg-gray-100' : '',
                onRowClick ? 'cursor-pointer' : '',
                rowClassName ? rowClassName(row, rowIndex) : '',
              ].filter(Boolean).join(' ');
              
              return (
                <tr
                  key={rowIndex}
                  className={rowClass}
                  onClick={() => onRowClick && onRowClick(row, rowIndex)}
                >
                  {columns.map((column, colIndex) => {
                    const cellValue = typeof column.accessor === 'function'
                      ? column.accessor(row)
                      : row[column.accessor];
                    
                    const cellContent = column.cell
                      ? column.cell(cellValue, row, rowIndex)
                      : cellValue;
                    
                    return (
                      <td
                        key={colIndex}
                        className={`${cellPadding} ${column.className || ''}`}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      
      {pagination && !loading && data.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 bg-white border-t border-gray-200">
          <div className="flex items-center mb-4 sm:mb-0">
            <span className="text-sm text-gray-700 mr-2">
              Rows per page:
            </span>
            <select
              className="border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              value={itemsPerPage}
              onChange={handlePageSizeChange}
            >
              {pageSizeOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            
            <span className="text-sm text-gray-700 ml-4">
              {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length}
            </span>
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath=""
            className="mb-0"
          />
        </div>
      )}
    </div>
  );
}
