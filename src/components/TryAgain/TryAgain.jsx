import React from 'react'
import './TryAgain.css'
const TryAgain = ({
    words,
    characters,
    wpm,
    startAgain
}) => {
    return (
        <div className="tryAgain-container">
            <h1>Test results</h1>
            <div className="result-container">
                <p>
                    <b>
                        Characters:
                    </b> {characters}
                </p>
                <p>
                    <b>
                        words:
                    </b> {words}
                </p>
                <p>
                    <b>
                        wpm:
                    </b> {wpm} wpm
                </p>

            </div>
            <div>
                <button onClick={() => startAgain()} className="end-btn start-again-btn">
                    Re-try
                </button>
                <button
                    onClick={() => {
                        window.open("https://www.facebook.com/sharer/sharer.php?u=abhishek765.github.io", "facebook-share-dialog", "width=800,height=600")
                    }}
                    className="end-btn share-btn">
                    Share
                </button>
                <button
                    onClick={() => {
                        window.open("https://twitter.com/intent/tweet?text=abhishek765.github.io", "Twitter-share-dialog", "width=800,height=600")
                    }}
                    className="end-btn tweet-btn">
                    Tweet
                </button>
            </div>
        </div>
    )
}

export default TryAgain;
