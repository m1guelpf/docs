import React from 'react'
import Head from 'next/head'
import { useAmp } from 'next/amp'

const YouTube = ({ videoid, height, width }) => {
  const isAmp = useAmp()

  if (isAmp) {
    return (
      <>
        <Head>
          <script
            async
            key="amp-youtube"
            custom-element="amp-youtube"
            src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
          />
        </Head>
        <amp-youtube
          data-videoid={videoid}
          layout="responsive"
          width={width}
          height={height}
        />
      </>
    )
  } else {
    return (
      <div>
        <iframe
          width={width}
          height={height}
          src={`https://www.youtube-nocookie.com/embed/${videoid}?controls=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen
        />
        <style jsx>{`
          iframe {
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
          }
          div {
            padding-bottom: 62.5%;
            position: relative;
            margin: var(--geist-gap-double) 0;
          }
        `}</style>
      </div>
    )
  }
}

export default YouTube
