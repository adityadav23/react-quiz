export default function Finish({ points, maxPoints, children }) {
  const percent = (points / maxPoints) * 100;
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of {maxPoints}(
      {Math.ceil(percent)}%)
    </p>
  );
}
