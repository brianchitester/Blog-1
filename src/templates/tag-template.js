import React from 'react';
import visit from 'unist-util-visit';

// Components
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostSummary from '../components/PostSummary';

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const siteTitle = `posts tagged with ${tag}`;
  const posts = data.allMarkdownRemark.edges;
  const authors = data.allAuthorsJson.edges.reduce(
    (acc, { node }) => ({ ...acc, [node.id]: node.name }),
    {},
  );
  const renderedPost = posts.map(({ node }) => {
    let featuredImages = [];
    visit(node.htmlAst, [{ tagName: 'img', type: 'element' }], postNode => {
      if (postNode && postNode.properties && postNode.properties.src) {
        featuredImages = featuredImages.concat(postNode.properties.src);
      }
    });

    return (
      <PostSummary
        title={node.frontmatter.title || node.fields.slug}
        slug={node.frontmatter.permalink || node.fields.slug}
        date={node.frontmatter.date}
        description={node.frontmatter.description || node.excerpt}
        author={authors[node.frontmatter.author]}
        thumbnail={node.frontmatter.thumbnail}
        featuredImages={featuredImages}
      />
    );
  });
  return (
    <Layout title={siteTitle}>
      <SEO title={siteTitle} keywords={[siteTitle]} />
      {renderedPost}
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allAuthorsJson {
      edges {
        node {
          id
          name
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 180)
          fields {
            slug
          }
          htmlAst
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
