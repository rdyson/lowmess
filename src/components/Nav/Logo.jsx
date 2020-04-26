import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Heading, Link } from 'theme-ui'

const Logo = (props) => (
  <Heading as="h3" sx={{ display: 'inline-block' }}>
    <Link
      as={GatsbyLink}
      to="/"
      sx={{ display: 'inline', color: 'primary', textDecoration: 'none' }}
      tabIndex="-1"
      {...props}
    >
      rdyson.dev
    </Link>
  </Heading>
)

export default Logo
