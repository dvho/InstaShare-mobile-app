import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import config from '../../config'

import {
  MaterialIcons,
  Feather,
  Ionicons
} from '@expo/vector-icons';

class Profile extends React.Component {

    constructor() {
        super()
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params)

        this._navListener = this.props.navigation.addListener('didFocus', () => {
            if(this.props.navigation.state.params) {
                let newPics = Object.assign([], this.state.profilePics)
                newPics.push(this.props.navigation.state.params.newPic)
                this.setState({
                    profilePics: newPics
                })
            }

        })

        // fetch(`${config.baseUrl}photo?user=${this.props.user.id}`, {
        //     method: 'GET',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        // })
        // .then(response => response.json())
        // .then(jsonResponse => {
        //     this.setState({profilePics: jsonResponse.data});
        // })
        // .catch(err => {
        //     alert(JSON.stringify(err.message))
        // })
    }



    render() {
        const third = Math.floor((Dimensions.get('window').width) / 3)
        // const allPics = this.props.user.photos.map(i => {
        //     return <Image source={{uri: `${i.url}=s${config.styleConstants.oneThirdWidth}-c`}} style={styles.profilePicThumb} key={i.id}/>
        // })

        const allPicsHard = ['https://lh3.googleusercontent.com/cqsHiJD-dQHd-pcR09k7zVhGuCGSNEUM83TS_VCUvmiuSGR09pTas1LUoBJiXiyNEb2B4V871FCReA0-lCy8msBB', 'https://lh3.googleusercontent.com/qseeEMGXqZRpChSmqukQFl4oacKymW8TaAB4Kk2dVLThR3cNrFrMlPGkMrupKSl_5rjN4oXw-kH1WxgC09Bt_aHn', 'https://lh3.googleusercontent.com/nxyFVPGP-Dcclac3hqG3j-npAuRXYaez5ICtWXn-GVG2qSuLWNJwEH5Lw8NyNWFLKAp5sBTzFE-gSBKkpwSgnJRUUw', 'https://lh3.googleusercontent.com/fd9iju0BULx8eeLY1hB8e7gtbyX5xPwX9gwgZ6oHgpdbEQ-UlvqSWw-WtlT6A1JfKVjNxyKQ7viKry181BnSywXJ9Q', 'https://lh3.googleusercontent.com/snyi2l0Q9_OnqE9eKt-yamN8Rc27SuRJ8mR8ZOr7BCrvSXqo9jD5LN-ZnFTPrZoABLnfZ9FxFrgTIREfQk8H5DowkvI', 'https://lh3.googleusercontent.com/7lVahz00mdzyAdCkKD6DzNq7hg1NdAfpCXiiiy-GG-0qvNC2wL9hCFJ_zFP8c9ggIHS2yOrIxVZzQULhk_Ag6w78XA', 'https://lh3.googleusercontent.com/iG9dsKXfhuCHN7nyxpXfVRyddSChz9VLmDcjY2limPiVQw6yg8up-ajy4iiAHHLrB8KxJyZE1yaSysYILXR1F5-BnQ', 'https://lh3.googleusercontent.com/MHoKSzIPZH7pW_KRxTpc4p3H6Bf7pv6sVYHNZf0KgvMXCEFpuOvRz_2u4hdlDvV24gaT6mnCv6G7qHDMLWKdID1lSA', 'https://lh3.googleusercontent.com/5qO3vHsMo8jWP-A_mIR5vVhJ-0IRDMYi9WxDeugQ17Br2gZBmK0Kap3xc0ZyU-lGdVbYz9W16HJEIwz3XtBnU-40qQ', 'https://lh3.googleusercontent.com/_k2G5jZb-XRdtbd1zyu4wSK5-KapIZcBP3UK3dwi5af9DVF_bhLB6PZQ0PGTbM0f5YGuk2dvK2s4OqSph9iApYoHuQ', 'https://lh3.googleusercontent.com/3o2ZehMgDwi1E-6IR5FW2RnG447PZPWekX_vmcHcwL5gpkrjuvzSMS74U8dTdPD_jpnpzIHGbCzq6NVOQsy7Zh3bkA', 'https://lh3.googleusercontent.com/O3oXuFlm2ycRR2j_T0QAC-Xo-Z9_cFdf8laS8y-Cf4pXCpH4KMbxO_xzPRKMpIhdhyiTfQtnh1GmMi6qrKI-Vm3eUaY', 'https://lh3.googleusercontent.com/42THX5R-XXTpYWMDH_cSzBNhdlWqej-tC2OzMNNGuZYPs_t6xeqk6TmHpquUlNjjmEYbbmZiwMC5A3fB7ITaQeDg0Q', 'https://lh3.googleusercontent.com/_EM3Uij-SqBp1w7nloml9lLcLN6gr3lzDbLwjymVskeRx3NmkCRbg9ptxGZgPhkyOf6ViIWSxZNsGh3tdLslUVEH', 'https://lh3.googleusercontent.com/_gSaKbng6GGuTP52i2VBI1voMYChMQzdn-IEenYgJEFlsLTiwwV2SC10E4XlClrqJZPyH1iBUALGI3q7fBb_mPyiIw', 'https://lh3.googleusercontent.com/8dRVmXgKS6wAclrugGYm16aygUW-gPQOaGW4BxcUMkhJw4vBhGtACmwmJi3592UHDmgik3ipt-4srL6g1Hrje5GUOg', 'https://lh3.googleusercontent.com/s_8d4YTiFgQjF5u-W-xUMfSzmqxexsns9xuQgKxY9bBC-3J3aHjlosi0WLPCYIoy_TeQh7Ret_kQVSjN_BR_jtKRcA', 'https://lh3.googleusercontent.com/4N2zdLA9jLU68LpgMgU5E_x-nt6BQrCO7Ou1gNSQLrwFlvYkfk2MQrBo25SHfzMpLDFtBa6JwrMm9x0zTJGpzrBfKQ'].map(i => {
            return <Image source={{uri: `${i}=s${config.styleConstants.oneThirdWidth}-c`}} style={styles.profilePicThumb} key={i.id}/>
        })

        return(
            <ScrollView>

            <View style={{width: 100 + '%', height: 30, borderBottom: StyleSheet.hairlineWidth}}></View>

            <View style={{flexDirection: 'row', width: 100 + '%', height: 50, borderTop: StyleSheet.hairlineWidth, borderColor: 'rgb(238, 238, 238)', backgroundColor: 'rgb(250, 250, 250)', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>davidh</Text>
            </View>

                <View style={styles.profileInfo}>

                    <View style={{flexDirection: 'row', width: 100 + '%'}}>

                        <View style={{flex: 3, height: 100, justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={{uri: 'https://lh3.googleusercontent.com/5evAirEX0kuSF0woxtgSXvJPWtbkacUfeOD14A6LdFYmB_1ntCqbzXV5q1DJdLpif-VHjKhSF93gxy-so3fB2rSzH9U=s80-c'}} style={{width: 80, height: 80, borderRadius: 40}}/>
                        </View>

                        <View style={{flex: 7, height: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{width: 100 + '%', height: 40, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20}}>
                                    <Text style={{fontWeight: 'bold'}}>154</Text>
                                    <Text style={{color: 'rgb(133, 133, 133)'}}>posts</Text>
                                </View>
                                <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                                    <Text style={{fontWeight: 'bold'}}>1256</Text>
                                    <Text style={{color: 'rgb(133, 133, 133)'}}>followers</Text>
                                </View>
                                <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginRight: 20}}>
                                    <Text style={{fontWeight: 'bold'}}>184</Text>
                                    <Text style={{color: 'rgb(133, 133, 133)'}}>following</Text>
                                </View>
                            </View>
                            <View style={{width: 90 + '%', height: 30, backgroundColor: 'rgb(238, 238, 238)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 16}}>Edit Profile</Text>
                            </View>
                        </View>

                    </View>

                    <View style={{flexDirection: 'column', width: 100 + '%', marginLeft: 10, marginBottom: 10}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>David H.</Text>
                        <Text style={{fontSize: 16}}>I ❤️coffee and dogs!! NYC🗽 </Text>
                    </View>

                </View>



                <View style={{flexDirection: 'row', width: 100 + '%', height: 50, justifyContent: 'space-around', alignItems: 'center'}}>

                        <Ionicons name="md-grid" size={32} color="#8c8cff" />
                        <Feather name="image" size={30} color="gray" style={{marginTop: -3}}/>
                        <MaterialIcons name="person-pin" size={32} color="gray" />

                </View>

                <View style={styles.profilePicContainer}>

                    {allPicsHard}
                </View>
            </ScrollView>

        )
    }
}
const styles = StyleSheet.create({
    profileInfo: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgb(238, 238, 238)',
        width: 100 + '%',
        display: 'flex',
        flexDirection: 'column'
    },
    profilePicContainer: {
        width: 100 + '%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    profilePicThumb: {
        width: config.styleConstants.oneThirdWidth,
        height: config.styleConstants.oneThirdWidth,
        marginBottom: 1
    }
})

const mapStateToProps = state => {
    return {
        user: state.account.user
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
