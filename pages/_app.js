import Link from 'next/link'
import React from 'react'
import { Fragment } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <nav className="header">
        <div>
          <Link href="/">
            <a>Benga Kitchen 🍌</a>
          </Link>
        </div>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </Fragment>
  )
}

export default MyApp
