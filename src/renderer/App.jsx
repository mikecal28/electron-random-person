import { useState, useEffect, useRef } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.scss';
import Participant from './Participant';

export default function App() {
  const [namesArray, setNamesArray] = useState([]);
  const [storageArray, setStorageArray] = useState([]);
  const [weights, setWeights] = useState([]);
  const [enteredName, setEnteredName] = useState('');
  const [displayedName, setDisplayedName] = useState('');
  const [chosenOne, setChosenOne] = useState('');

  const flashingName = useRef();
  const entryRef = useRef();

  const delay = (time) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });

  const renderParticipants = () => {
    return storageArray.map((name, idx) => {
      return (
        <Participant
          namesArray={namesArray}
          setNamesArray={setNamesArray}
          name={name}
          idx={idx}
          chosenOne={chosenOne}
        />
      );
    });
  };

  const flashText = async (color) => {
    for (let i = 0; i < 10; i++) {
      if (flashingName.current.style.color === 'rgb(20, 24, 58)') {
        flashingName.current.style.color = color;
      } else {
        flashingName.current.style.color = 'rgb(20, 24, 58)';
      }
      await delay(200);
    }
  };

  const streamNames = async () => {
    if (namesArray.length > 0 && storageArray.length > 0) {
      setChosenOne('');
      const chosenParticipant = namesArray.at(
        Math.floor(Math.random() * namesArray.length),
      );
      for (let j = 0; j < 5; j++) {
        for (let i = 0; i < storageArray.length; i++) {
          if (namesArray.includes(storageArray[i])) {
            setDisplayedName(storageArray[i]);
            await delay(100);
          }
        }
      }
      setDisplayedName(chosenParticipant);
      setChosenOne(chosenParticipant);
      await flashText('skyblue');
      flashingName.current.style.color = 'rgb(20, 24, 58)';
    } else {
      setDisplayedName('All Weights = 0');
    }
  };

  useEffect(() => {
    entryRef.current.value = '';
  }, [storageArray]);

  return (
    <div>
      <div className="scroll-style"></div>
      <div className="page-container">
        <div className="header-wrapper">Name : Weight</div>
        <div className="left-body-wrapper">{renderParticipants()}</div>
        <div className="right-body-wrapper">
          <div className="random-person" ref={flashingName}>
            {displayedName}
          </div>
          <div className="start-button" onClick={streamNames}>
            Who's it gonna be?
          </div>
          <input
            ref={entryRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setNamesArray((prev) => [...prev, e.target.value]);
                setStorageArray((prev) => [...prev, e.target.value]);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
