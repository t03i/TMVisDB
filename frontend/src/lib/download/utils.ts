// Copyright 2026 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

/**
 * Downloads a file using the browser's download API
 * @param content - The file content as a string
 * @param filename - The filename for the download
 * @param mimeType - The MIME type of the file (e.g., 'text/csv', 'text/plain')
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  try {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      throw new Error("Download is not supported in this browser");
    }
  } catch (error) {
    console.error("Failed to download file:", error);
    throw error;
  }
}

/**
 * Creates a filename for downloaded protein data
 * @param uniprotId - The UniProt accession ID
 * @param format - The download format ('csv' or '3lines')
 * @returns A sanitized filename
 */
export function createFilename(uniprotId: string, format: "csv" | "3lines"): string {
  // Sanitize the UniProt ID to remove any invalid filename characters
  const sanitized = uniprotId.replace(/[^a-zA-Z0-9_-]/g, "_");
  const extension = format === "csv" ? "csv" : "3lines";
  return `${sanitized}.${extension}`;
}
