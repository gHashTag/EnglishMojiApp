import { LessonData } from '../types/LessonTypes'

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
        contentUrl: require('./01-Numbers/data.json')
      },
      {
        type: 'quest',
        question: {
          type: 'emoji',
          emoji: {
            dataUrl: require('./01-Numbers/data.json')
          }
        }
      }
    ]
  }
]

export { lessonData }
