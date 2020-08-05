import React, { Component } from 'react'
import { useAmp } from 'next/amp'
import PropTypes from 'prop-types'
import IObserver from '~/components/intersection-observer'
import cn from 'classnames'

import VideoComponent from './video'

// This component might look a little complex
// because one could argue that keeping the aspect ratio
// of an image can be solved with `height: auto`,
// but it's actually not that easy if you want to prevent
// element flickering

// Because if you want to do that, you need to set the aspect
// ratio of the image's container BEFORE the image loads

const AmpImg = ({
  children,
  src,
  srcSet,
  height,
  width,
  alt,
  title,
  margin,
  layout = 'responsive'
}) => {
  const isAmp = useAmp()

  const hasDimension = typeof width === 'number' && typeof height === 'number'

  if (isAmp)
    return hasDimension ? (
      <amp-img
        layout={layout}
        {...{ src, srcSet, height, width, alt, title }}
      />
    ) : (
      <div className="amp-img-fixed-container">
        <amp-img layout="fill" {...{ src, srcSet, alt, title }} />
        <style jsx>{`
          .amp-img-fixed-container {
            width: 100%;
            height: 200px;
            position: relative;
            margin: ${margin}px 0;
          }

          .amp-img-fixed-container amp-img :global(img),
          .amp-img-fixed-container amp-img {
            object-fit: contain;
          }
        `}</style>
      </div>
    )
  return children
}

class Image extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    lazy: true
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  }

  state = {
    src: !this.props.lazy ? this.props.videoSrc || this.props.src : undefined
  }

  handleIntersect = entry => {
    if (entry.isIntersecting) {
      this.setState({ src: this.props.src })
    }
  }

  render() {
    const {
      caption,
      height,
      lazy,
      margin = 40,
      video = false,
      videoSrc,
      width,
      captionSpacing = null,
      oversize = false,
      borderRadius = false,
      children,
      shadow,
      align = 'center',
      layout,
      title,
      alt
    } = this.props

    const hasDimension = typeof width === 'number' && typeof height === 'number'

    const aspectRatio = hasDimension
      ? String((height / width) * 100) + '%'
      : undefined
    const classes =
      width > 768 && oversize ? 'oversize' : !hasDimension ? 'contained' : ''

    if (video || videoSrc) {
      return <VideoComponent src={videoSrc} {...this.props} />
    }

    return (
      <AmpImg
        layout={layout}
        {...this.props}
        width={hasDimension ? width : undefined}
        height={hasDimension ? height : undefined}
        margin={margin}
      >
        <IObserver
          once
          onIntersect={this.handleIntersect}
          rootMargin="20%"
          disabled={!lazy}
        >
          <figure className={cn(classes, { 'has-shadow': shadow })}>
            <main style={{ width: hasDimension ? width : undefined }}>
              <div className="container" style={{ paddingBottom: aspectRatio }}>
                {this.state.src ? (
                  <img
                    src={this.state.src || null}
                    width={hasDimension ? width : undefined}
                    height={hasDimension ? height : undefined}
                    title={title}
                    alt={alt}
                  />
                ) : (
                  children
                )}
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
              }

              main {
                max-width: 100%;
              }

              div {
                position: relative;
              }

              img {
                height: 100%;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
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

              .has-shadow + :global(.caption) {
                margin: 0 0 40px;
              }
            `}</style>
            <style jsx>{`
              figure {
                margin: ${margin}px 0;
                text-align: ${align};
              }

              main {
                ${align === 'center'
                  ? 'margin: 0 auto'
                  : align === 'right'
                  ? 'margin-left: auto'
                  : 'margin: 0'};
              }

              img {
                ${borderRadius || shadow ? `border-radius: 5px;` : ''};
                ${shadow ? `box-shadow: var(--shadow-large)` : ''};
              }

              @media (min-width: 992px) {
                figure.oversize {
                  width: ${width}px;
                  margin: ${margin}px 0 ${margin}px
                    calc(((${width}px - 768px) / 2) * -1);
                }
              }

              figure.contained {
              }

              figure.contained main .container {
              }

              figure.contained main .container img {
                position: relative;
                height: auto;
              }
            `}</style>
          </figure>
        </IObserver>
      </AmpImg>
    )
  }
}

export const Video = props => <Image {...props} video />

export default Image
