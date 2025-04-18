import { Column } from "./types";
interface Props<T> {
    data: T[];
    columns: Column<T>[];
    pageSize?: number;
    searchable?: boolean;
}
export declare function DataTable<T extends object>({ data, columns, pageSize, searchable, }: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};
