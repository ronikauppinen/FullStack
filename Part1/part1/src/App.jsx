import './App.css';
//import React from 'react';

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/ronikauppinen'>Roni</a>
    </div>
  )
}

  const Hello = (props) => {

    console.log(props)
    return (
      <div>
        <p>
  
          Hello {props.name}, you are {props.age} years old
        </p>
      </div>
    )
  }
  
  const App = () => {
  
    const name = 'Peter'
    const age = 10
  
    return (
      <><div>
        <h1>Greetings</h1>

        <Hello name='Maya' age={26 + 10} />
        <Hello name={name} age={age} />
      </div><Footer /></>
    )
  }
export default App;
