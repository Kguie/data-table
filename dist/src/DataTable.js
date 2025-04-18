import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
export function DataTable({ data, columns, pageSize = 10, searchable = false, }) {
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [page, setPage] = useState(1);
    const filtered = useMemo(() => {
        return searchable
            ? data.filter((row) => JSON.stringify(row).toLowerCase().includes(search.toLowerCase()))
            : data;
    }, [search, data]);
    const sorted = useMemo(() => {
        if (!sortKey)
            return filtered;
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
    return (_jsxs("div", { children: [searchable && (_jsx("input", { placeholder: "Rechercher...", value: search, onChange: (e) => setSearch(e.target.value) })), _jsxs("table", { children: [_jsx("thead", { children: _jsx("tr", { children: columns.map((col) => (_jsx("th", { onClick: () => col.sortable &&
                                    (setSortKey(col.key),
                                        setSortAsc(sortKey === col.key ? !sortAsc : true)), children: col.title }, String(col.key)))) }) }), _jsx("tbody", { children: paginated.map((row, i) => (_jsx("tr", { children: columns.map((col) => (_jsx("td", { children: String(row[col.key]) }, String(col.key)))) }, i))) })] }), _jsxs("div", { children: ["Page ", page, " / ", Math.ceil(filtered.length / pageSize), _jsx("button", { onClick: () => setPage((p) => Math.max(p - 1, 1)), children: "Pr\u00E9c" }), _jsx("button", { onClick: () => setPage((p) => Math.min(p + 1, Math.ceil(filtered.length / pageSize))), children: "Suiv" })] })] }));
}
