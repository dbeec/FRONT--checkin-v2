import "./template.css"
export default function Announcement({ title, text}: {title?: string; text?: string; }) {
  return (
    <>
    <div className="content__template">
      <h5>{title}</h5>
      <p>{text}</p>
    </div>
    </>
  );
}
