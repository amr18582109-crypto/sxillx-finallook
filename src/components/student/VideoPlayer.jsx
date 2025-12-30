import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Button from '../shared/Button';

const VideoPlayer = ({ task, onComplete }) => {
  const [watched, setWatched] = useState(false);

  // Extract YouTube playlist ID from URL
  const getYouTubePlaylistId = (url) => {
    if (!url) return null;
    // Match playlist URL format: https://www.youtube.com/playlist?list=PLAYLIST_ID
    const playlistMatch = url.match(/[?&]list=([^#&?]*)/);
    if (playlistMatch && playlistMatch[1]) {
      return playlistMatch[1];
    }
    return null;
  };

  // Extract YouTube video ID from URL (for backward compatibility)
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const playlistId = task.youtubeUrl ? getYouTubePlaylistId(task.youtubeUrl) : null;
  const videoId = task.youtubeUrl && !playlistId ? getYouTubeVideoId(task.youtubeUrl) : null;
  
  // Use playlist embed if playlist ID exists, otherwise use single video
  const embedUrl = playlistId 
    ? `https://www.youtube.com/embed/videoseries?list=${playlistId}`
    : videoId 
    ? `https://www.youtube.com/embed/${videoId}`
    : null;

  // Get playlist title based on task
  const getPlaylistTitle = () => {
    if (task.id === 'html_basics') return 'HTML Complete Course - Osama Elzero';
    if (task.id === 'css_fundamentals') return 'CSS Complete Course - Osama Elzero';
    if (task.id === 'js_basics') return 'JavaScript Complete Course - Osama Elzero';
    if (task.id === 'git_github') return 'Git & GitHub Complete Course - Osama Elzero';
    if (task.id === 'react_intro') return 'React Complete Course - Osama Elzero';
    return `${task.title} - Osama Elzero`;
  };

  const handleComplete = () => {
    setWatched(true);
    onComplete();
  };

  return (
    <div className="space-y-4">
      {embedUrl ? (
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {playlistId ? getPlaylistTitle() : task.title}
            </h3>
            {playlistId && (
              <p className="text-sm text-gray-600">
                Complete playlist with all lessons. Navigate between videos using the playlist sidebar.
              </p>
            )}
          </div>
          <iframe
            width="100%"
            height="500"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video rounded-lg"
            title={playlistId ? getPlaylistTitle() : task.title}
          ></iframe>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">📹</div>
            <p className="text-xl font-semibold">{task.title}</p>
            <p className="text-sm opacity-75 mt-2">Video Content</p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-blue-500" />
          <div>
            <p className="font-semibold text-blue-800">Ready to mark as complete?</p>
            <p className="text-sm text-blue-600">
              {playlistId 
                ? 'Watch the playlist and click the button when you\'re done.' 
                : 'Watch the video and click the button when you\'re done.'}
            </p>
          </div>
        </div>
        <Button onClick={handleComplete} variant="primary">
          Mark as Complete
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayer;


