import React, { useState, useEffect } from "react";
import "./styles.scss";

import infoIcon from "../assets/info-icon.svg";
import lockedIcon from "../assets/locked-padlock.svg";

type SecurePadProps = {
  message: string;
};

type Password = (number | null)[];

type DigitProps = {
  password: Password;
  passwordLength: number;
};

const DigitComponent: React.FC<DigitProps> = ({ password, passwordLength }) => {
  const emptyArray =
    password.length < passwordLength
      ? new Array(passwordLength - password.length).fill(null)
      : [];

  return (
    <div>
      {password.map((element, index) => {
        let className = "digit fill";
        return <div className={className} key={index} />;
      })}

      {emptyArray.map((element, index) => {
        let className = "digit";
        return <div className={className} key={index} />;
      })}
    </div>
  );
};

const SecurePadComponent = ({ message }: SecurePadProps) => {
  const [password, setPassword] = React.useState<Password | []>([]);
  const [availableDigits, setAvailableDigits] = React.useState<number[]>([]);

  useEffect(() => {
    function shuffleArray(array: any[]) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    }

    const random = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    setAvailableDigits(random);
  }, []);

  const handleClickNumber = (digit: number) => {
    if (password.length + 1 > 6) {
      return;
    }
    setPassword([...password, digit]);
  };

  const handleBack = () => {
    setPassword([...password].slice(0, -1));
  };

  const handleDelete = () => {
    setPassword([]);
  };

  return (
    <div className="secure-pad-wrapper">
      <div className="info-content">
        <div>
          <span>Clave de Internet de 6 dígitos </span>
          <img src={infoIcon} alt="info-icon" className="icon" />
        </div>
      </div>
      <div className="digits-container">
        <img src={lockedIcon} alt="lock-icon" className="icon" />
        <DigitComponent password={password} passwordLength={6} />
      </div>
      {/*<pre>{JSON.stringify(password, null, 2)}</pre>*/}
      <div className="select-pad">
        {availableDigits.map((digit, index) => {
          return (
            <div
              className="pad"
              key={index}
              onClick={() => handleClickNumber(digit)}
            >
              {digit}
            </div>
          );
        })}
        <div className="pad" onClick={() => handleBack()}>
          Borrar
        </div>
        <div className="pad" onClick={() => handleDelete()}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default SecurePadComponent;
