'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider, usePostHog } from 'posthog-js/react'
import { Suspense, useEffect } from 'react'

import {isPostHogEnabled, POSTHOG_HOST, POSTHOG_KEY} from '~/config'

if (typeof window !== 'undefined') {
  posthog.init(POSTHOG_KEY!!, {
    api_host: POSTHOG_HOST,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  })
}

export function PostHogPageview () {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture(
        '$pageview',
        {
          '$current_url': url,
        }
      )
    }
  }, [pathname, searchParams, posthog])

  return null
}

export function PHProvider ({ children }: { children: React.ReactNode }) {
  if (!isPostHogEnabled) {
    return (<>{children}</>)
  }

  return (
    <Suspense>
      <PostHogProvider client={ posthog }>{ children }</PostHogProvider>
    </Suspense>
  )
}
