import React, { useEffect, useState } from 'react'

// @ts-expect-error
import { OPEN_AI_KEY } from '@env'
import axios from 'axios'
import { ActivityIndicator, StyleSheet, View, useColorScheme } from 'react-native'
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat'

import { Header } from '../../../components'

const LEELA_AI = require('../../../../assets/icons/appstore1024.png')

interface IContextSummary {
  user: string[]
  assistant: string[]
}

const LOADING_MESSAGE_ID = 'loading-message-id'

export const HomeAI: React.FC = () => {
  const isDark = useColorScheme() === 'dark'
  const primary = isDark ? 'rgb(52, 201, 252)' : '#FFA1CD'
  {
    const [messages, setMessages] = useState<IMessage[]>([])
    const [contextSummary, setContextSummary] = useState<IContextSummary>({
      user: [],
      assistant: []
    })
    const [loading, setLoading] = useState(false)

    const updateContextSummary = (message: IMessage) => {
      if (message.user._id === 1) {
        setContextSummary(prevState => {
          const newUserMessages = [...prevState.user, message.text].slice(-3)
          return { ...prevState, user: newUserMessages }
        })
      } else {
        setContextSummary(prevState => {
          const newAssistantMessages = [...prevState.assistant, message.text].slice(-3)
          return { ...prevState, assistant: newAssistantMessages }
        })
      }
    }

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Привет, я Моджи - твой преподаватель английского языка. \n\n Я ставлю задания в образе эмодзи, чтобы сделать уроки интересными. Готовы начать увлекательное изучение английского с помощью эмодзи-заданий? Добро пожаловать в мою команду!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Assistant',
            avatar: LEELA_AI
          }
        }
      ])
    }, [])

    const onSend = async (newMessages: IMessage[] = []) => {
      setLoading(true)
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))

      updateContextSummary(newMessages[0])

      const apiMessages = [
        {
          role: 'system',
          content:
            'Привет, я Моджи - твой преподаватель английского языка. \n\n Я ставлю задания в образе эмодзи, чтобы сделать уроки интересными. Готовы начать увлекательное изучение английского с помощью эмодзи-заданий? Добро пожаловать в мою команду!'
        },
        ...contextSummary.user.map(content => ({ role: 'user', content })),
        ...contextSummary.assistant.map(content => ({
          role: 'assistant',
          content
        })),
        { role: 'user', content: newMessages[0].text }
      ]

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

      // Запрос к OpenAI API
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: apiMessages,
          max_tokens: 1000,
          temperature: 0.2
        },
        {
          headers: {
            Authorization: `Bearer ${OPEN_AI_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      )

      setLoading(false)

      setMessages(previousMessages =>
        previousMessages.filter(message => message._id !== LOADING_MESSAGE_ID)
      )

      const assistantReply = response.data.choices[0].message.content

      const loadingMessageId = Date.now().toString()

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: loadingMessageId,
            text: assistantReply,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Assistant',
              avatar: LEELA_AI
            }
          }
        ])
      )
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
            left: { fontFamily: 'Montserrat' },
            right: { color: '#000', fontFamily: 'Montserrat' }
          }}
        />
      )
    }

    return (
      <>
        <Header title="Koshey AI" />
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
}

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    top: 1,
    alignItems: 'center'
  }
})
