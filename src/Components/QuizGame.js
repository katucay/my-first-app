import { useState } from "react";

const quizData = [
  { q: "National flower of the Philippines?", options: ["Rose","Tulip","Sampaguita","Lily"], answer: 2 },
  { q: "Flower that follows the sun?", options: ["Sunflower","Rose","Daisy","Tulip"], answer: 0 },
  { q: "Symbol of love?", options: ["Tulip","Rose","Sunflower","Lily"], answer: 1 },
  { q: "Blooms at night?", options: ["Moonflower","Rose","Tulip","Daisy"], answer: 0 },
  { q: "Which flower means purity?", options: ["Rose","Lily","Sunflower","Orchid"], answer: 1 },
  { q: "Which flower is yellow and large?", options: ["Tulip","Sunflower","Rose","Lily"], answer: 1 },
  { q: "Which flower is often used in weddings?", options: ["Daisy","Rose","Orchid","Sunflower"], answer: 1 },
  { q: "Which flower is very fragrant?", options: ["Sampaguita","Tulip","Sunflower","Daisy"], answer: 0 },
  { q: "Which flower grows in water?", options: ["Lotus","Rose","Tulip","Lily"], answer: 0 },
  { q: "Which flower represents friendship?", options: ["Rose","Sunflower","Yellow Rose","Orchid"], answer: 2 }
];

function QuizGame() {
  const [qIndex, setQIndex] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qLevel, setQLevel] = useState(1);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const current = quizData[qIndex];

  const checkAnswer = (i) => {
    if (answered) return;

    setAnswered(true);
    setSelected(i);

    if (i === current.answer) {
      setQScore(prev => prev + 10);
    }
  };

  const nextQuestion = () => {
    if (!answered) return;

    const next = qIndex + 1;

    if (next >= quizData.length) {
      setFinished(true);
      return;
    }

    if (next % 3 === 0) {
      setQLevel(prev => prev + 1);
    }

    setQIndex(next);
    setAnswered(false);
    setSelected(null);
  };

  if (finished) {
    return (
      <div className="quiz-box">
        <h2>🎉 Quiz Completed!</h2>
        <p>Final Score: {qScore}</p>
        <button onClick={() => window.location.reload()}>
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🌸 Bloom Quiz Game 🌸</h1>

      <div className="quiz-box">
        <div style={{ fontSize: "22px", fontWeight: "bold" }}>
          {current.q}
        </div>

        <div className="options">
          {current.options.map((opt, i) => {
            let style = {
              padding: "15px",
              borderRadius: "15px",
              background: "#ffd6e0",
              border: "none",
              cursor: answered ? "not-allowed" : "pointer"
            };

            if (answered) {
              if (i === current.answer) style.background = "#9cffb3";
              else if (i === selected) style.background = "#ff9c9c";
            }

            return (
              <button
                key={i}
                style={style}
                onClick={() => checkAnswer(i)}
                disabled={answered}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="scoreboard">
          <div>Score: {qScore}</div>
          <div>Level: {qLevel}</div>
        </div>

        <p style={{ fontWeight: "bold" }}>
          {answered &&
            (selected === current.answer
              ? "✅ Correct!"
              : "❌ Incorrect!")}
        </p>

        <button onClick={nextQuestion} disabled={!answered}>
          Next
        </button>
      </div>
    </div>
  );
}

export default QuizGame;