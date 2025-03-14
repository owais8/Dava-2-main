/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import { Stack } from "@mui/material";
import { useSession } from "next-auth/react";

import { CreateUrlForm } from "./components/CreateUrlForm";
import type { ITableItem} from "./components/Table";
import {Table } from "./components/Table";
const API = process.env.NEXT_PUBLIC_API_URL;

export function URLMapperPage() {
  const [mappings, setMappings] = useState<ITableItem[]>([]);
  const { data: session } = useSession();
  const token = session?.user.accesstoken;
  const convertKeysToCamelCase = (obj: any): ITableItem => {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        newObj[camelCaseKey] = obj[key];
      }
    }

    return newObj as ITableItem;
  };

  const handleCreateMapping = async (formData: any) => {
    try {
      const response = await fetch(`${API}/api/create_mapping`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create mapping");

      const newMapping = await response.json();
      const convertedNewMapping = convertKeysToCamelCase(newMapping.data);
      setMappings((prev) => [...prev, convertedNewMapping]);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchMappings = async () => {
      try {
        const response = await fetch(`${API}/api/get_mappings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch mappings");

        const res = await response.json();
        const data: ITableItem[] = res.data.map((item: any) => convertKeysToCamelCase(item));
        setMappings(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching mappings:", error);
      }
    };

    if (token) {
      fetchMappings();
    }
  }, [token]);

  return (
    <Stack spacing={6}>
      <CreateUrlForm onCreateMapping={handleCreateMapping} />
      <Table data={mappings} />
    </Stack>
  );
}
