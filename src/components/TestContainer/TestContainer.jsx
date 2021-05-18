import React from 'react';
import TryAgain from '../TryAgain/TryAgain';
import TypingChallengeContainer from '../TypingChallengeContainer/TypingChallengeContainer';
import './TestContainer.css';
const TestContainer = ({ selectedParagraph,
    words,
    characters,
    wpm,
    timeRemaining,
    timeStarted,
    testInfo,
    handleInputChange,
    startAgain }) => {

    return (
        <div className="test-container">

            {
                timeRemaining > 0 ? (

                    <div data-aos="fade-up" className="typing-challenge-cont">
                        <TypingChallengeContainer
                            selectedParagraph={selectedParagraph}
                            words={words}
                            characters={characters}
                            wpm={wpm}
                            timeRemaining={timeRemaining}
                            timeStarted={timeStarted}
                            testInfo={testInfo}
                            handleInputChange={handleInputChange}
                        />
                    </div>
                ) : (
                    <div className="try-again-container">
                        <TryAgain
                            words={words} characters={characters} wpm={wpm}
                            startAgain={startAgain}
                        />
                    </div>
                )
            }


        </div>
    )
}

export default TestContainer;
