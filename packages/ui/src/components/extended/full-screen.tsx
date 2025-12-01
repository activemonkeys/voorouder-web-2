// packages/ui/src/components/extended/full-screen.tsx
'use client';

import React from 'react';

import {cn} from '@workspace/ui/lib/utils';
import {buttonVariants} from '../shadcn/button';
import {Icons} from './icons';

class FullScreen extends React.Component {
  toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // enter fullscreen mode
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if ((document.documentElement as any).mozRequestFullScreen) {
        /* Firefox */
        (document.documentElement as any).mozRequestFullScreen();
      } else if ((document.documentElement as any).webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        (document.documentElement as any).webkitRequestFullscreen();
      } else if ((document.documentElement as any).msRequestFullscreen) {
        /* IE/Edge */
        (document.documentElement as any).msRequestFullscreen();
      }
    } else {
      // exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        /* Firefox */
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        /* IE/Edge */
        (document as any).msExitFullscreen();
      }
    }
  };

  render() {
    return (
      <div className="hidden sm:block">
        <div
          className={cn(
            buttonVariants({
              size: 'sm',
              variant: 'ghost',
            }),
            'w-9 px-0',
          )}
          onClick={this.toggleFullscreen}
        >
          <Icons.maximize className="size-4" />
        </div>
      </div>
    );
  }
}

export default FullScreen;
