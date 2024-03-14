export default function Announcement({ title, text}: {title?: string; text?: string; }) {
  return (
    <>
      <h5>{title}</h5>
      <p>{text}</p>
    </>
  );
}
