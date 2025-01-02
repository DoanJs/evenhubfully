import { View, Text } from 'react-native'
import React from 'react'
import { ContainerComponent } from '../../components'

const EditProfileScreen = ({route}:any) => {
    const {profile} = route.params

    console.log(profile)
  return (
    <ContainerComponent back >
      <Text>EditProfileScreen</Text>
    </ContainerComponent>
  )
}

export default EditProfileScreen