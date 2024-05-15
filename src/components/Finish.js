export default function Finish({ points, maxPoints, dispatch }) {
  const percent = (points / maxPoints) * 100;
  return (
    <>
    <p className="result">
      You scored <strong>{points}</strong> out of {maxPoints}(
      {Math.ceil(percent)}%)
    </p>
    <button className="btn btn-ui" onClick={()=> dispatch({
        type: "restart" })}>Restart Quiz</button>
    </>
  )
}
