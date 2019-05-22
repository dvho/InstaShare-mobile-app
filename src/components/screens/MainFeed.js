import React from 'react'
import { View, Text, StyleSheet, Dimensions} from 'react-native'
import config from '../../config'
import { PostFeed } from '../container'


class MainFeed extends React.Component {
    constructor() {
        super()
        this.state = {
            screenWidth: 0,
            liked: false
        }
    }

    componentDidMount() {
        const screenWidth = Dimensions.get('window').width
        this.setState({
            screenWidth: screenWidth
        })
    }

    render() {
        return(
            <View style={{ flex: 1, width: 100 + '%', height: 100 + '%'}}>
                <View style={styles.tempNav}>
                    <Text style={styles.heading}>Welcome!</Text>
                </View>
                <View>
                    <PostFeed/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tempNav: {
        width: 100 + '%',
        height: config.styleConstants.rowHeight,
        marginTop: 20,
        backgroundColor: '#fcfcff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgb(233, 233, 233)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 30,
        fontStyle: 'italic',
        fontFamily: 'Times New Roman'
    }
})

export default MainFeed
