
import React from 'react';

const VideoPlayer = () => {
  return (
    <div className="mb-12">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden border-4 border-bat-yellow/30 bg-gradient-to-br from-gotham-gray/20 to-gotham-black/40 p-2">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gotham-black">
            <iframe
              src="https://www.youtube.com/embed/TsLEolNcXug?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=TsLEolNcXug&vq=hd1080"
              title="Batcoin Introduction"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gotham-black/20 via-transparent to-gotham-black/20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
