import React from "react";

import "../styles/QuoteBox.css";

export default function QuoteBox() {
  return (
    <div id="quote-box">
      <p id="text">
        Remember no one can make you feel inferior without your consent.
      </p>
      <p id="author">Eleanor Roosevelt</p>
      <button id="new-quote">
        Remember no one can make you feel inferior without your consent.
      </button>
      <a
        id="tweet-quote"
        href="https://twitter.com/intent/tweet"
        target="_blank"
        rel="noreferrer"
      >
        Tweet
      </a>
    </div>
  );
}
