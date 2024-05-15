import { useEffect } from "react"

export default function Timer({secondsRemaining, dispatch}){
    useEffect(function (){
       const id = setInterval(() => {
            dispatch({type: "timer"})
        }, 1000);

        return ()=>clearInterval(id)
    },[dispatch])
    return (
        <div className="timer">
            {secondsRemaining}
        </div>
    )
}