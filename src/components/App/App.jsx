import React, { Component } from 'react'
import ChallengeSection from '../ChallengeSection/ChallengeSection';
import Footer from '../Footer/Footer';
import Landing from '../Landing/Landing';
import Nav from '../Nav/Nav';
import './App.css';
import { SAMPLE_PARAGRAPHS } from './../../data/sampleParagraphs'

const TotalTime = 60;
const serviceUrl = "http://metaphorpsum.com/paragraphs/1/9";
const DefaultState = {
    selectedParagraph: "",
    timeStarted: false,
    timeRemaining: TotalTime,
    words: 0,
    characters: 0,
    wpm: 0,
    testInfo: []
};

class App extends Component {
    state = DefaultState;
    fetchNewParaFallback = () => {
        const data = SAMPLE_PARAGRAPHS[
            Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)
        ];
        const selectedParaArr = data.split("");
        const testInfo = selectedParaArr.map((selectedLetter) => {
            return {
                testLetter: selectedLetter,
                status: "notAttempted"
            };
        });

        this.setState({
            ...DefaultState,
            testInfo,
            selectedParagraph: data
        });
    }
    fetchNewData = () => {
        fetch(serviceUrl)
            .then(res => res.text())
            .then(data => {
                const selectedParaArr = data.split("");
                const testInfo = selectedParaArr.map((selectedLetter) => {
                    return {
                        testLetter: selectedLetter,
                        status: "notAttempted"
                    };
                });

                this.setState({
                    ...DefaultState,
                    testInfo,
                    selectedParagraph: data
                });
            });

    }
    componentDidMount() {
        this.fetchNewParaFallback();
    }

    startTimer = () => {
        this.setState({ timeStarted: true });
        const timer = setInterval(() => {
            if (this.state.timeRemaining > 0) {

                // Change the WPM
                const timeSpent = TotalTime - this.state.timeRemaining;
                const wpm = timeSpent > 0
                    ? (this.state.words / timeSpent) * TotalTime : 0;
                this.setState({
                    timeRemaining: this.state.timeRemaining - 1,
                    wpm: parseInt(wpm)
                })
            }
            else {
                clearInterval(timer);
            }
        }, 1000)
    }


    startAgain = () => {
        this.fetchNewParaFallback();
    }


    handleInputChange = (inputValue) => {
        if (!this.state.timeStarted) this.startTimer();
        /** 
         ** 1. Handle the underflow case - all the characters should be shown as not attempted
         ** 2. Handle the Overflow case - early exit
         ** 3. Handle the backspace case 
         **      - Mark the [index + 1] element as not attempted [irrespective of index is less than zero]
         **      - But, don't forget to check the overflow case here
         **  (index + 1) -> out of bounds, when index === length -1
         ** 4. Update the status in the test info
         **      - find out the last character in the inputValue  and it's index
         **      - check if the character at same index (state) matches or not
         **       - YES -> "correct"
         **       - NO -> "incorrect" 
         ** 5. Irrespective of the case -> characters, words, and speed (wpm) can be updated
        */
        const characters = inputValue.length;
        const words = inputValue.split(" ").length; //arr
        const index = characters - 1; //last character index

        //? Underflow case
        if (index < 0) {
            // ! Update the testInfo with first character as notAttempted
            this.setState({
                testInfo: [
                    {
                        testLetter: this.state.testInfo[0].testLetter,
                        status: "notAttempted"
                    },
                    ...this.state.testInfo.slice(1)
                ],
                characters,
                words
            });

            return;
        }

        //? Overflow case
        if (index >= this.state.selectedParagraph.length) {
            this.setState({ characters, words });
            return;
        }

        const testInfo = this.state.testInfo;
        if (!(index === this.state.selectedParagraph.length - 1)) {

            testInfo[index + 1].status = "notAttempted";
        }

        // check for the correct typed letter
        const isCorrect = inputValue[index] === testInfo[index].testLetter;

        // Update the testInfo status at current index
        testInfo[index].status = isCorrect ? "correct" : "incorrect";

        // Update the state 
        this.setState({
            testInfo,
            words,
            characters
        })

    };
    render() {
        return (
            <div className="app">
                <Nav />
                <Landing />
                <ChallengeSection
                    selectedParagraph={this.state.selectedParagraph}
                    words={this.state.words}
                    characters={this.state.characters}
                    wpm={this.state.wpm}
                    timeRemaining={this.state.timeRemaining}
                    timeStarted={this.state.timeStarted}
                    testInfo={this.state.testInfo}
                    handleInputChange={this.handleInputChange}
                    startAgain={this.startAgain}
                />
                <Footer />
            </div>
        )
    }
}

export default App;
