import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat'
import { Header } from '../../../components'

const LEELA_AI = require('../../../../assets/icons/appstore1024.png')

// @ts-expect-error
import { OPEN_AI_KEY } from '@env'

export const AiScreen: React.FC = () => {
  const primary = '#FDBEEA'
  const LOADING_MESSAGE_ID = 'loading-message-id'

  const [messages, setMessages] = useState<IMessage[]>([])
  const [loading, setLoading] = useState(false)

  const generateRandomTask = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/models/text-davinci-003',
        {
          prompt: 'Создайте emoji-задание по английскому языку.',
          max_tokens: 30,
          n: 1,
          stop: '\n'
        },
        {
          headers: {
            Authorization: `Bearer ${OPEN_AI_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const randomTask = response.data.choices[0].text.trim()
      return randomTask
    } catch (error) {
      console.error('Error generating task:', error)
      // Обработка ошибок
    }
  }

  useEffect(() => {
    const initializeChat = async () => {
      const generatedTask = await generateRandomTask()

      setMessages([
        {
          _id: 1,
          text: generatedTask,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Assistant',
            avatar: LEELA_AI
          }
        }
      ])
    }

    initializeChat()
  }, [])

  const onSend = async (newMessages: IMessage[] = []) => {
    setLoading(true)
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))

    const generatedTask = await generateRandomTask()

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [
        {
          _id: LOADING_MESSAGE_ID,
          text: '',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Assistant',
            avatar: LEELA_AI
          }
        }
      ])
    )

    // Генерация ответа нейросетью
    // ...

    setLoading(false)

    setMessages(previousMessages =>
      previousMessages.filter(message => message._id !== LOADING_MESSAGE_ID)
    )

    // Отображение ответа нейросети
    // ...
  }

  const renderBubble = props => {
    if (props.currentMessage._id === LOADING_MESSAGE_ID) {
      return (
        <View>
          {loading ? (
            <View style={styles.bubble}>
              <ActivityIndicator size="small" color={primary} />
            </View>
          ) : null}
        </View>
      )
    }

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: `${primary}` }
        }}
        textStyle={{
          left: { fontFamily: 'Avenir Next' },
          right: { color: '#000', fontFamily: 'Avenir Next' }
        }}
      />
    )
  }

  return (
    <>
      <Header title="Moji AI" />
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    top: 1,
    alignItems: 'center'
  }
})
