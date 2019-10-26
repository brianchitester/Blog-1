import React from 'react';
import { graphql } from 'gatsby';
import styles from './feed-template.module.less';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostSummary from '../components/PostSummary';
import Pagination from '../components/Pagination';

const Feed = ({ data, location, pageContext = {} }) => {
  const {
    totalCount,
    current = 1,
    limit,
    postFeaturedImageThumbnail,
  } = pageContext;
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  const authors = data.allAuthorsJson.edges.reduce(
    (acc, { node }) => ({ ...acc, [node.id]: node.name }),
    {},
  );

  const renderFeed = posts.map(({ node }) => (
    <PostSummary
      {...node.frontmatter}
      key={node.fields.slug}
      title={node.frontmatter.title || node.fields.slug}
      slug={node.frontmatter.permalink || node.fields.slug}
      description={node.frontmatter.description || node.excerpt}
      author={authors[node.frontmatter.author]}
      thumbnail={
        node.frontmatter.thumbnail ||
        postFeaturedImageThumbnail[node.fields.slug]
      }
    />
  ));

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="Revved"
        keywords={['blog', 'gatsby', 'javascript', 'react']}
      />
      <header className={styles.headlineWrap}>
        <h1>Welcome to Revved, the CarGurus Engineering Blog</h1>
        <p>
          Written by the team building the world's most trusted and transparent
          automotive marketplace.
        </p>
      </header>
      {renderFeed}
      <Pagination
        totalCount={totalCount}
        current={current}
        postsPerPage={limit}
      />
    </Layout>
  );
};

export default Feed;

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allAuthorsJson {
      edges {
        node {
          id
          name
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 180)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            permalink
            author
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
