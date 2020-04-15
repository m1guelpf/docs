import React, { useState, useEffect, useRef } from 'react'
import { useAmp } from 'next/amp'
import cn from 'classnames'

export const GenericAvatar = React.memo(
  ({
    title,
    src,
    size,
    placeholder = false,
    className
  }: {
    title?: string
    src?: string
    size: number
    placeholder?: boolean
    className?: string
  }) => {
    const [ready, setReady] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)
    useEffect(() => {
      imgRef?.current?.complete && setReady(true)
    }, [])

    return (
      <span
        className={cn('geist-avatar', className)}
        key={src}
        style={{
          width: size,
          height: size
        }}
      >
        {placeholder ? null : (
          useAmp() ? (
            React.createElement('amp-img', { src, width: size, height: size, title, alt: title })
          ) : (
            <img
              ref={imgRef}
              key={src}
              alt={title}
              title={title}
              src={src}
              width={size}
              height={size}
              onLoad={() => setReady(true)}
              className={ready ? 'ready' : ''}
            />
          )
        )}
        <style jsx>
          {`
            .geist-avatar {
              flex-shrink: 0;
              border-radius: 100%;
              display: inline-block;
              overflow: hidden;
              border: 1px solid var(--accents-2);
              line-height: 0;
              vertical-align: top;
              mask-image: -webkit-radial-gradient(circle, white, black);
              -webkit-mask-image: -webkit-radial-gradient(circle, white, black);
              background: var(--geist-background);
              transition: border 0.2s ease, background 0.2s ease;
            }
            .geist-avatar img {
              width: 100%;
              height: 100%;
            }

            img {
              opacity: 0;
              transition: opacity 0.2s ease-in;
            }

            img.ready {
              opacity: 1;
            }
          `}
        </style>
      </span>
    )
  }
)

interface Props {
  title?: string
  size?: number
  height?: number | string
  boxSize?: number
  teamId?: string
  username?: string
  placeholder?: boolean
  seed?: string
  uid?: string
  hash?: string
  url?: string
  className?: string
}

export const Avatar: React.FC<Props> = React.memo(
  ({
    title,
    size = 80,
    height,
    boxSize = null,
    teamId = null,
    username = null,
    placeholder,
    seed,
    uid,
    hash,
    url,
    className
  }) => {
    const avatarSize = parseInt((height || boxSize || size) as string)

    if (placeholder) {
      if (seed) {
        return (
          <GenericAvatar
            size={avatarSize}
            title={title}
            src={`https://zeit.co/api/www/avatar?seed=${seed}`}
            className={className}
          />
        )
      }
      return (
        <GenericAvatar
          size={avatarSize}
          title={title}
          placeholder
          className={className}
        />
      )
    }
    let query
    const hasSHA = hash && /^[0-9a-f]{40}$/.test(hash)

    if (hasSHA) {
      query = hash
    } else {
      query =
        username != null
          ? `?u=${username}`
          : teamId != null
          ? `?teamId=${teamId}`
          : (uid ? uid : '') + '?'
    }

    const sizePrefix = hasSHA ? '?' : '&'
    const _url =
      url || `https://zeit.co/api/www/avatar/${query + sizePrefix}s=${size * 2}`

    return (
      <GenericAvatar
        size={avatarSize}
        title={title}
        src={_url}
        className={className}
      />
    )
  }
)

export default Avatar