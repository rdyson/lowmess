import React, { useState, useEffect } from 'react'
import getStats from './getStats'
import { Stat, StatTitle, StatValue } from './Stat'
import { Box, Text } from '../Primitives'

const Stats = ({ ...props }) => {
  const [commits, setCommits] = useState(null)
  const [places, setPlaces] = useState(null)
  const [steps, setSteps] = useState(null)
  const [sleep, setSleep] = useState(null)
  const [songs, setSongs] = useState(null)
  const [album, setAlbum] = useState(null)
  const [books, setBooks] = useState([])

  async function fillStats() {
    const {
      commits: commitStat,
      places: placesStat,
      steps: stepsStat,
      sleep: sleepStat,
      songs: songsStat,
      album: albumStat,
      books: booksStat,
    } = await getStats()

    if (commitStat) setCommits(commitStat.toLocaleString())

    if (placesStat) setPlaces(placesStat.toLocaleString())

    if (stepsStat) setSteps(stepsStat.toLocaleString())

    if (sleepStat) setSleep(parseFloat(sleepStat.toFixed(2)).toLocaleString())

    if (songsStat) setSongs(songsStat.toLocaleString())

    if (albumStat.name && albumStat.artist) {
      const albumComponent = (
        <span>
          <em>{albumStat.name}</em>, {albumStat.artist}
        </span>
      )
      setAlbum(albumComponent)
    }

    if (booksStat.length) setBooks(booksStat)
  }

  useEffect(() => {
    fillStats()
  }, [])

  return (
    <Box {...props}>
      <Text is="h2" fontSize={[3, 4]} mt={0} mb={4}>
        In the Last 30 Days
      </Text>

      <Stat mb={2}>
        <StatTitle>GitHub Commits</StatTitle>
        <StatValue>{commits || '\u2014'}</StatValue>
      </Stat>

      <Stat mb={2}>
        <StatTitle>Places Visited</StatTitle>
        <StatValue>{places || '\u2014'}</StatValue>
      </Stat>

      <Stat mb={2}>
        <StatTitle>Steps Taken</StatTitle>
        <StatValue>{steps || '\u2014'}</StatValue>
      </Stat>

      <Stat mb={2}>
        <StatTitle>Hours Slept</StatTitle>
        <StatValue>{sleep || '\u2014'}</StatValue>
      </Stat>

      <Stat mb={2}>
        <StatTitle>Songs Played</StatTitle>
        <StatValue>{songs || '\u2014'}</StatValue>
      </Stat>

      <Stat mb={2}>
        <StatTitle>Top Album</StatTitle>
        <StatValue>{album || '\u2014'}</StatValue>
      </Stat>

      <Text is="h2" fontSize={[3, 4]} mt={5} mb={4}>
        Currently Reading
      </Text>

      {!books.length && (
        <Stat>
          <StatValue width={1}>{'\u2014'}</StatValue>
        </Stat>
      )}

      {!!books.length &&
        books.map(book => (
          <Stat mt={2} key={book.name}>
            <StatValue width={1}>
              <em>{book.name}</em>, {book.author}
            </StatValue>
          </Stat>
        ))}
    </Box>
  )
}

export default Stats
