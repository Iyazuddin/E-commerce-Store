import { useEffect } from "react";

// Keeps the browser tab title in sync with the page
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · NovaCart` : "NovaCart";
  }, [title]);
}
