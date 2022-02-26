import "./styles/App.css";
import React from "react";
import QuoteBox from "./components/QuoteBox";

function App() {
  const [quote, setQuote] = React.useState({
    id: "",
    text: "",
    author: "",
  });
  const [quoteCount, setQuoteCount] = React.useState(0);

  React.useEffect(
    () =>
      fetch("http://api.quotable.io/random")
        .then((res) => res.json())
        .then((x) =>
          setQuote({
            id: x._id,
            text: x.content,
            author: x.author,
          })
        ),
    [quoteCount]
  );

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
