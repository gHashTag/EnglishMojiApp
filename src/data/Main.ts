import { LessonData } from '../types/LessonTypes'
import { alphabet } from './emodji/alphabet'
import { numbers } from './emodji/numbers'
import { food } from './emodji/food'
import { animals } from './emodji/animals'
import { activities } from './emodji/activities'
import { clothes } from './emodji/clothes'
import { smiles } from './emodji/smiles'
import { symbols } from './emodji/symbols'
import { objects } from './emodji/objects'
import { travel } from './emodji/travel'
import { time } from './emodji/time'
import { people } from './emodji/people'
import { nature } from './emodji/nature'

const lessonData: LessonData[] = [
  {
    id: 0,
    cardTitle: 'alphabet',
    cardImage: require('./img/alphabet.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: alphabet
      }
    ]
  },
  {
    id: 1,
    cardTitle: 'numbers',
    cardImage: require('./img/numbers.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: numbers
      }
    ]
  },
  {
    id: 2,
    cardTitle: 'food',
    cardImage: require('./img/food.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: food
      }
    ]
  },
  {
    id: 3,
    cardTitle: 'animals',
    cardImage: require('./img/animals.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: animals
      }
    ]
  },
  {
    id: 4,
    cardTitle: 'activities',
    cardImage: require('./img/activities.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: activities
      }
    ]
  },
  {
    id: 5,
    cardTitle: 'clothes',
    cardImage: require('./img/clothes.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: clothes
      }
    ]
  },
  {
    id: 6,
    cardTitle: 'smiles',
    cardImage: require('./img/smiles.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: smiles
      }
    ]
  },
  {
    id: 7,
    cardTitle: 'symbols',
    cardImage: require('./img/symbols.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: symbols
      }
    ]
  },
  {
    id: 8,
    cardTitle: 'objects',
    cardImage: require('./img/objects.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: objects
      }
    ]
  },
  {
    id: 9,
    cardTitle: 'travel',
    cardImage: require('./img/travel.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: travel
      }
    ]
  },
  {
    id: 10,
    cardTitle: 'time',
    cardImage: require('./img/time.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: time
      }
    ]
  },
  {
    id: 11,
    cardTitle: 'people',
    cardImage: require('./img/people.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: people
      }
    ]
  },
  {
    id: 12,
    cardTitle: 'nature',
    cardImage: require('./img/nature.png'),
    sections: [
      {
        type: 'emojiLearn',
        contentUrl: nature
      }
    ]
  }
]

export { lessonData }
