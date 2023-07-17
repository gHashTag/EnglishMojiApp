import { LessonData } from '../types/LessonTypes'
import { data } from './01-Numbers/data'

const lessonData: LessonData[] = [
  {
    id: 1,
    cardTitle: 'numbers',
    cardImage: require('./01-Numbers/numbers.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: data
      }
    ]
  }
]

export { lessonData }
