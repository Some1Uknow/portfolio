export {
  blogStructuredData,
  homeStructuredData,
  personSchema,
  postStructuredData,
  projectStructuredData,
} from "./structured-data.js"

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
