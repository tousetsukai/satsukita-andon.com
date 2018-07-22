import React from 'react'

export default class Jumbotron extends React.Component {
  render() {
    const { images, interval } = this.props
    return (
      <div className="jumbotron">
        <ul>
          {images.map((url, i) =>
            // avoid styled-jsx limitation
            <li key={i} style={{backgroundImage: `url("${url}")`, animationDelay: `${interval * i}s`}} />
          )}
        </ul>
        <div className="jumbotron-gradient" />
        <style jsx>{`
@keyframes jumbotron-animation {
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
  }
  ${30 / images.length}% {
    opacity: 1;
    transform: scale(1.04);
    animation-timing-function: ease-out;
  }
  ${100 / images.length - 10 / images.length}% {
    opacity: 1;
    transform: scale(1.1);
  }
  ${100 / images.length + 10 / images.length}% {
    opacity: 0;
    transform: scale(1.1);
  }
  100% {
    opacity: 0;
  }
}

.jumbotron {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

li {
  background-size: cover;
  background-position: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  animation: jumbotron-animation ${images.length * interval}s linear infinite 0s;
}

.jumbotron-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
        `}</style>
      </div>
    )
  }
}
