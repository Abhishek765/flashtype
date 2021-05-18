import React from 'react'
import ChallengeDetailsCard from '../ChallengeDetailsCard/ChallengeDetailsCard';
import TypingChallenge from '../TypingChallenge/TypingChallenge';
import './TypingChallengeContainer.css'
const TypingChallengeContainer = ({ selectedParagraph,
    words,
    characters,
    wpm,
    timeRemaining,
    timeStarted,
    testInfo,
    handleInputChange }) => {
    return (
        <div className="typing-challenge-container">
            {/* Details section */}

            <div className="details-container">
                {/* words typed */}
                <ChallengeDetailsCard cardName="Words" cardValue={words} />

                {/* characters typed */}
                <ChallengeDetailsCard cardName="Characters" cardValue={characters} />

                {/* Speed */}
                <ChallengeDetailsCard cardName="Speed" cardValue={wpm} />
            </div>



            {/* The Real challenge  */}
            <div className="typewriter-container">
                <TypingChallenge
                    timeRemaining={timeRemaining}
                    timeStarted={timeStarted}
                    selectedParagraph={selectedParagraph}
                    testInfo={testInfo}
                    handleInputChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default TypingChallengeContainer;
