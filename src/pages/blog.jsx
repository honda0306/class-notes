import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Header, BlogList } from 'components';
import { Layout } from 'layouts';

const Blog = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <Helmet title={'Tagged List'} />
      <Header title="Tagged List">Same Content, More Easily Seen Tags</Header>
      {edges.map(({ node }) => (
        <BlogList
          key={node.id}
          path={node.frontmatter.path}
          title={node.frontmatter.title}
          chapter={node.frontmatter.chapter}
          subtitle={node.frontmatter.subtitle}
          date={node.frontmatter.date}
          tags={node.frontmatter.tags}
          excerpt={node.excerpt}
        />
      ))}
    </Layout>
  );
};

export default Blog;

Blog.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            excerpt: PropTypes.string,
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              chapter: PropTypes.string,
              subtitle: PropTypes.string,
              date: PropTypes.string.isRequired,
              tags: PropTypes.array,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 50)
          frontmatter {
            title
            chapter
            subtitle
            path
            tags
            date(formatString: "MM.DD.YYYY")
          }
        }
      }
    }
  }
`;
