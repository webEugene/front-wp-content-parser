export function useDownload() {
  function downloadJSON(data: any, filename = "data") {
    const json = JSON.stringify(data, null, 2);
    triggerDownload(json, `${filename}.json`, "application/json");
  }

  function convertToCSV(data: any[]) {
    if (!Array.isArray(data) || data.length === 0) {
      return "";
    }

    // CASE 1 — array of primitives (strings, numbers)
    const isPrimitiveArray = data.every(
      (v) => typeof v !== "object" || v === null
    );

    if (isPrimitiveArray) {
      // CSV will be single column "value"
      const rows = data.map((v) => `"${String(v).replace(/"/g, '""')}"`);
      return ["value", ...rows].join("\n");
    }

    // CASE 2 — array of objects
    // Collect all unique keys from all items
    const keys = Array.from(
      data.reduce((set, item) => {
        Object.keys(item || {}).forEach((k) => set.add(k));
        return set;
      }, new Set<string>())
    );

    const rows = data.map((obj) =>
      keys
        .map((key) => {
          const value = obj?.[key];

          // Handle nested objects/arrays safely
          const safeValue =
            typeof value === "object" && value !== null
              ? JSON.stringify(value).replace(/"/g, '""')
              : String(value ?? "").replace(/"/g, '""');

          return `"${safeValue}"`;
        })
        .join(",")
    );

    return [keys.join(","), ...rows].join("\n");
  }
  function downloadCSV(data: any[], filename = "data") {
    const csv = convertToCSV(data);
    triggerDownload(csv, `${filename}.csv`, "text/csv;charset=utf-8;");
  }

  function triggerDownload(content: string, filename: string, type: string) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }

  return { downloadJSON, downloadCSV };
}
