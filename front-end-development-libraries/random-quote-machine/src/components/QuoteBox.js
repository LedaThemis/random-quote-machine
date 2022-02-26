import React from "react";

export default function QuoteBox() {
  return (
    <div id="quote-box">
      <p id="text"></p>
      <p id="author"></p>
      <button id="new-quote">NEW</button>
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
