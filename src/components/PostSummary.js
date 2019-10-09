import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import styles from './PostSummary.module.less';

const renderThumbnail = (slug, title, thumbnail, featuredImages) => {
  if (thumbnail) {
    return (
      <Link
        style={{ boxShadow: 'none' }}
        to={slug}
        className={styles.thumbnail}
      >
        {thumbnail.childImageSharp && (
          <Img fluid={thumbnail.childImageSharp.fluid} />
        )}
      </Link>
    );
  }

  if (featuredImages.length > 0) {
    return (
      <Link
        style={{ boxShadow: 'none' }}
        to={slug}
        className={styles.thumbnail}
      >
        <img src={featuredImages[0].toString()} alt={title} />
      </Link>
    );
  }
  return null;
};

export default function PostSummary({
  author,
  slug,
  description,
  title,
  date,
  thumbnail,
  featuredImages,
}) {
  return (
    <article key={slug} className={styles.article}>
      {renderThumbnail(slug, title, thumbnail, featuredImages)}
      <div className={styles.summary}>
        <h3 className={styles.h3Style}>
          <Link style={{ boxShadow: 'none' }} to={slug}>
            {title}
          </Link>
        </h3>
        <p
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <div className={styles.postMeta}>
          {author && (
            <Fragment>
              <p className={styles.author}>{author}</p>
              <span className={styles.dot} />
            </Fragment>
          )}
          <time>{date}</time>
        </div>
      </div>
    </article>
  );
}
