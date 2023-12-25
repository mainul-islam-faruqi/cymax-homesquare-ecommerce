import { GOOGLE_TAG_MANAGER_ID } from '@modules/app';

export const gtmTrack = <T>(eventName?: string, payload?: T) => {

  ;(window as any).dataLayer = (window as any).dataLayer || [];
  ;(window as any).dataLayer?.push(() => {
    ;(window as any).google_tag_manager[
      GOOGLE_TAG_MANAGER_ID as string
    ].dataLayer.reset();
  });
  ;(window as any).dataLayer?.push({ event: eventName, ...payload });
}
