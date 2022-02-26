import "./styles/App.css";
import quotes from "./data/quotes.js";
import React from "react";
import QuoteBox from "./components/QuoteBox";

function App() {
  const [quote, setQuote] = React.useState({
    id: "",
    text: "",
    author: "",
  });
  const [quoteCount, setQuoteCount] = React.useState(0);

  React.useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote({
      id: randomQuote._id,
      text: randomQuote.content,
      author: randomQuote.author,
    });
  }, [quoteCount]);

  function handleRegenerate() {
    setQuoteCount((prevCount) => prevCount + 1);
  }
  return (
    <main className="main-container">
      <div style={{ display: "grid", placeItems: "center" }}>
        <h1 id="page-title">Random Quote Machine</h1>
        <QuoteBox
          author={quote.author}
          quote={quote.text}
          handleRegenerate={handleRegenerate}
        />
      </div>
    </main>
  );
}

export default App;
