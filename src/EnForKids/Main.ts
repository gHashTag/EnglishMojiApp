import { LessonData } from '../types/LessonTypes'
import { data as numberData } from './01-Numbers/data'
import { data as alphabetData } from './00-Alphabet/data'

const lessonData: LessonData[] = [
  {
    id: 0,
    cardTitle: 'alphabet',
    cardImage: require('./00-Alphabet/alphabet.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: alphabetData
      }
    ]
  },
  {
    id: 1,
    cardTitle: 'numbers',
    cardImage: require('./01-Numbers/numbers.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: numberData
      }
    ]
  }
]

export { lessonData }
