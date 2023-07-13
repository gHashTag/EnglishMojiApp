import { LessonData } from '../types/LessonTypes'
import { data } from './01-Numbers/data'

const lessonData: LessonData[] = [
  {
    id: 1,
    cardTitle: 'Numbers',
    cardImage: require('./01-Numbers/numbers.png'),
    sections: [
      {
        type: 'video',
        header: 'Numbers',
        poster: require('./01-Numbers/numbers.png')
        // contentUrl: require('./01-Numbers/Numbers.mp4')
      },
      {
        type: 'emojiLearn',
        contentUrl: data
      },
      {
        type: 'quest',
        question: {
          type: 'emoji',
          emoji: {
            dataUrl: data
          }
        }
      }
    ]
  }
]

export { lessonData }
