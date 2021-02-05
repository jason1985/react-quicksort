import { useState } from "react";
import { useRef } from "react";
import "./App.css";
import Bar from "./components/Bar";

let animations = [];

export default function App() {
  const [bars, setBars] = useState(genNums);

  let btnRef = useRef();
  let btnRefSort = useRef();

  const sortIt = () => {
    //disable sort for 3 seconds
    //disable reset for 3 seconds
    btnRefSort.current.setAttribute("disabled", "disabled");
    btnRef.current.setAttribute("disabled", "disabled");
    setTimeout(() => {
      btnRef.current.removeAttribute("disabled");
    }, 3000);

    let sorted = [];

    for (let i = 0; i < bars.length; i++) {
      sorted.push(bars[i][0]);
    }

    console.log("before", sorted);
    quicksort(sorted, 0, sorted.length - 1);

    console.log(sorted);

    let arryCp = [...bars];
    console.log("arrcpy", arryCp);
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        let temp = arryCp[animations[i][0]];
        arryCp[animations[i][0]] = arryCp[animations[i][1]];
        arryCp[animations[i][1]] = temp;
        arryCp[animations[i][0]][1] = true;
        arryCp[animations[i][1]][1] = true;

        let asdf = [...arryCp]; //todo: fix this
        setBars(asdf);

        arryCp[animations[i][0]][1] = false;
        arryCp[animations[i][1]][1] = false;
      }, i * 10);
    }

    setBars(sorted);
  };

  const reset = () => {
    setBars(genNums);
    animations = [];
    btnRefSort.current.removeAttribute("disabled");
  };

  return (
    <>
      <h1>Quicksort</h1>
      <button ref={btnRefSort} onClick={sortIt}>
        sort
      </button>
      <button ref={btnRef} onClick={reset}>
        reset
      </button>
      <div className="container">
        {bars.map((bar, key) => (
          <div key={key}>
            <Bar height={bar[0]} color={bar[1] ? "blue" : "white"} />
          </div>
        ))}
      </div>
    </>
  );
}

const quicksort = (arr, l, r) => {
  if (l >= r) return;

  let p = partition(arr, l, r);

  quicksort(arr, l, p - 1);
  quicksort(arr, p + 1, r);
};

const partition = (arr, l, r) => {
  let i = l - 1;

  for (let j = l; j < r; j++) {
    if (arr[j] < arr[r]) {
      i++;
      let temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
      if (i !== j) animations.push([j, i, true]);
    }
  }

  i++;
  let temp = arr[i];
  arr[i] = arr[r];
  arr[r] = temp;
  if (i !== r) animations.push([r, i, true]);

  return i;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const genNums = () => {
  let newArray = [];

  for (let i = 0; i < 80; i++) {
    newArray.push([getRandomInt(30, 400), false]);
  }

  return newArray;
};
