import React from 'react'
import { View, StyleSheet } from 'react-native'
import InstaClone from './src/InstaClone'
import store from './src/redux/stores'
import { Provider } from 'react-redux'

class App extends React.Component {
    render() {
        return (
            <Provider store={store.configureStore()}>
                <InstaClone/>
            </Provider>
        )
    }
}

export default App
