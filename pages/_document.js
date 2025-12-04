import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Premium baby clothing for newborns and infants" />
        <meta name="keywords" content="baby clothes, infant wear, baby dresses, rompers, onesies" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Little's World - Baby Clothing Store" />
        <link rel="canonical" href="https://www.littlesworld.co.in" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}