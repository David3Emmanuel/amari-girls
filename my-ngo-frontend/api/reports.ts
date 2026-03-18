import { STRAPI_BASE_URL } from "./strapi";

export type ReportType =
  | "Annual Report"
  | "Budget"
  | "Auditor Report"
  | "Financial Statement"
  | "Grants/Donors";

export interface StrapiReport {
  id: number;
  documentId: string;
  year: number;
  type: ReportType;
  summary: string;
  files?: { url: string; name: string }[];
}

export async function getAllReports(): Promise<StrapiReport[]> {
  try {
    const res = await fetch(
      `${STRAPI_BASE_URL}/api/reports?populate[]=files`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}
