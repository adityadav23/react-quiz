export default function Progress({
  totalQuestion,
  points,
  index,
  maxPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={totalQuestion}
        value={index + Number(answer != null)}
      ></progress>
      <p>Question {`${index + 1}/${totalQuestion}`}</p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
}
