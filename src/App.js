import React from 'react';
import './App.css';
import Duration from './Duration';
import Timer from './Timer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 1500,
      breakTime: 300
    }

    this.breakTime =  300;
    this.pomodoroStarted = false;
    this.breakStarted = false;
    this.isPaused = false;
    this.audio = new Audio("https://dl.dropbox.com/s/nacdk0xey4io5d8/wink-sound-effect.mp3")
  }
  
  stopTimer = timer => {
    clearInterval(timer);
    timer = null;
  }

  handleStart = () => {
    if (!this.pomodoroStarted) {
      this.timer = setInterval(() => {
        this.setState({ time: this.state.time - 1});
      }, 1000);
      this.pomodoroStarted = !this.pomodoroStarted;
    }

    if (!this.time) {
      this.time = this.state.time;
      this.breakTime = this.state.breakTime;
    }
  }

  handlePause = () => {
    if (this.pomodoroStarted) {
      this.isPaused = true;
      this.setState(this.state);
      if (!this.breakStarted) {
        this.stopTimer(this.timer);
      }

      if (this.breakStarted) {
        this.stopTimer(this.breakTimer)
      }
    }
  }

  handleResume = () => {
    if (this.pomodoroStarted) {
      this.setState(this.state)
      this.isPaused = false;

      if (!this.breakStarted) {
        this.timer = setInterval(() => {
          this.setState({ time: this.state.time - 1 })
        }, 1000);
      }

      if (this.breakStarted) {
        this.breakTimer = setInterval(() => {
          this.setState({ breakTime: this.state.breakTime - 1 })
        }, 1000);
      }
    }
  }

  handleReset = () => {
    this.setState({
      time: 1500,
      breakTime: 300
    })
    this.stopTimer(this.timer);
    this.pomodoroStarted = false;
    this.stopTimer(this.breakTimer);
    this.breakStarted = false;
    this.isPaused = false;
  }

  calculateTime = time => {
    return `${Math.floor(time / 60)} : ${time % 60 > 9 ? "" + time % 60 : "0" + time % 60}`;
  }

  increaseTime = () => {
    if (!this.pomodoroStarted && this.state.time !== 3600) {
      this.setState({ time: this.state.time + 60})
    }
    console.log('increase session time')
  }

  increaseBreakTime = () => {
    if (!this.pomodoroStarted && this.breakTime !== 1800) {
      this.breakTime = this.breakTime + 60;
      this.setState({ breakTime: this.state.breakTime + 60})
    }
    console.log('increase break time')
  }

  decreaseTime = () => {
    if (this.state.time > 60 && !this.pomodoroStarted) {
      this.setState({ time: this.state.time - 60 })
    }
    console.log('decrease session time')
  }

  decreaseBreakTime = () => {
    if (this.breakTime > 60) {
      this.breakTime = this.breakTime - 60;
    }

    if (this.state.breakTime > 60 && !this.pomodoroStarted) {
      this.setState({ breakTime: this.state.breakTime - 60 })
    }
    console.log('decrease break time')
  }

  componentDidUpdate() {
    if (this.state.time < 1) {
      this.audio.play();
      this.stopTimer(this.timer);
      
      this.setState({ time: this.time });
      if (!this.breakStarted) {
        this.startBreak();
        this.breakStarted = true;
      }
    }

    if (this.state.breakTime < 1) {
      this.audio.play();
      this.stopTimer(this.breakTimer);

      this.setState({ breakTime: this.breakTime });
      this.pomodoroStarted = false;
      this.breakStarted = false;
      this.handleStart();
    }
  }

  startBreak() {
    this.breakTimer = setInterval(() => {
      this.setState({ breakTime: this.state.breakTime - 1 })
    }, 1000);
  }


  render() {
    return (
      <div className="App container text-center">
        <h1>Pomodoro Clock</h1>

        <Duration
          sessionLabel="Session Length"
          increaseTime={this.increaseTime}
          decreaseTime={this.decreaseTime}
          sessionLength={
            this.breakStarted
              ? this.calculateTime(this.state.breakTime)
              : this.calculateTime(this.state.time)
          }
          breakLabel="Break Length"
          increaseBreakTime={this.increaseBreakTime}
          decreaseBreakTime={this.decreaseBreakTime}
          breakLength={
            this.breakStarted
              ? this.calculateTime(this.state.time)
              : this.calculateTime(this.state.breakTime)
          }
        />

        <Timer
          handleStart={this.handleStart}
          pauseBtn={this.isPaused ? this.handleResume : this.handlePause}
          condition={this.isPaused ? "Resume" : "Pause"}
          handleReset={this.handleReset}
        />

        <p className="github">
          <small>by:</small> Milos Rancic
          <a
            href="https://github.com/milosrancic"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" />
          </a>
        </p>

      </div>
    );
  }
}

export default App;
