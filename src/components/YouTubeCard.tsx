import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import React from 'react';

export interface YouTubeCardProps extends BaseProps {
  url: string;
  videoId?: string;
  title?: string;
  channelName?: string;
}

const YouTubeCard: React.FC<YouTubeCardProps> = ({
  url,
  videoId: propVideoId,
  title = 'YouTube動画',
  channelName = 'YouTube',
  className,
  ...rest
}) => {
  const extractVideoId = (videoUrl: string): string | null => {
    const patterns = [
      /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = videoUrl.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const videoId = propVideoId || extractVideoId(url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

  return (
    <a
      className={clsx('youtube-link-card', className)}
      href={url}
      data-video-id={videoId}
      target="_blank"
      {...rest}
    >
      <div className="youtube-card-container">
        <div className="youtube-thumbnail">
          <img src={thumbnailUrl} alt="YouTube thumbnail" width="160" height="90" loading="lazy" />
          <div className="youtube-play-button">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"></path>
            </svg>
          </div>
          <div className="youtube-duration-badge">
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path>
            </svg>
          </div>
        </div>
        <div className="youtube-info">
          <h3 className="youtube-title" title={title}>
            {title}
          </h3>
          <div className="youtube-meta">
            <div className="youtube-channel">
              <svg width="16" height="16" fill="#FF0000" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
              </svg>
              <span className="youtube-channel-name">{channelName}</span>
            </div>
          </div>
          <div className="youtube-url">{url}</div>
        </div>
        <div className="youtube-external">
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
            <polyline points="15,3 21,3 21,9"></polyline>
            <line x1="10" x2="21" y1="14" y2="3"></line>
          </svg>
        </div>
      </div>
    </a>
  );
};

export default YouTubeCard;
