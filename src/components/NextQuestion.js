export default function NextQuestion({answer, dispatch, index, numQuestions}){
    if(answer === null) return null;
    if(index === numQuestions-1)dispatch({type:'finishQuiz'})
    return <div>
        <button className="btn btn-ui" onClick={()=> dispatch({
            type: "nextQuestion" })}>Next Question</button>
    </div>
}