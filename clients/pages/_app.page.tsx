import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import type { AppProps } from 'next/app'

import 'assets/sass/app.scss'
import { wrapper } from '@redux/store'
import RootHOC from '@components/HOC/Root_HOC'
import { appWithTranslation } from 'i18next-config'

function MyApp({ Component, pageProps }: AppProps) {
  const NoSsrPages = dynamic(() => Promise.resolve(RootHOC), {
    ssr: false,
  })

  return (
    <NoSsrPages>
      <Component {...pageProps} />
    </NoSsrPages>
  )
}

const mapDispatchToProps = () => ({})

const withConnect = connect(null, mapDispatchToProps)

export default wrapper.withRedux(withConnect(appWithTranslation(MyApp)))
