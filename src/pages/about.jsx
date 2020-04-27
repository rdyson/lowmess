import React from 'react'
import PropTypes from 'prop-types'
import { Text, Heading, Link, Container } from 'theme-ui'
import Layout from '../components/Layout'
import pluralize from '../utils/pluralize'

const ValueCount = ({ value, singular, plural }) => (
  <React.Fragment>
    {value.toLocaleString()} {pluralize(value, singular, plural)}
  </React.Fragment>
)

ValueCount.propTypes = {
  value: PropTypes.number.isRequired,
  singular: PropTypes.string.isRequired,
  plural: PropTypes.string.isRequired,
}

const BookType = PropTypes.shape({
  name: PropTypes.string,
  author: PropTypes.string,
})

const FormattedBook = ({ book }) => (
  <React.Fragment>
    &ldquo;{book.name}&rdquo; by {book.author}
  </React.Fragment>
)

FormattedBook.propTypes = {
  book: BookType,
}

const BooksToSentence = ({ books }) => {
  if (books.length === 1) return <FormattedBook book={books[0]} />

  if (books.length === 2)
    return (
      <React.Fragment>
        <FormattedBook book={books[0]} /> and <FormattedBook book={books[1]} />
      </React.Fragment>
    )

  return books.map((book, index) => {
    if (index === 0) return <FormattedBook book={book} />

    if (index + 1 === books.length)
      return (
        <React.Fragment>
          , and <FormattedBook book={book} />
        </React.Fragment>
      )

    return (
      <React.Fragment key={book.name}>
        , <FormattedBook book={book} />
      </React.Fragment>
    )
  })
}

BooksToSentence.propTypes = {
  books: PropTypes.arrayOf(BookType),
}

const IndexPage = () => {
  return (
    <Layout>
      <Container>
        <Text variant="section-heading" mb={3}>
          Howdy
        </Text>

        {/* The `Text` wrapper makes sure spaces are consistently sized */}
        <Text variant="site-intro" sx={{ display: 'contents' }}>
          <Heading as="h1" variant="site-intro" sx={{ fontWeight: 'bold' }}>
            Hi! I’m Rob. I’m a software developer in Mexico City.
          </Heading>{' '}
          <Text as="p" variant="site-intro">
            I’ve been co-founder and CTO at a couple of startups, and am now an
            engineer at <Link href="https://runahr.com">Runa HR</Link>. I’ve
            also been described as vegan, a bit English, and rather sarcastic.
            I’m into personal productivity,{' '}
            <Link href="https://www.effectivealtruism.org/articles/introduction-to-effective-altruism">
              effective altruism
            </Link>
            , and{' '}
            <Link href="http://www.coffeegeek.com/guides/aeropresscoldbrew">
              coffee
            </Link>
            . In a past life I was a music producer and engineer.
          </Text>
          <Text as="p" variant="site-intro">
            Lately I’ve been using <Link href="https://reactjs.org">React</Link>
            , <Link href="https://www.gatsbyjs.org">Gatsby</Link>, and{' '}
            <Link href="https://rubyonrails.org">Ruby on Rails</Link>. I’m also
            familiar with ES6, Node, and shell scripting.
          </Text>
          <Text as="p" variant="site-intro">
            I have a{' '}
            <Link href="https://notes.rdyson.dev">notes repository</Link> that I
            use primarily as a personal wiki, but you may find something useful
            there. You can reach me at rob at rdyson.dev, and rdyson elsewhere.
          </Text>
        </Text>
      </Container>
    </Layout>
  )
}

export default IndexPage
