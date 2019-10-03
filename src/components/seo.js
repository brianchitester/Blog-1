/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { snowplowScript } from './snowplow.js';

function SEO({ description, lang, meta, keywords, title, images }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `,
  );
  const { siteUrl } = site.siteMetadata;
  const metaDescription = description || site.siteMetadata.description;
  const imageTags =
    images && images.length > 0
      ? images
          .filter(i => i)
          .reduce((accum, current) => {
            const items = [
              { property: 'og:image', content: `${siteUrl}${current}` },
              { name: 'twitter:image', content: `${siteUrl}${current}` },
            ];
            return accum.concat(items);
          }, [])
      : [];
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        ...imageTags,
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'google-site-verification',
          content: 'aQ3mfyY1q1ouMw6O_bslHPXVWBjTZZZwyHY3WyOXjzE',
        },
        ...meta,
      ].concat(
        keywords.length > 0
          ? {
              name: 'keywords',
              content: keywords.join(', '),
            }
          : [],
      )}
    >
      <script>{snowplowScript}</script>
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
  description: '',
  images: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
};

export default SEO;
