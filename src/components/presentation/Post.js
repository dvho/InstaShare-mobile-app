import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import config from '../../config'


class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            screenWidth: 0,
            liked: false,
            likes: 128
        }
    }

    componentDidMount() {
        const screenWidth = Dimensions.get('window').width
        this.setState({
            screenWidth: screenWidth
        })
    }

    render() {
        const imageSelection = this.props.item % 2 == 0 ? 'https://lh3.googleusercontent.com/8anOPV5gMaYY3roqs5E1U_byW6qHLa7y2QOBv3usGOVUzWhqbgXSBGsWM7GfRz2PStzDPzD4FdHMvncSsZHIqZtP5A' : 'https://lh3.googleusercontent.com/Hf-g-Tsc5E6g9H2Y0raW97C2Y137bf4mwL0hRS4CHfUbdHhbwA9IbJWazKjQHTISCLp9JYhBOBCF3jaI8gZOVQ7pHg'

        return(
            <View>
                <View style={styles.userBar}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                            style={styles.userPic}
                            source={{uri: 'https://lh3.googleusercontent.com/R92YU4h_pYq9_aqe9RiSl6UwmtKVGYWaRfkFkdR4n-xWFOBfkGnJiwGlZOrxiRDZZ_GCUCfXRcmQt5b1CR0D6pxtVIs'}}
                        />
                        <Text style={{marginLeft: 10}}>lizzybear</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 20}}>...</Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            liked: !(this.state.liked),
                            likes: this.state.likes + 1
                        })
                    }}
                    activeOpacity={0.7}
                >
                    <Image
                        style={{ width: this.state.screenWidth, height: Math.floor(this.state.screenWidth * 1.1) }}
                        source={{
                            uri: imageSelection
                        }}
                    />
                </TouchableOpacity>
                <View style={styles.iconBar}>
                        <Image style={[styles.icon, {height: 40, width: 40, tintColor: this.state.liked === true ? 'red' : null}]} source={config.images.heartIcon}/>
                        <Image style={[styles.icon, {height: 35, width: 35}]} source={config.images.bubbleIcon}/>
                        <Image style={[styles.icon, {height: 38, width: 38}]} source={config.images.arrowIcon}/>
                </View>
                <View style={styles.commentBar}>
                    <Image style={[styles.icon, {height: 20, width: 20}]} source={config.images.heartIcon}/>
                    <Text style={{paddingLeft: 5}}>{this.state.likes} Likes</Text>
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
        backgroundColor: 'ivory',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgb(233, 233, 233)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 30,
        fontStyle: 'italic',
        fontFamily: 'Times New Roman'
    },
    userBar: {
        width: 100 + '%',
        height: config.styleConstants.rowHeight,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userPic: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    iconBar: {
        height: config.styleConstants.rowHeight,
        width: 100 + '%',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgb(233, 233, 233)',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginLeft: 5
    },
    commentBar: {
        height: config.styleConstants.rowHeight,
        width: 100 + '%',
        padding: 5,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgb(233, 233, 233)',
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default Post
