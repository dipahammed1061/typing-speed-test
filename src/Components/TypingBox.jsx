import { Dialog, DialogTitle } from "@material-ui/core";
import { wordsList } from "random-words";
import React, {
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";
import UpperMenu from "./UpperMenu";
import EncouragementToast from "./EncouragementToast";
var randomWords = require("random-words");

const WPM_MILESTONES = [
  { wpm: 20,  emoji: '💻', text: "You're typing!"       },
  { wpm: 35,  emoji: '⚡', text: 'Speed building!'      },
  { wpm: 50,  emoji: '🚀', text: 'Halfway to pro!'      },
  { wpm: 70,  emoji: '🔥', text: "That's fast!"         },
  { wpm: 90,  emoji: '🏆', text: 'Almost pro level!'    },
  { wpm: 110, emoji: '⚡', text: 'Speed demon!'         },
];

const STREAK_MILESTONES = [
  { count: 10, emoji: '🎯', text: 'Nice streak!'      },
  { count: 20, emoji: '✨', text: 'Flawless!'          },
  { count: 30, emoji: '🎵', text: 'Perfect rhythm!'   },
  { count: 50, emoji: '💪', text: 'Unstoppable!'      },
];

const TypingBox = () => {
  // in react you get a hook , useRef()
  // react also provides a function, createRef()

  const { testSeconds, testWords, testMode } = useTestMode();
  const [initialRender, setInitialRender] = useState(false);  
  const [words, setWords] = useState(() => {
    if (testMode === "word") {
      return randomWords(testWords);
    }
    return randomWords(300);
  });

//   const words = useMemo(() => {
//     return wordsArray;
//   }, [wordsArray]);

  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [countDown, setCountDown] = useState(() => {
    if (testMode === "word") {
      return 180;
    }

    return testSeconds;
  });
  const [testTime, setTestTime] = useState(() => {
    if (testMode === "word") {
      return 180;
    }

    return testSeconds;
  });
  const [correctChars, setCorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectChars, setIncorrectChar] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [open, setOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const wpmMilestonesHit = useRef(new Set());
  const correctStreak = useRef(0);
  const toastQueue = useRef([]);
  const processingToast = useRef(false);

  // Drains the queue one toast at a time, 900 ms apart
  const processQueue = useCallback(() => {
    if (toastQueue.current.length === 0) {
      processingToast.current = false;
      return;
    }
    processingToast.current = true;
    const { emoji, text } = toastQueue.current.shift();
    const id = Date.now() + Math.random();
    // Random position across the blank space (% values fed to CSS left/top)
    const x = 8 + Math.random() * 66;   // 8 % – 74 % from left
    const y = 10 + Math.random() * 55;  // 10 % – 65 % from top
    setToasts((prev) => [...prev.slice(-4), { id, emoji, text, x, y }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2700);
    setTimeout(processQueue, 900); // next toast after 900 ms
  }, []);

  const addToast = useCallback((emoji, text) => {
    toastQueue.current.push({ emoji, text });
    if (!processingToast.current) {
      processQueue();
    }
  }, [processQueue]);

  const emptySpans = ()=>{
    return Array(words.length)
    .fill(0)
    .map((i) => createRef(null));
  }
  const inputRef = useRef(null);
  const [wordSpanRef, setWordSpanRef] = useState(emptySpans());

  const resetTest = () => {
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTestStart(false);
    setTestEnd(false);
    clearInterval(intervalId);
    setToasts([]);
    toastQueue.current = [];
    processingToast.current = false;
    wpmMilestonesHit.current = new Set();
    correctStreak.current = 0;

    if (testMode === "word") {
      const newWords = randomWords(testWords);
      setWords(newWords);
      setWordSpanRef(Array(newWords.length).fill(0).map(() => createRef(null)));
      setCountDown(180);
      setTestTime(180);
    } else {
      const newWords = randomWords(300);
      setWords(newWords);
      setWordSpanRef(Array(newWords.length).fill(0).map(() => createRef(null)));
      setCountDown(testSeconds);
      setTestTime(testSeconds);
    }
    setGraphData([]);
    setCorrectChars(0);
    setCorrectWords(0);
    setExtraChars(0);
    setIncorrectChar(0);
    setMissedChars(0);
    resetWordSpanRefClassname();
    focusInput();
  };

  const redoTest = () => {
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTestStart(false);
    setTestEnd(false);
    clearInterval(intervalId);
    setToasts([]);
    toastQueue.current = [];
    processingToast.current = false;
    wpmMilestonesHit.current = new Set();
    correctStreak.current = 0;
    if (testMode === "word") {
      setCountDown(180);
      setTestTime(180);
    } else {
      setCountDown(testSeconds);
      setTestTime(testSeconds);
    }
    setGraphData([]);
    setCorrectChars(0);
    setCorrectWords(0);
    setExtraChars(0);
    setIncorrectChar(0);
    setMissedChars(0);
    resetWordSpanRefClassname();
    focusInput();
  };


  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
    function timer() {
      // console.log("timer function is working");
      setCountDown((prevCountDown) => {
        setCorrectChars((correctChars) => {
          // console.log("correct chars",correctChars);
          setGraphData((data) => {
            return [
              ...data,
              [
                testTime - prevCountDown,
                Math.round(
                  correctChars / 5 / ((testTime - prevCountDown + 1) / 60)
                ),
              ],
            ];
          });
          return correctChars;
        });

        if (prevCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return prevCountDown - 1;
      });
    }
  };

  // Fire encouragement when live WPM crosses a milestone
  useEffect(() => {
    if (graphData.length === 0 || !testStart) return;
    const currentWPM = graphData[graphData.length - 1][1];
    WPM_MILESTONES.forEach((m) => {
      if (currentWPM >= m.wpm && !wpmMilestonesHit.current.has(m.wpm)) {
        wpmMilestonesHit.current.add(m.wpm);
        addToast(m.emoji, m.text);
      }
    });
  }, [graphData]);

  const handleKeyDown = (e) => {
    console.log(e);
    if (e.keyCode === 9) {
      if (testStart) {
        clearInterval(intervalId);
      }
      e.preventDefault();
      setOpen(true);
      return;
    }

    let allChildSpans = wordSpanRef[currWordIndex].current.childNodes;

    if (e.keyCode !== 8 && e.key.length > 1) {
      e.preventDefault();
      return;
    }

    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    //logic for space press -> increase my currWordIndex by 1
    if (e.keyCode === 32) {
      if (currWordIndex === words.length - 1) {
        clearInterval(intervalId);
        setCurrWordIndex(currWordIndex + 1);
        setTestEnd(true);
        return;
      }

      const correctChars =
        wordSpanRef[currWordIndex].current.querySelectorAll(".correct");

      if (correctChars.length === allChildSpans.length) {
        setCorrectWords(correctWords + 1);
      }
      //removing cursor
      if (allChildSpans.length <= currCharIndex) {
        //cursor present as a right one
        allChildSpans[currCharIndex - 1].classList.remove("right-current");
      } else {
        //cursor in between
        setMissedChars(missedChars + (allChildSpans.length - currCharIndex));
        for (let i = currCharIndex; i < allChildSpans.length; i++) {
          allChildSpans[i].className += " skipped";
        }
        allChildSpans[currCharIndex].className = allChildSpans[
          currCharIndex
        ].className.replace("current", "");
      }

      //scrollinig line condition
      if (
        wordSpanRef[currWordIndex + 1].current.offsetLeft <
        wordSpanRef[currWordIndex].current.offsetLeft
      ) {
        wordSpanRef[currWordIndex].current.scrollIntoView();
      }

      wordSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "char current";
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);

      return;
    }

    //logic for backspace
    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        if (currCharIndex === allChildSpans.length) {
          if (allChildSpans[currCharIndex - 1].className.includes("extra")) {
            allChildSpans[currCharIndex - 1].remove();
            allChildSpans[currCharIndex - 2].className += " right-current";
          } else {
            allChildSpans[currCharIndex - 1].className = "char current";
          }

          setCurrCharIndex(currCharIndex - 1);
          return;
        }

        allChildSpans[currCharIndex].className = "char";
        allChildSpans[currCharIndex - 1].className = "char current";
        setCurrCharIndex(currCharIndex - 1);
      }

      return;
    }

    if (currCharIndex === allChildSpans.length) {
      //add new extra characters

      setExtraChars(extraChars + 1);
      let newSpan = document.createElement("span"); // -> <span></span>
      newSpan.innerText = e.key;
      newSpan.className = "char incorrect extra right-current";
      allChildSpans[currCharIndex - 1].classList.remove("right-current");
      wordSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      return;
    }

    if (e.key === allChildSpans[currCharIndex].innerText) {
      allChildSpans[currCharIndex].className = "char correct";
      setCorrectChars(correctChars + 1);

      // Streak milestone check
      correctStreak.current += 1;
      const streakHit = STREAK_MILESTONES.find(
        (m) => m.count === correctStreak.current
      );
      if (streakHit) addToast(streakHit.emoji, streakHit.text);

      if (
        currWordIndex === words.length - 1 &&
        currCharIndex === allChildSpans.length - 1
      ) {
        clearInterval(intervalId);
        setCurrWordIndex(currWordIndex + 1);
        setTestEnd(true);
        return;
      }
    } else {
      allChildSpans[currCharIndex].className = "char incorrect";
      setIncorrectChar(incorrectChars + 1);
      correctStreak.current = 0; // break the streak on any error
    }
    if (currCharIndex + 1 === allChildSpans.length) {
      allChildSpans[currCharIndex].className += " right-current";
    } else {
      allChildSpans[currCharIndex + 1].className = "char current";
    }

    setCurrCharIndex(currCharIndex + 1);
  };

  const handleDialogBoxEvents = (e) => {
    if (e.keyCode === 32) {
      //logic for redo game
      e.preventDefault();
      redoTest();
      setOpen(false);
      return;
    }
    if (e.keyCode === 9 || e.keyCode === 13) {
      //logic for reset game
      e.preventDefault();
      resetTest();
      setOpen(false);
      return;
    }

    e.preventDefault();
    setOpen(false);
    startTimer();
  };

  const resetWordSpanRefClassname = () => {
    wordSpanRef.forEach((ref) => {
      if (!ref.current) return;
      Array.from(ref.current.childNodes).forEach((j) => {
        if (j.className.includes("extra")) {
          j.remove();
        }
        j.className = "char";
      });
    });
    if (wordSpanRef[0]?.current?.childNodes?.[0]) {
      wordSpanRef[0].current.childNodes[0].className = "char current";
    }
  };

  const calculateWPM = () => {
    return Math.round(
      correctChars / 5 / ((graphData[graphData.length - 1][0] + 1) / 60)
    );
  };

  const calculateAccuracy = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    focusInput();
    wordSpanRef[0].current.childNodes[0].className = "char current";
  }, []);

  useLayoutEffect(() => {
    if(initialRender){
        console.log("running");
        resetTest();
    }
    else{
        setInitialRender(true);
    }
   
  }, [testSeconds, testWords, testMode]);

  return (
    <div>
      <EncouragementToast toasts={toasts} />
      <UpperMenu countDown={countDown} currWordIndex={currWordIndex} />
      {testEnd ? (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAccuracy()}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          missedChars={missedChars}
          extraChars={extraChars}
          graphData={graphData}
          resetTest={resetTest}
        />
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {words.map((word, index) => (
              <span className="word" ref={wordSpanRef[index]}>
                {word.split("").map((char, ind) => (
                  <span className="char">{char}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}

      <input
        type="text"
        className="hidden-input"
        ref={inputRef}
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <Dialog
        open={open}
        style={{
          backdropFilter: "blur(2px)",
        }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        onKeyDown={handleDialogBoxEvents}
      >
        <DialogTitle>
          <div className="instruction">press SPACE to redo</div>
          <div className="instruction">press TAB/ENTER to restart</div>
          <div className="instruction">press any other key to exit</div>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default TypingBox;
