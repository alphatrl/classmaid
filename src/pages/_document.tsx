import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var theme = localStorage.getItem('classmaid-theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="#111111" />

        <link rel="manifest" href="/manifest.json" />

        <link
          rel="icon"
          type="image/png"
          href="/images/favicon@16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon@24x24.png"
          sizes="24x24"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon.png"
          sizes="32x32"
        />
        <link
          rel="shortcut icon"
          type="image/svg+xml"
          href="/images/favicon.svg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
