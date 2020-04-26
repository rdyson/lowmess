import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import { Box, Container, Link } from 'theme-ui'

const FooterLink = ({ to, children, ...props }) => (
  <Link as={to ? GatsbyLink : 'a'} variant="ui" to={to} {...props}>
    {children}
  </Link>
)

FooterLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
}

const Footer = (props) => {
  return (
    <Box as="footer" bg="muted" py={5} {...props}>
      <Container>
        <Box>
          This here site is built using{' '}
          <FooterLink href="https://gatsbyjs.org">Gatsby</FooterLink>, and it’s
          hosted on <FooterLink href="https://vercel.com">Vercel</FooterLink>.
          The theme is by{' '}
          <FooterLink href="https://lowmess.com">Alex Lomas</FooterLink>.
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
