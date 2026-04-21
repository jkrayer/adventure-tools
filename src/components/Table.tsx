import type { ComponentPropsWithoutRef, ReactNode } from "react";

type TableProps = Omit<ComponentPropsWithoutRef<"table">, "children"> & {
  children: ReactNode;
  caption?: ReactNode;
};

function Table({ children, caption, className, ...tableProps }: TableProps) {
  const cls = className ? `table ${className}` : "table";

  return (
    <table className={cls} {...tableProps}>
      {caption ? <caption>{caption}</caption> : null}
      {children}
    </table>
  );
}

export default Table;
