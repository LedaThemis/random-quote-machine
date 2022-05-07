import './styles/App.css';
import React from 'react';
import QuoteBox from './components/QuoteBox';
import LoadingOverlay from 'react-loading-overlay';

function App() {
  const [quote, setQuote] = React.useState({
    id: '',
    text: '',
    author: '',
  });
  const [quoteCount, setQuoteCount] = React.useState(0);
  const [isFetchingQuote, setIsFetchingQuote] = React.useState(false);

  const getRandomQuote = async () => {
    const quoteData = await fetch('https://api.quotable.io/random');
    const { _id, content, author } = await quoteData.json();
    return { id: _id, text: content, author: author };
  };

  React.useEffect(() => {
    (async () => {
      setIsFetchingQuote(true);
      const randomQuote = await getRandomQuote();
      setQuote({
        id: randomQuote.id,
        text: randomQuote.text,
        author: randomQuote.author,
      });
      setIsFetchingQuote(false);
    })();
  }, [quoteCount]);

  function handleRegenerate() {
    setQuoteCount((prevCount) => prevCount + 1);
  }
  return (
    <main className="main-container">
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <h1 id="page-title">Random Quote Machine</h1>
        <LoadingOverlay active={isFetchingQuote} spinner fadeSpeed={250}>
          <QuoteBox author={quote.author} quote={quote.text} handleRegenerate={handleRegenerate} />
        </LoadingOverlay>
      </div>
    </main>
  );
}

export default App;
