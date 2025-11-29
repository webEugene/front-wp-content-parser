export function useDownload() {
  function downloadJSON(data: any, filename = "data") {
    const json = JSON.stringify(data, null, 2);
    triggerDownload(json, `${filename}.json`, "application/json");
  }

  function convertToCSV(arr: any[]) {
    const header = Object.keys(arr[0]).join(",");
    const rows = arr.map((obj) =>
      Object.values(obj)
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );

    return [header, ...rows].join("\n");
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
