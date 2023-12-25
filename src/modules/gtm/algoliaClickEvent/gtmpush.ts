import { GOOGLE_TAG_MANAGER_ID } from '@modules/app';

export const gtmPush = <T>(eventName?: string, payload?: T) => {
const algoliaUserToken = localStorage.getItem('algoliaUserToken')
  ;(window as any).dataLayer = (window as any).dataLayer || [];
  ;(window as any).dataLayer?.push(() => {
    ;(window as any).google_tag_manager[
      GOOGLE_TAG_MANAGER_ID as string
    ].dataLayer.reset();
  });
  ;(window as any).dataLayer?.push({ event: eventName, algoliaUserToken, ...payload });
}
