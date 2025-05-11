import { useState } from "react";
import { Sentences } from "../Data/sentences";
import { useRef } from "react";

const getRandomSentence = () => {
  return Sentences[Math.floor(Math.random() * Sentences.length)];
};

export function TypingTest() {
  const [sentence, setSentence] = useState(getRandomSentence());
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    if (!startTime) setStartTime(Date.now());
    const value = e.target.value;
    setInput(value);

    // Accuracy
    const correctChars = value
      .split("")
      .filter((char, idx) => char === sentence[idx]).length;
    const acc = (correctChars / value.length) * 100;
    setAccuracy(isNaN(acc) ? 100 : Math.round(acc));

    // WPM
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
    const wordsTyped = value.trim().split(" ").length;
    setWpm(Math.round(wordsTyped / timeElapsed));
  };

  const handleRestart = () => {
    setSentence(getRandomSentence());
    setInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Typing Speed Test</h1>

      <div className="mb-4 text-lg text-gray-700">
        {sentence?.split("").map((char, idx) => {
          let color = "";
          if (idx < input.length) {
            color = char === input[idx] ? "text-green-600" : "text-red-500";
          }
          return (
            <span key={idx} className={`${color}`}>
              {char}
            </span>
          );
        })}
      </div>

      <input
        ref={inputRef}
        type="text"
        className="w-full p-2 border rounded outline-none mb-4"
        value={input}
        onChange={handleChange}
        placeholder="Start typing here..."
      />

      <div className="flex justify-between text-gray-600 text-sm">
        <span>WPM: {wpm}</span>
        <span>Accuracy: {accuracy}%</span>
      </div>

      <button
        onClick={handleRestart}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Restart
      </button>
    </div>
  );
}

export default TypingTest;
