import Head from 'next/head';
import React from 'react';
import { resolve } from 'url';

import config from '../../config';

interface Props {
  lang?: string;
  description?: string;
  title: string;
}

const SEO: React.FC<Props> = function (props) {
  const { description, title } = props;
  const { siteMetadata } = config;

  const metaDescription = description || siteMetadata.description;

  return (
    <Head>
      <title>
        {title} | {siteMetadata.title}
      </title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />

      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={`${title} | ${siteMetadata.title}`} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content="website" />
      <meta
        name="og:image"
        content={resolve(siteMetadata.siteUrl, 'logo-meta.png')}
      />
      <meta name="og:url" content={siteMetadata.siteUrl} />
      <meta name="twitter:card" content={metaDescription} />
      <meta
        name="twitter:image"
        content={resolve(siteMetadata.siteUrl, 'logo-meta.png')}
      />
      <meta name="twitter:creator" content={siteMetadata.author} />
      <meta name="twitter:url" content={siteMetadata.siteUrl} />
      <meta name="twitter:title" content={`${title} | ${siteMetadata.title}`} />
      <meta name="twitter:description" content={metaDescription} />
    </Head>
  );
};

export default SEO;
