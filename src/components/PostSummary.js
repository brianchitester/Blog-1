import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import styles from './PostSummary.module.less';

const renderThumbnail = (slug, title, thumbnail) => {
  if (thumbnail.childImageSharp) {
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
  return (
    <Link style={{ boxShadow: 'none' }} to={slug} className={styles.thumbnail}>
      <img src={thumbnail.toString()} alt={title} />
    </Link>
  );
};

export default function PostSummary({
  author,
  slug,
  description,
  title,
  date,
  thumbnail,
}) {
  return (
    <article key={slug} className={styles.article}>
      {thumbnail && renderThumbnail(slug, title, thumbnail)}
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
