import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

const Layout = ({children} ) => {
  return (
    <div className='layout'>
      <Head>
        <title>LUXURY WATCH STORE</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout