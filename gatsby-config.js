module.exports = {
  siteMetadata: {
    title: 'rdyson.dev',
    description: `rdyson.dev`,
    siteUrl: 'https://rdyson.dev',
  },
  plugins: [
    // Adding various source folders to the GraphQL layer.
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/templates/BlogPost.jsx'),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1536,
              linkImagesToOriginal: false,
            },
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-smartypants` },
          { resolve: `gatsby-remark-widows` },
        ],
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1536,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-feed-mdx',
      options: {
        query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  tag: edge.node.frontmatter.tag,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
                {
                  allMdx(
                    sort: { order: DESC, fields: [frontmatter___date] }
                  ) {
                    edges {
                      node {
                        fields {
                          slug
                        }
                        frontmatter {
                          title
                          description
                          date
                          tag
                        }
                        html
                      }
                    }
                  }
                }
              `,
            output: '/rss.xml',
            title: 'rdyson.dev',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'rdyson.dev',
        short_name: 'rdyson.dev',
        start_url: '/',
        background_color: '#f2930d',
        theme_color: '#f9f9f8',
        display: 'minimal-ui',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-preact',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-netlify',
  ],
}
