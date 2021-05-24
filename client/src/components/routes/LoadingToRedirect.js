import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const LoadingToRedirect = (props) => {

    const [count,setCount] = useState(5);

    let history = useHistory();
    useEffect(() => {
        const interval = setInterval(() => {
          setCount((currentCount) => --currentCount);
        }, 1000);
        // redirect once count is equal to 0
        count === 0 && history.push("/");
        // cleanup
        return () => clearInterval(interval);
      }, [count]);
    
      return (
        <div className="container p-5 text-center">
            <h4> {props.name? "Admin Access Only" : "User Not Logged In"}</h4>
          <p>Redirecting you to home page in {count} seconds</p>
        </div>
      );
};

export default LoadingToRedirect;
