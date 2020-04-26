import React from 'react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Box, Grid, Text, Container, Heading, Link } from 'theme-ui'
import Layout from '../components/Layout'
import { Header, HeaderName, HeaderTitle } from '../components/Header'

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { order: ASC, fields: [frontmatter___tag] }) {
        edges {
          node {
            frontmatter {
              title
              description
              year: date(formatString: "YYYY")
              month: date(formatString: "MMMM")
              tag
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const posts = data.allMdx.edges
  let tag = ''

  return (
    <Layout>
      <Helmet>
        <title>Blog</title>
      </Helmet>

      <Header>
        <HeaderName>Blog</HeaderName>

        <HeaderTitle>Stuff about Things</HeaderTitle>
      </Header>

      <Container as="main" mt={[4, 5]}>
        <Grid columns={[1, '8rem 1fr']} gap={[4, 5]}>
          {posts.map(({ node }, index) => {
            const { fields, frontmatter } = node

            const thisTag = frontmatter.tag

            const TagComponent =
              thisTag === tag ? (
                <Box sx={{ display: ['none', 'block'] }} />
              ) : (
                <Heading color="muted-text" mt={[4, 0]} variant="blog-category">
                  {thisTag}
                </Heading>
              )

            tag = thisTag

            return (
              <React.Fragment key={fields.slug}>
                {TagComponent}

                <div>
                  <Heading as="h3" sx={{ display: 'inline-block' }}>
                    <Link as={GatsbyLink} to={fields.slug} variant="ui">
                      {frontmatter.title}
                    </Link>
                  </Heading>

                  <Text as="p" sx={{ maxWidth: 'measure', marginTop: 1 }}>
                    {frontmatter.description}
                  </Text>
                </div>
              </React.Fragment>
            )
          })}
        </Grid>
      </Container>
    </Layout>
  )
}

export default BlogPage
