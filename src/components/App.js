import { useEffect, useReducer } from 'react';
import Header from './Header'
import Main from './Main';
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen';
import Question from './Question';
import NextQuestion from './NextQuestion';
import Progress from './Progress';


const STATUS = {
  ready:1,
  loading: 2,
  error:3,
  finished: 4,
  active: 5,
}
const initialState = {
  questions:[],
  status: STATUS['loading'], // 
  index:0,
  answer: null,
  points: 0

}

function reducer(state, action){
  switch(action.type){
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: STATUS['ready']
      }
    case "dataFailed":
      return {
        ...state,
        status: STATUS['error']
      }
    case "start":
      return {
        ...state,
        status: STATUS['active']
      }
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index +1,
        answer: null
      }
    default: 
      throw new Error("Unknown action")
  }
}
function App() {

  const [{questions, status, index, answer, points}, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, current) => {
    return current.points + prev;
  }, 0);
  useEffect(function(){
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({type: "dataReceived",payload: data}))
      .catch((err) => {
        dispatch({type: "dataFailed"})
      });
  }, []);

  return (
    <div className="app">
      <Header></Header>
      <Main>
        {status === STATUS["loading"] && <Loader />}
        {status === STATUS["error"] && <Error />}
        {status === STATUS["ready"] && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === STATUS["active"] && (
          <>
            <Progress
              totalQuestion={questions.length}
              points={points}
              index={index}
              maxPoints={maxPoints}
              answer={answer}
            ></Progress>
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextQuestion dispatch={dispatch} answer={answer}></NextQuestion>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;