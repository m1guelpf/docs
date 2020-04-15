import React, { useState, useEffect } from 'react'
import authenticate from '~/lib/authenticate'
import { UserContext } from '~/lib/user-context'
import Head from 'next/head'
import { fullStoryScript } from '~/lib/scripts'
import Layout from '~/components/layout/app'
import DataContext from '~/lib/data-context'

import baseTheme from '../styles/themes/base'
import withTypeStyles from '../styles/with-type'
import nprogressStyles from '../styles/nprogress'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({})
  const [userLoaded, setUserLoaded] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    async function authUser() {
      const authInfo = await authenticate()

      setUser(authInfo.user)
      setUserLoaded(true)
    }

    authUser()
  }, [])

  return (
    <DataContext.Provider value={{ setData }}>
      <UserContext.Provider value={{ user, userLoaded }}>
        <Head>
          {typeof document !== 'undefined' &&
            document.cookie &&
            document.cookie.indexOf('token=') > -1 && (
              <script
                async
                dangerouslySetInnerHTML={{
                  __html: fullStoryScript
                }}
              />
            )}
        </Head>
        <Layout data={data}>
          <Component {...pageProps} />
          <style jsx global>
            {baseTheme}
          </style>
          <style jsx global>
            {nprogressStyles}
          </style>
          <style jsx global>
            {withTypeStyles}
          </style>
        </Layout>
      </UserContext.Provider>
    </DataContext.Provider>
  )
}

export default MyApp
