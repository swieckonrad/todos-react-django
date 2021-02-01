import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

let render = 1;

// taken from https://usehooks.com/usePrevious/
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function useEffectAllDepsChange(fn, deps) {
  const prevDeps = usePrevious(deps);
  const changeTarget = useRef();

  useEffect(() => {
    // nothing to compare to yet
    if (changeTarget.current === undefined) {
      changeTarget.current = prevDeps;
    }

    // we're mounting, so call the callback
    if (changeTarget.current === undefined) {
      return fn();
    }

    // make sure every dependency has changed
    if (changeTarget.current.every((dep, i) => dep !== deps[i])) {
      changeTarget.current = deps;

      return fn();
    }
  }, [fn, prevDeps, deps]);
}

const KomponentZPaskiemLadowania = () => {
  const [color, setColor] = useState("red");

  const [innycolor, setinnyColor] = useState("green");

  useEffect(() => {
    const intervalColor = setInterval(() => {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      setColor(randomColor);
      console.log("Kolor zmieniony na " + randomColor);
      console.log(innycolor);
    }, 100);
    return () => {
      clearInterval(intervalColor);
    };
  }, [innycolor]);

  useEffect(() => {
    const intervalColor = setInterval(() => {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      setinnyColor(randomColor);
      console.log("inny Kolor zmieniony na " + randomColor);
    }, 100);
    return () => {
      clearInterval(intervalColor);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: color,
      }}
    >
      Laduje sie...
    </div>
  );
};

export const TodoDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [counter, setCounter] = useState(0);

  console.log("renderowanie komponentu...");

  useEffect(() => {
    // console.clear();
    console.log("Liczba renderow: " + render);
    render++;

    console.log(document.querySelector("#moj-button"));
  });

  useEffect(() => {
    console.log("wyrenderowano komponent");
  });

  useEffect(() => {
    console.log("po raz pierwszy wyrenderowano komponent - początek życia");

    return () => {
      console.log(
        "tzw. cleanup function po raz ostatni wyrenderowano komponent - koniec życia"
      );
    };
  }, []);

  const [daneZSerwera, setDaneZSerwera] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setDaneZSerwera("lista zakupow: monitor, karta graficzna");
    }, 5000);
  }, []);

  useEffect(() => {
    // poczatek zycia
    const idIntervala = setInterval(() => {
      console.log("co 1s");
    }, 1000);

    return () => {
      // koniec zycia
      clearInterval(idIntervala);
    };
  }, []);

  useEffect(() => {
    console.log("wyrenderowano komponent po zmianie stanu data");
  }, [data]);

  useEffect(() => {
    console.log("wyrenderowano komponent po zmianie stanu counter");
  }, [counter]);

  useEffect(() => {
    console.log("wyrenderowano komponent po zmianie stanu data lub counter");
  }, [data, counter]);

  useEffectAllDepsChange(() => {
    console.log("wyrenderowano komponent po zmianie stanu data i counter");
  }, [data, counter]);

  return (
    <div className="TodoDetails">
      <button
        onClick={() => {
          setData({ text: "bbb" });
          setCounter((prev) => prev + 1);
        }}
      >
        Dodaj do countera 1 i zmien data
      </button>
      <button id="moj-button" onClick={() => setCounter((prev) => prev + 1)}>
        Dodaj 1 do countera
      </button>
      <button onClick={() => setCounter((prev) => prev + 2)}>
        Dodaj 2 do countera
      </button>
      <br />
      <br />
      Counter: {counter}
      <br />
      <br />
      {daneZSerwera === "" ? <KomponentZPaskiemLadowania /> : null}
      {data ? (
        <div>
          to jest todo id: {id}
          <br />
          text: {data.text}
        </div>
      ) : (
        <div>
          <div>Loading...</div>;
          <button onClick={() => setData({ text: "aaa" })}>Zmien data</button>
        </div>
      )}
    </div>
  );
};
