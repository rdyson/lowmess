import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import { useLocation } from '@reach/router'
import { Box, Container, Flex, NavLink } from 'theme-ui'
import SkipNavLink from './SkipNavLink'
import Logo from './Logo'

const Nav = ({ sx, ...props }) => {
  const location = useLocation()

  return (
    <Box
      as="nav"
      sx={{
        borderTop: 4,
        borderColor: 'primary',
        paddingTop: [4, null, 5],
        ...sx,
      }}
      {...props}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <SkipNavLink />
        <Logo />

        <Flex sx={{ alignItems: 'center' }}>
          <Flex as="ul">
            <li>
              <NavLink
                as={GatsbyLink}
                to="/"
                data-active={location.pathname === '/' ? true : null}
                mr={[1, 2]}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                as={GatsbyLink}
                to="/about"
                data-active={location.pathname.includes('/about') ? true : null}
              >
                About
              </NavLink>
            </li>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

Nav.propTypes = {
  sx: PropTypes.object,
}

export default Nav
