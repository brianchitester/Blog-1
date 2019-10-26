import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import styles from './bio.module.less';
import Avatar from './avatar';

function Bio({ author, children }) {
  if (!author) {
    return null;
  }
  const { name, twitter, github, linkedin, blog } = author;
  const hasSocial = twitter || github || linkedin || blog;
  // todo: this needs to be broken up better

  return (
    <div className={styles.bio}>
      <Avatar author={author} />
      <span className={styles.nameWrap}>
        <div className={styles.social}>
          <p>{name}</p>
          <span className={hasSocial ? styles.socialIcons : ''}>
            {twitter && (
              <a
                aria-label={`${name}'s twitter`}
                href={`https://twitter.com/${twitter}`}
              >
                <FontAwesomeIcon
                  className={styles.icon}
                  role="button"
                  icon={faTwitter}
                />
              </a>
            )}
            {github && (
              <a
                aria-label={`${name}'s github`}
                href={`https://github.com/${github}`}
              >
                <FontAwesomeIcon
                  className={styles.icon}
                  role="button"
                  icon={faGithub}
                />
              </a>
            )}
            {linkedin && (
              <a aria-label={`${name}'s linkedin`} href={linkedin}>
                <FontAwesomeIcon
                  className={styles.icon}
                  role="button"
                  icon={faLinkedin}
                />
              </a>
            )}
            {blog && (
              <a aria-label={`${name}'s blog`} href={blog}>
                <FontAwesomeIcon
                  className={styles.icon}
                  role="button"
                  icon={faPencilAlt}
                />
              </a>
            )}
          </span>
        </div>
        {/* this is my hacky way of putting the date here */}
        {children}
      </span>
    </div>
  );
}

export default Bio;
