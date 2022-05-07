import './styles/App.css';
import React from 'react';
import QuoteBox from './components/QuoteBox';

function App() {
  const [quote, setQuote] = React.useState({
    id: '',
    text: '',
    author: '',
  });
  const [quoteCount, setQuoteCount] = React.useState(0);

  const getRandomQuote = async () => {
    const quoteData = await fetch('http://api.quotable.io/random');
    const { _id, content, author } = await quoteData.json();
    return { id: _id, text: content, author: author };
  };

  React.useEffect(() => {
    (async () => {
      const randomQuote = await getRandomQuote();
      setQuote({
        id: randomQuote.id,
        text: randomQuote.text,
        author: randomQuote.author,
      });
    })();
  }, [quoteCount]);

  function handleRegenerate() {
    setQuoteCount((prevCount) => prevCount + 1);
  }
  return (
    <main className="main-container">
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <h1 id="page-title">Random Quote Machine</h1>
        <QuoteBox author={quote.author} quote={quote.text} handleRegenerate={handleRegenerate} />
      </div>
    </main>
  );
}

export default App;
