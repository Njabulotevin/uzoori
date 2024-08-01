"use client";

import { Iproduct } from "@/app/models/product";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Iproduct>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "availability",
    header: "Availability",
  },
];
