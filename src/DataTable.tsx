import React, { useMemo, useState } from "react";
import { Column } from "./types";

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  searchable?: boolean;
}

export function DataTable<T extends object>({
  data,
  columns,
  pageSize = 10,
  searchable = false,
}: Props<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return searchable
      ? data.filter((row) =>
          JSON.stringify(row).toLowerCase().includes(search.toLowerCase())
        )
      : data;
  }, [search, data]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      return (valA > valB ? 1 : -1) * (sortAsc ? 1 : -1);
    });
  }, [filtered, sortKey, sortAsc]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  return (
    <div>
      {searchable && (
        <input
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={() =>
                  col.sortable &&
                  (setSortKey(col.key),
                  setSortAsc(sortKey === col.key ? !sortAsc : true))
                }>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={String(col.key)}>{String(row[col.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        Page {page} / {Math.ceil(filtered.length / pageSize)}
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
        <button
          onClick={() =>
            setPage((p) =>
              Math.min(p + 1, Math.ceil(filtered.length / pageSize))
            )
          }>
          Next
        </button>
      </div>
    </div>
  );
}
