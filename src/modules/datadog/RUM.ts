import { datadogRum } from '@datadog/browser-rum'
import {
  DATADOG_APPLICATION_ID,
  DATADOG_CLIENT_TOKEN,
  DATADOG_REPLAY,
  DATADOG_SAMPLE_RATE,
  DATADOG_SERVICE,
  DATADOG_SITE,
  DATADOG_TRACK_FRUSTATION,
} from '@modules/app'

export function initializeRUM() {
  datadogRum.init({
    applicationId: DATADOG_APPLICATION_ID,
    clientToken: DATADOG_CLIENT_TOKEN,
    site: DATADOG_SITE,
    service: DATADOG_SERVICE,

    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate: DATADOG_SAMPLE_RATE,
    sessionReplaySampleRate: DATADOG_REPLAY,
    trackResources: true,
    trackLongTasks: true,
    trackUserInteractions: true,
    trackFrustrations: DATADOG_TRACK_FRUSTATION,
    defaultPrivacyLevel: 'mask-user-input',
  })

  datadogRum.startSessionReplayRecording()
}
