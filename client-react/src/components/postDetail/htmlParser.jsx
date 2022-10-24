export default function HtmlParser({ content }) {
  return (
    <div  dangerouslySetInnerHTML={{ __html: content }} />
  )
}