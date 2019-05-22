import {Dimensions, StyleSheet} from 'react-native'

export default {
    images: {
        heartIcon: require('../../assets/heart.png'),
        bubbleIcon: require('../../assets/bubble.png'),
        arrowIcon: require('../../assets/arrow.png')
    },
    styleConstants: {
        rowHeight: 50,
        fineBorder: StyleSheet.hairlineWidth,
        screenWidth: Dimensions.get('window').width,
        oneThirdWidth: Math.floor((Dimensions.get('window').width - 2 ) / 3)
    },
    baseUrl: 'https://instaapi-02-dfpxme.turbo360-vertex.com/api/'
    //baseUrl: 'http://localhost:3000/api/'
}
