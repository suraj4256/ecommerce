import { View, Text } from 'react-native'
import React from 'react'

export default function AddressCard({items}) {
  return (
    <View>
      <Text>{items.name}</Text>
    </View>
  )
}