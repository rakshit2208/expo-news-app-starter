import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { NewsDataType } from '@/types'
import axios from 'axios'
import Loading from '@/components/Loading'

type Props = {}

const NewsDetails = (props: Props) => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [news,setNews] = useState<NewsDataType[]>([])

  const [isLoading,setIsLoading] = useState(true)

  useEffect(()=>{
    getNews()
  })

    const getNews = async () =>{
        try {
          const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`
    
          const response = await axios.get(URL);
          if(response && response.data){
              setNews(response.data.results);
              setIsLoading(false)
          }
        } catch (error:any) {
          console.log("Error..........",error);
        }
      };

  return (
    <>
    <Stack.Screen options={{
        headerLeft: () => {
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back' size={22}/>
        </TouchableOpacity>
    } ,
    headerRight: () => {
        <TouchableOpacity onPress={() => {}}>
            <Ionicons name='heart-outline' size={22}/>
        </TouchableOpacity>
    } ,
    title: ''
    
    }} />
    {isLoading ? (
        <Loading size={"large"} />
    ) : (
    <View>
      <Text>{news[0].title}</Text>
      <Text>{news[0].content}</Text>

    </View>
    )}
    </>
  )
}

export default NewsDetails

const styles = StyleSheet.create({})