import { LessonData } from '../types/LessonTypes'
import { data as alphabetData } from './00-Alphabet/data'
import { data as numberData } from './01-Numbers/data'
import { data as foodData } from './02-Food'

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
  },
  {
    id: 2,
    cardTitle: 'foodanddrinks',
    cardImage: require('./02-Food/food.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: foodData
      }
    ]
  }
]

export { lessonData }
