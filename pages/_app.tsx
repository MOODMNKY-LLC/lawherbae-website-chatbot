// global styles shared across the entire site
import * as React from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { BubbleChat } from 'flowise-embed-react'; // Import BubbleChat

import * as Fathom from 'fathom-client'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
import posthog from 'posthog-js'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import 'styles/global.css'
// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'
// global style overrides for notion
import 'styles/notion.css'
// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'

import { bootstrap } from '@/lib/bootstrap-client'
import {
  fathomConfig,
  fathomId,
  isServer,
  posthogConfig,
  posthogId
} from '@/lib/config'

if (!isServer) {
  bootstrap()
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    function onRouteChangeComplete() {
      if (fathomId) {
        Fathom.trackPageview()
      }

      if (posthogId) {
        posthog.capture('$pageview')
      }
    }

    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)
    }

    if (posthogId) {
      posthog.init(posthogId, posthogConfig)
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return ( 
    <>
      <BubbleChat
        chatflowid="2b9af05c-fcab-4470-92c2-5a6e90467d2c"
        apiHost="https://ladylex-flowise.moodmnky.com"
        theme={{
          button: {
            backgroundColor: "#193F4E",
            right: 20,
            bottom: 20,
            size: "medium",
            iconColor: "white",
            customIconSrc: "https://ladylex-supabase.moodmnky.com/storage/v1/object/public/ladylex_images/lady_lex_avatar.svg",
          },
          chatWindow: {
            welcomeMessage: "Hello! I’m Lady Lex, your personal legal assistant. I’m here to help you navigate complex legal concepts, interpret statutes, generate summaries, and organize your notes. Ask me anything about your legal studies, and I’ll guide you step-by-step. If you’re not sure where to start, try one of the prompts below!",
            backgroundColor: "#2F3437",
            height: 700,
            width: 400,
            fontSize: 16,
            poweredByTextColor: "#2F3437",
            botMessage: {
              backgroundColor: "#2F3437",
              textColor: "#FFFFFF",
              showAvatar: true,
              avatarSrc: "https://ladylex-supabase.moodmnky.com/storage/v1/object/public/ladylex_images/lady_lex_avatar.svg",
            },
            userMessage: {
              backgroundColor: "#539997",
              textColor: "#ffffff",
              showAvatar: true,
              avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
            },
            textInput: {
              placeholder: "Ask Lady Lex about legal concepts, estate law, or get help with study materials…",
              backgroundColor: "#2F3437",
              textColor: "#ffffff",
              sendButtonColor: "#193F4E",
            }
          }
        }}
      />
  <Component {...pageProps} />
  </>
  );
}
