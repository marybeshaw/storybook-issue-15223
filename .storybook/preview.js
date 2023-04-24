import React, { useEffect, useState } from 'react'

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

function usePretendFetchSessionData() {
  const [fetchedSessionData, setFetchedSessionData] = useState(false)
  useEffect(()=>{
    // let's pretend we're fetching session data
    const handle = setTimeout(()=>{
      setFetchedSessionData(true)
    },500)
    return ()=>clearTimeout(handle)
  },[])

  return fetchedSessionData
}

// This function has a timeout that causes a setState that has to happen before we can render children.
// Let's assume an API has to be called to get session data before we can do the sdkConf stuff in the children.
function WeirdTimerDecorator(Story) {
  const [isLoaded, setIsLoaded] = useState(false)
  const fetchedSessionData = usePretendFetchSessionData()

  useEffect(()=>{
    if (fetchedSessionData) {
      setIsLoaded(true)
    }

  },[fetchedSessionData])

  // We cannot try fetching the
  return isLoaded ? <PretendFetchAPI>{<Story />}</PretendFetchAPI> : <>Not yet loaded</>
}

// This function does a timeout before setting the sdk config and only renders children after the timeout has resolved.
// This simulates calling an SDK to get config variables, and waiting to render children until the config variables are available
function PretendFetchAPI({children}) {
  const [apiConfig, setApiConfig] = useState()

  useEffect(() => {
    // let's pretend we're calling an API that uses the session data fetched previously
    async function init() {
      await timeout(1000)
      setApiConfig({
        config: {
          key: 'mary',
        }})
    }
    init()
  }, [])

  function renderJSX(jsxChildren, config) {
    if (config?.config?.key === 'mary') {
      return (
        <>{jsxChildren}</>
      )
    }
  }

  return (
    <>{apiConfig ? renderJSX(children, apiConfig) : <p>Loading inside PretendFetchAPI</p>}</>
  )
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Each successive decorator wraps around the previous one
export const decorators = [
  WeirdTimerDecorator,
]
