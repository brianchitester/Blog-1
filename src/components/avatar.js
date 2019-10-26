/* eslint-disable quotes */
/**
 * Avatar component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const avatarQuery = graphql`
  query AvatarQuery {
    avatar: allFile(
      filter: { absolutePath: { regex: "//content/assets/authors/" } }
    ) {
      nodes {
        base
        childImageSharp {
          fluid(maxWidth: 50) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;

function Avatar({ author, size = 50 }) {
  if (!author) {
    return null;
  }
  const { name, avatar } = author;
  return (
    <StaticQuery
      query={avatarQuery}
      render={data => {
        const currentAuthorsImage = data.avatar.nodes.find(
          a => a.base === avatar,
        );
        return (
          currentAuthorsImage && (
            <Img
              fluid={currentAuthorsImage.childImageSharp.fluid}
              alt={name}
              style={{
                marginRight: '0.75rem',
                marginBottom: 0,
                width: size,
                height: size,
                borderRadius: '100%',
              }}
              imgStyle={{
                borderRadius: '50%',
              }}
            />
          )
        );
      }}
    />
  );
}

export default Avatar;
