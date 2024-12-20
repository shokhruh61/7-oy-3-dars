import React, { useEffect, useState, useRef } from 'react';

function DigitalClock() {
  const [clock, setClock] = useState(new Date());
  const [timer, setTimer] = useState("00:00:00");

  const [selectedCity, setSelectedCity] = useState('Tashkent');
  const [time, setTime] = useState('');

  const Ref = useRef();

  function getTimeRemaining(deadline) {
    const total = Date.parse(deadline) - Date.parse(new Date());
    const hour = Math.floor(total / (1000 * 60 * 60) % 24);
    const seconds = Math.floor((total / 1000) % 60);
    const minute = Math.floor((total / 1000 / 60) % 60);
    return { total, hour, minute, seconds };
  }

  function startTimer(deadline) {
    let { total, hour, minute, seconds } = getTimeRemaining(deadline);

    if (total >= 0) {
      setTimer(
        (hour > 9 ? hour : "0" + hour) + ":" +
        (minute > 9 ? minute : "0" + minute) + ":" +
        (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  }

  function clearTimer() {
    setTimer("00:00:20");
    if (Ref.current) clearInterval(Ref.current);

    const deadline = getDeadTime();
    const id = setInterval(() => {
      startTimer(deadline);
    }, 1000);

    Ref.current = id;
  }

  function getDeadTime() {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  }

  useEffect(() => {
    clearTimer();
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formattedTime = clock.toLocaleTimeString();
  let splitTime = formattedTime.split(":");
  const addZero = (value) => (value.length === 1 ? "0" + value : value);
  let splitHour = addZero(splitTime[0]);

  function handleClick() {
    clearTimer();
  }

  const cities = {
    Tashkent: 'Asia/Tashkent',
    London: 'Europe/London',
    Tokyo: 'Asia/Tokyo',
  };

  const getCityTime = (city) => {
    const cityTime = new Date().toLocaleString('en-US', {
      timeZone: cities[city],
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return cityTime;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCityTime(selectedCity));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };



  return (
    <div className='w-[500px] mx-auto mt-52 bg-green-600 rounded-md pt-[90px]'>
      <h1 className='text-center text-4xl text-white'>{splitHour} : {splitTime[1]} : {splitTime[2]}</h1>
      <h2 className='text-center'>{timer}</h2>
      <button onClick={handleClick} className='bg-white py-2 px-3 rounded-md ml-52'>Click</button>


      <h3 className="text-center text-4xl text-white mb-4">Mahalliy vaqtni ko‘rish</h3>

      <select
        onChange={handleCityChange}
        value={selectedCity}
        className="block mx-auto mb-4 p-2 bg-white text-black rounded-md"
      >
        <option value="Tashkent">Tashkent</option>
        <option value="London">London</option>
        <option value="Tokyo">Tokyo</option>
      </select>

      <h2 className="text-center text-2xl text-white mt-4">Vaqt: {time}</h2>
    </div>
  );
}

export default DigitalClock;
