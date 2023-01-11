import React, { useState } from "react";

function App() {

  setInterval(updateTime, 1000);
  const [name, setName] = useState("");
  const [headingText, setHeading] = useState("");
  let now = new Date().toLocaleTimeString();
  const [time, setTime] = useState(now);
  const [count, setCount] = useState(0);
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function updateTime() {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  }

  function increase() {
    setCount(count + 1);
  }

  function decrease() {
    setCount(count - 1);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setContact(prevValue => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName,
          email: prevValue.email
        };
      } else if (name === "lName") {
        return {
          fName: prevValue.fName,
          lName: value,
          email: prevValue.email
        };
      } else if (name === "email") {
        return {
          fName: prevValue.fName,
          lName: prevValue.lName,
          email: value
        };
      }
    });
  }

  function handleClick(event) {
    setHeading(name);

    event.preventDefault();
  }

  return (
    <div className="container">
      <h1 class="time">{time}</h1>
      <h1 class="number">{count}</h1>
      <button onClick={decrease}>-</button>
      <button onClick={increase}>+</button>
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input
          onChange={handleChange}
          value={contact.fName}
          name="fName"
          placeholder="First Name"
        />
        <input
          onChange={handleChange}
          value={contact.lName}
          name="lName"
          placeholder="Last Name"
        />
        <input
          onChange={handleChange}
          value={contact.email}
          name="email"
          placeholder="Email"
        />
        <button class="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
