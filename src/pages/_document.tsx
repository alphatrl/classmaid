/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const { renderPage } = ctx;

    const initialProps = await Document.getInitialProps(ctx);
    const sheet = new ServerStyleSheet();
    const page = renderPage(
      (App) => (props) => sheet.collectStyles(<App {...props} />)
    );

    const styleTags = sheet.getStyleElement();

    return { ...initialProps, ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en">
        {
          <Head>
            {/*@ts-ignore*/}
            {this.props.styleTags}

            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0&display=optional"
            />

            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="black-translucent"
            />
            <meta name="theme-color" content="#111111" />

            <link rel="icon" type="image/png" href="/images/favicon.png" />
            <link
              rel="shortcut icon"
              type="image/svg+xml"
              href="/images/favicon.svg"
            />
            <link rel="manifest" href="/manifest.json" />
            <link
              rel="apple-touch-icon"
              href="/images/logo/icon-192-maskable.png"
            />
          </Head>
        }
        <body>
          <Main />
          <div id="modal-root"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
