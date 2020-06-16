import React, { Component } from 'react'
import Head from 'next/head'
import { useAmp } from 'next/amp'
import IObserver from '~/components/intersection-observer'
import PlayIcon from '~/components/icons/play'
import PauseIcon from '~/components/icons/pause'
import DragHandler from './drag-handler'

const AmpVideo = ({
  children,
  src,
  controls,
  loop,
  height,
  width,
  alt,
  poster
}) => {
  const isAmp = useAmp()

  if (isAmp)
    return (
      <>
        <Head>
          <script
            async
            key="amp-video"
            custom-element="amp-video"
            src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
          />
        </Head>
        <amp-video
          layout="responsive"
          {...{
            height,
            width,
            alt,
            src,
            loop,
            poster,
            controls,
            autoplay: ''
          }}
        />
      </>
    )
  return children
}

// This component is based off of the origin `Image` component and uses a lot of the same methods to handle widths and heights
class Video extends Component {
  constructor(props) {
    super(props)

    this.video = null
    this.setVideoRef = this.setVideoRef.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
  }

  state = {
    src: !this.props.lazy ? this.props.src : undefined,
    isPlayable: true,
    videoPlaying: false,
    videoLoaded: false,
    handlePosition: 0,
    isDragging: false
  }

  handleIntersect = entry => {
    if (entry.isIntersecting) {
      this.setState({ src: this.props.videoSrc || this.props.src })
    }
  }

  formatTime = time => {
    let m = Math.floor(time / 60)
    m = m >= 10 ? m : '0' + m
    time = Math.floor(time % 60)
    time = time >= 10 ? time : '0' + time
    return m + ':' + time
  }

  setVideoRef(element) {
    this.video = element

    let videoStatus = setInterval(() => {
      if (this.video && this.video.readyState >= 3) {
        this.setState({
          videoLoaded: true,
          videoAutoplay: this.video.autoplay,
          videoIsReady: true,
          videoDuration: this.video.duration
        })

        clearInterval(videoStatus)
      }
    })
  }

  handlePlay() {
    this.video.play()
    this.setState({
      videoPlaying: true
    })
  }

  handlePause() {
    this.video.pause()
    this.setState({
      videoPlaying: false
    })
  }

  handleProgress() {
    if (this.state.isDragging) {
      return
    }

    const time = this.video.currentTime
    this.setState({
      videoCurrentTime: time,
      handlePosition: (time / this.state.videoDuration) * 100
    })
  }

  handleDragStart = () => {
    if (this.video) {
      this.setState({ isDragging: true })
    }
  }

  handleDrag = progress => {
    if (this.video) {
      this.setState({ handlePosition: progress * 100 })
    }
  }

  handleDragEnd = progress => {
    if (this.video) {
      this.video.currentTime = this.state.videoDuration * progress
      this.setState({ isDragging: false })
    }
  }

  render() {
    const {
      width = 600,
      margin = 40,
      loop = true,
      height,
      caption,
      captionSpacing = null,
      borderRadius = false,
      controls = true,
      playsInline = true,
      oversize = true,
      lazy = true,
      muted = true,
      autoPlay = true,
      preload = 'auto'
    } = this.props

    const aspectRatio = String((height / width) * 100) + '%'
    const classes = width > 650 && oversize ? 'oversize' : ''

    return (
      <AmpVideo {...this.props}>
        <IObserver
          once
          onIntersect={this.handleIntersect}
          rootMargin="20%"
          disabled={!lazy}
        >
          <figure className={classes}>
            <main style={{ width }}>
              <div className="container" style={{ paddingBottom: aspectRatio }}>
                {this.state.src ? (
                  <>
                    <video
                      src={this.state.src}
                      muted={muted}
                      autoPlay={autoPlay}
                      loop={loop}
                      ref={this.setVideoRef}
                      preload={preload}
                      onClick={() =>
                        this.video &&
                        (this.video.paused
                          ? this.video.play()
                          : this.video.pause())
                      }
                      onPlay={() => this.handlePlay()}
                      onPause={() => this.handlePause()}
                      onTimeUpdate={() => this.handleProgress()}
                      playsInline={playsInline}
                    />
                    {controls && this.state.videoLoaded && (
                      <div className="video-controls">
                        {this.state.videoPlaying ? (
                          <button
                            className="play-button paused"
                            type="button"
                            onClick={() => this.handlePause()}
                          >
                            <PauseIcon />
                          </button>
                        ) : (
                          <button
                            className="play-button"
                            type="button"
                            onClick={() => this.handlePlay()}
                          >
                            <PlayIcon />
                          </button>
                        )}
                        <div className="time current-time">
                          {this.formatTime(this.state.videoCurrentTime)}
                        </div>
                        <div className="progress">
                          <DragHandler
                            onDragStart={this.handleDragStart}
                            onDrag={this.handleDrag}
                            onDragEnd={this.handleDragEnd}
                          />
                          <progress
                            ref={this.progress}
                            value={this.state.handlePosition}
                            min={0}
                            max={100}
                          />
                          <div
                            className="handle"
                            style={{ left: `${this.state.handlePosition}%` }}
                          />
                        </div>
                        <div className="time total-time">
                          {this.formatTime(this.state.videoDuration)}
                        </div>
                      </div>
                    )}
                  </>
                ) : null}
              </div>

              {caption && (
                <p style={captionSpacing ? { marginTop: captionSpacing } : {}}>
                  {caption}
                </p>
              )}
            </main>

            <style jsx>{`
              figure {
                display: block;
                text-align: center;
                margin: ${margin}px 0;
              }

              main {
                margin: 0 auto;
                max-width: 100%;
              }

              div {
                position: relative;
              }

              video {
                height: 100%;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
                cursor: pointer;
                ${borderRadius ? `border-radius: 5px;` : null};
              }

              .container {
                display: flex;
                justify-content: center;
              }

              p {
                color: #999;
                font-size: 12px;
                margin: 0;
                text-align: center;
              }

              .video-controls {
                position: absolute;
                bottom: 5%;
                background: white;
                height: 40px;
                display: flex;
                width: 85%;
                padding: 0 8px;
                opacity: 0;
                transform: translateY(6px) scale(0.97);
                transition: all 0.2s cubic-bezier(0.25, 0.57, 0.45, 0.94);
              }

              .container:hover .video-controls {
                opacity: 1;
                transform: translateY(0) scale(1);
                box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.12);
              }

              .container:hover .video-controls {
                display: flex;
              }

              .play-button {
                background: transparent;
                border: 0;
                height: 40px;
                width: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                outline: 0;
                cursor: pointer;
                flex: 0 0 40px;
                padding: 0;
              }

              .video-controls .progress {
                position: relative;
                display: flex;
                align-items: center;
                flex: 1 0 auto;
              }

              .video-controls progress {
                background-color: #ccc;
                height: 2px;
                width: 100%;
                position: absolute;
                top: calc(50% - 1px);
                left: 0;
                pointer-events: none;
              }

              .video-controls progress[value]::-webkit-progress-bar {
                background-color: #ccc;
              }

              .video-controls progress[value]::-webkit-progress-value {
                background-color: black;
              }

              .video-controls .progress .handle {
                position: absolute;
                width: 2px;
                height: 12px;
                background: black;
                transform: scale(1);
                transition: transform 0.2s;
                top: calc(50% - 6px);
                pointer-events: none;
              }

              .video-controls .time {
                font-size: 12px;
                font-weight: 600;
                line-height: 40px;
                padding: 0 12px;
                flex: 0 0 auto;
                width: 60px;
              }

              .play-button + .time {
                padding-left: 0;
              }

              @media (max-width: 992px) {
                .container .video-controls {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }

              @media (min-width: 992px) {
                figure.oversize {
                  width: ${width}px;
                  margin: ${margin}px 0 ${margin}px
                    calc(((${width}px - 768px) / 2) * -1);
                }
              }
            `}</style>
          </figure>
        </IObserver>
      </AmpVideo>
    )
  }
}

export default Video
