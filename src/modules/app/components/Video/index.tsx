import { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

export interface VideoProps {
  src: string
  active: boolean
  autoplay?: boolean
  poster?: string
  width?: string
  height?: string
}

export const Video = ({
  src,
  active,
  autoplay = false,
  poster,
  width,
  height,
}: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>()
  const [videoPlaying, setVideoPlaying] = useState(false)
  const intl = useIntl()

  useEffect(() => {
    if (active && videoPlaying) {
      videoRef.current?.play()
    } else {
      videoRef.current?.pause()
    }
  }, [active, videoPlaying])

  const onPlay = () => {
    //add analytics tracking in here if needed
    setVideoPlaying(true)
  }

  return (
    <video
      ref={videoRef as any}
      controls
      autoPlay={autoplay}
      src={src}
      poster={poster}
      style={{
        objectFit: 'fill',
        height: height,
        width: width,
        cursor: 'pointer',
      }}
      onPlay={onPlay}
      onPause={() => setVideoPlaying(false)}
    >
      {intl.formatMessage({ id: 'productDetailsPage.videoUnavailable' })}
    </video>
  )
}
