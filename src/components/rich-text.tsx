import type { Rich } from "@/content/copy";

/** Renders approved copy split into parts; emphasis changes weight only, never the words. */
export function RichText({ parts }: { parts: Rich }) {
  return (
    <>
      {parts.map((part, i) => (typeof part === "string" ? part : <strong key={i}>{part.em}</strong>))}
    </>
  );
}
