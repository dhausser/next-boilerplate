import { ApolloProvider, ApolloClient, NormalizedCacheObject, InMemoryCache } from '@apollo/client'
import 'styles/globals.css'

// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'

// TODO: Configure ApolloClient for Next.js

function App({ Component, pageProps }: AppProps) {
  const cache = new InMemoryCache()
  const client = new ApolloClient<NormalizedCacheObject>({
    cache,
  })

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default App
