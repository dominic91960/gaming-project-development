import React, { useEffect, useState } from "react";

const user = {
  name: "Avishka",
};

const Greeting = () => {
  const [greetingMessage, setGreetingMessage] = useState("Greetings");

  const updateGreeting = () => {
    const currentHour = new Date().getHours() + 3;
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greeting = "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      greeting = "Good Evening";
    } else {
      greeting = "Good Night";
    }

    setGreetingMessage(`${greeting} ${user.name}`);
  };

  useEffect(() => {
    updateGreeting();

    const interval = setInterval(updateGreeting, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[12px] mt-[3em]">
      <h1 className="font-bold">{greetingMessage}</h1>
      <hr className="w-[25ch] border-t-[#00FFA1]" />
    </div>
  );
};

export default Greeting;
