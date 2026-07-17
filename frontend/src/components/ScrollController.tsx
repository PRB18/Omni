import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ViewState, ZoomChapter } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface ScrollControllerProps {
  viewState: ViewState;
  onUpdateViewState: (updater: (prev: ViewState) => ViewState) => void;
  onChapterChange: (chapter: ZoomChapter) => void;
}

export const ScrollController: React.FC<ScrollControllerProps> = ({
  viewState,
  onUpdateViewState,
  onChapterChange
}) => {

  useEffect(() => {
    // Determine target pitch based on zoom
    let targetPitch = 0;
    let activeChapter: ZoomChapter = 'country';

    if (viewState.zoom >= 11.5) {
      targetPitch = 45;
      activeChapter = 'village';
    } else if (viewState.zoom >= 8.5) {
      targetPitch = 35;
      activeChapter = 'district';
    } else if (viewState.zoom >= 5.5) {
      targetPitch = 20;
      activeChapter = 'state';
    } else {
      targetPitch = 0;
      activeChapter = 'country';
    }

    onChapterChange(activeChapter);

    // GSAP smooth transition for pitch
    if (Math.abs(viewState.pitch - targetPitch) > 2) {
      const stateObj = { pitch: viewState.pitch };
      gsap.to(stateObj, {
        pitch: targetPitch,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => {
          onUpdateViewState((prev) => ({
            ...prev,
            pitch: stateObj.pitch
          }));
        }
      });
    }
  }, [viewState.zoom, onUpdateViewState, onChapterChange]);

  return null;
};

// Utility function to get viewState for chapter jump
export function getChapterViewState(chapter: ZoomChapter, currentViewState: ViewState): ViewState {
  switch (chapter) {
    case 'country':
      return {
        longitude: 78.9629,
        latitude: 20.5937,
        zoom: 4.8,
        pitch: 0,
        bearing: 0
      };
    case 'state':
      return {
        longitude: currentViewState.longitude || 79.2671,
        latitude: currentViewState.latitude || 17.0543,
        zoom: 7.2,
        pitch: 20,
        bearing: -10
      };
    case 'district':
      return {
        longitude: currentViewState.longitude || 79.2671,
        latitude: currentViewState.latitude || 17.0543,
        zoom: 10.0,
        pitch: 35,
        bearing: -15
      };
    case 'village':
      return {
        longitude: currentViewState.longitude || 79.2671,
        latitude: currentViewState.latitude || 17.0543,
        zoom: 12.5,
        pitch: 45,
        bearing: -20
      };
  }
}
