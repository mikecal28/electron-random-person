import { useState, useEffect } from 'react';

function Participant({ namesArray, setNamesArray, name, idx, chosenOne }) {
  const [weightState, setWeightState] = useState(1);

  useEffect(() => {
    console.log(namesArray);
  });

  useEffect(() => {
    if (chosenOne === name && weightState > 0) {
      setWeightState((prev) => (prev -= 1));
      setNamesArray((prev) => {
        if (prev.includes(name)) {
          prev.splice(prev.indexOf(name), 1);
        }

        return prev;
      });
    }
  }, [chosenOne]);

  return (
    <div className="participant-wrapper">
      <div className="participant-name">{name}: </div>

      <div className="weight-count">{weightState}</div>
      <div
        className="weight-up"
        onClick={() => {
          setWeightState((prev) => {
            if (weightState > 0) {
              return (prev -= 1);
            } else {
              return 0;
            }
          });

          setNamesArray((prev) => {
            if (prev.includes(name)) {
              prev.splice(prev.indexOf(name), 1);
            }

            return prev;
          });
        }}
      >
        <div className="up-icon-div">
          <p>-</p>
        </div>
      </div>
      <div
        className="weight-down"
        onClick={() => {
          setWeightState((prev) => (prev += 1));
          setNamesArray((prev) => {
            prev.splice(prev.indexOf(name), 0, name);

            return prev;
          });
        }}
      >
        <div className="down-icon-div">
          <p>+</p>
        </div>
      </div>
    </div>
  );
}

export default Participant;
