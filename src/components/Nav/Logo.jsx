import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Heading, Link } from 'theme-ui'

const Logo = (props) => (
  <Heading as="h3" sx={{ display: 'inline-block' }}>
    <Link
      as={GatsbyLink}
      to="/"
      sx={{ display: 'inline', color: 'text', textDecoration: 'none' }}
      tabIndex="-1"
      {...props}
    >
      rdyson.dev{' '}
      <span role="img" aria-label="nerd!">
        🤓
      </span>
    </Link>
  </Heading>
)

export default Logo
