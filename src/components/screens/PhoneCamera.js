import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Slider } from 'react-native'
import { Camera, Permissions } from 'expo'
import config from '../../config'
import Turbo from 'turbo360'
import {connect} from 'react-redux'

import {
  Ionicons,
  MaterialIcons,
  Entypo
} from '@expo/vector-icons';

//Eventually put 'toggle' after all these constants and call wb "white balance"
const flashOptions = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off'
}
const flashIconOptions = {
  off: 'flash-off',
  on: 'flash-on',
  auto: 'flash-auto',
  torch: 'highlight'
}
const flashIconColors = {
    off: 'black',
    on: 'yellow',
    auto: 'red',
    torch: '#777cff'
}
const whiteBalanceOptions = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto'
}
const whiteBalanceIconOptions = {
  auto: 'wb-auto',
  sunny: 'wb-sunny',
  cloudy: 'wb-cloudy',
  shadow: 'beach-access',
  fluorescent: 'wb-iridescent',
  incandescent: 'wb-incandescent'
}
const whiteBalanceIconColors = {
  auto: 'white',
  sunny: 'yellow',
  cloudy: 'blue',
  shadow: 'orange',
  fluorescent: 'green',
  incandescent: '#ff7f7f'
}
const faceDetectionBubbleColorBasedOnID = {
    0: 'white',
    1: 'red',
    2: 'yellow',
    3: 'green',
    4: '#777cff',
    5: 'gray',
    6: 'orange'
}

class PhoneCamera extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            zoomValue: 0,
            flash: 'off',
            whiteBalance: 'auto',
            faceDetecting: false,
            faces: [],
            autoFocus: 'on',
            focusDepth: 0
          }
    }

    async componentDidMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
    }

        toggleFlash = () => this.setState({ flash: flashOptions[this.state.flash] })

        toggleWB = () => this.setState({ whiteBalance: whiteBalanceOptions[this.state.whiteBalance] })

        toggleFaceDetection = () => this.setState({ faceDetecting: !this.state.faceDetecting })

        onFacesDetected = ({ faces }) => this.setState({ faces })
        onFaceDetectionError = state => console.warn('Faces detection error:', state)

        toggleFocus = () => this.setState({ autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on' })


        renderFace({ bounds, faceID, rollAngle, yawAngle }) {
            return (
              <View
                key={faceID}
                transform={[
                  { perspective: 600 },
                  { rotateZ: `${rollAngle.toFixed(0)}deg` },
                  { rotateY: `${yawAngle.toFixed(0)}deg` },
                ]}
                style={
                    {
                        padding: 10,
                        borderRadius: 1000,
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: (80-(Math.abs(rollAngle) + Math.abs(yawAngle)))/200,
                        ...bounds.size,
                        left: bounds.origin.x,
                        top: bounds.origin.y,
                        backgroundColor: faceDetectionBubbleColorBasedOnID[faceID % 7]
                    }
                }>

                  <View style={styles.crossBarHorizontal}></View>
                  <View style={styles.crossBarVericle}></View>

              </View>
            );
          }

          renderLandmarksOfFace(face) {
            const renderLandmark = position =>
              position && (
                <View
                  style={[
                    styles.landmark,
                    {
                      left: position.x - 1,
                      top: position.y - 1,
                    },
                  ]}
                />
              );
            return (
              <View key={`landmarks-${face.faceID}`}>
                {renderLandmark(face.leftEyePosition)}
                {renderLandmark(face.rightEyePosition)}
                {renderLandmark(face.leftEarPosition)}
                {renderLandmark(face.rightEarPosition)}
                {renderLandmark(face.leftCheekPosition)}
                {renderLandmark(face.rightCheekPosition)}
                {renderLandmark(face.leftMouthPosition)}
                {renderLandmark(face.mouthPosition)}
                {renderLandmark(face.rightMouthPosition)}
                {renderLandmark(face.noseBasePosition)}
                {renderLandmark(face.bottomMouthPosition)}
              </View>
            );
          }

          renderFaces = () =>
            <View style={styles.facesContainer} pointerEvents="none">
              {this.state.faces.map(this.renderFace)}
            </View>

          renderLandmarks = () =>
            <View style={styles.facesContainer} pointerEvents="none">
              {this.state.faces.map(this.renderLandmarksOfFace)}
        </View>

        snapPicture = async () => {
            if (this.camera) {
                const imageData = await this.camera.takePictureAsync({ quality: .5 })

                console.log(imageData)

                const turbo = Turbo({ site_id: '5cc46599686d430015471071'})
                const file = {
                    uri: imageData.uri,
                    name: 'camera_pic',
                    type: 'image/jpeg'
                }
                const apiKey = '88830abe-9831-48d1-8647-56e92f38f4dd' //for the CDN, which is the instaClone project, not the instaAPI
                const cdnResp = await turbo.uploadFile(file, apiKey)

                //console.log(cdnResp.result.url) //correct url response is coming back from CDN

                const resp = await fetch(
                    config.baseUrl + '/users/' + this.props.user.id + '/photo',
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({imageUrl: cdnResp.result.url})
                    }
                )

                const myjson = await resp.json()
                const { data } = myjson

                this.props.navigation.navigate('profile')
                console.log(myjson)
                }
            }

      render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
            <View style={{ flex: 1 }}>
              <Camera
                  ref={ref => { this.camera = ref; }}
                  style={{ flex: 1, alignItems: 'center' }}
                  type={this.state.type}
                  zoom={this.state.zoomValue}
                  flashMode={this.state.flash}
                  whiteBalance={this.state.whiteBalance}
                  onFacesDetected={this.state.faceDetecting ? this.onFacesDetected : undefined}
                  onFaceDetectionError={this.onFaceDetectionError}
                  autoFocus={this.state.autoFocus}
                  focusDepth={this.state.focusDepth}>

                <View style={styles.topBarContainer}>

                    <View style={styles.topBarLeft}>
                        <View style={styles.topBarIconsContainers}>
                            <TouchableOpacity onPress={this.toggleFlash}>
                                <MaterialIcons name={flashIconOptions[this.state.flash]} size={32} color={flashIconColors[this.state.flash]}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topBarIconsContainers}>
                            <TouchableOpacity onPress={this.toggleWB}>
                                <MaterialIcons name={whiteBalanceIconOptions[this.state.whiteBalance]} size={32} color={whiteBalanceIconColors[this.state.whiteBalance]} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topBarIconsContainers}>
                            <TouchableOpacity onPress={this.toggleFaceDetection}>
                                <MaterialIcons name={this.state.faceDetecting ? 'tag-faces' : 'landscape'} size={32} color={this.state.faceDetecting ? 'yellow' : '#777cff'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topBarIconsContainers}>
                            <TouchableOpacity onPress={this.toggleFocus}>
                                <MaterialIcons name='camera' size={32} color={this.state.autoFocus === 'on' ? 'red' : '#777cff'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.topBarRight}>
                        <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                            <Text style={styles.zoomAndFocusText}>Zoom: {(this.state.zoomValue * 100).toFixed(2)}</Text>
                            <Text style={this.state.autoFocus === 'on' ? styles.autoFocusText : [styles.zoomAndFocusText, {color: '#777cff'}]}>{this.state.autoFocus === 'on' ? 'Auto Focus' : `Focus: ${(this.state.focusDepth).toFixed(2)}`} </Text>
                        </View>
                    </View>

                </View>

                <View style={styles.zoomSliderContainer}>
                    <Slider style={styles.zoomSlider} minimumValue={.0} maximumValue={.08} value={0} onValueChange={e =>
                        {
                            this.setState(() => {
                                return {zoomValue: e}
                            })
                        }
                    }/>
                </View>

                <View style={styles.focusSliderContainer}>
                    <Slider style={[styles.focusSlider, {display: this.state.autoFocus === 'on' ? 'none' : 'flex'}]} minimumValue={0} maximumValue={1} value={0} onValueChange={e =>
                        {
                            this.setState(() => {
                                return {focusDepth: e}
                            })
                        }
                    }/>
                </View>

                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                  }}>

                      <View style={styles.buttonsContainer}>

                          <TouchableOpacity
                            style={[styles.buttons]}
                            onPress={() => {
                              this.setState({
                                type: this.state.type === Camera.Constants.Type.back
                                  ? Camera.Constants.Type.front
                                  : Camera.Constants.Type.back,
                              });
                            }}>
                                <Ionicons name="md-reverse-camera" size={56} color="red"/>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={[styles.buttons, {paddingHorizontal: 12}]}
                            onPress={this.snapPicture.bind(this)}>
                                <MaterialIcons name="camera-enhance" size={56} color="red"/>
                          </TouchableOpacity>

                          <TouchableOpacity //This is a dummy button for now
                            style={[styles.buttons]}
                            onPress={this.snapPicture.bind(this)}>
                                <Entypo name="video-camera" size={56} color="red"/>
                          </TouchableOpacity>

                     </View>

                </View>

              </Camera>
              {this.state.faceDetecting && this.renderFaces()}
              {this.state.faceDetecting && this.renderLandmarks()}
            </View>
          );
        }
      }
}

const styles = StyleSheet.create({
    topBarContainer: {
        flex: 1,
        flexDirection: 'row',
        width: 100 + '%',
        marginTop: 22,
        opacity: .5
    },
    topBarLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    topBarIconsContainers: {
        marginLeft: 10
    },
    topBarRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 4
    },
    zoomAndFocusText: {
        color: 'white',
        fontSize: 16,
        marginRight: 10
    },
    autoFocusText: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold'
    },
    zoomSliderContainer: {
        flex: 3,
        width: 100 + '%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        opacity: .5
    },
    zoomSlider: {
        width: 350,
        justifyContent: 'center',
        transform: [{rotateZ: '90deg'}, {rotateY: '180deg'}, {translateY: -150}, {translateX: 150}],
        opacity: .5
    },
    focusSliderContainer: {
        flex: 1,
        width: 100 + '%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        opacity: .5
    },
    focusSlider: {
        width: 300,
        justifyContent: 'center',
        opacity: .5
    },
    buttonsContainer: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        opacity: .8
    },
    buttons: {
        alignItems: 'center',
        opacity: .5,
        margin: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        paddingTop: 5,
        paddingHorizontal: 16
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        transform: [{translateY: -27}] //Need to yank this up exactly 27px to counter the bottom tab navigator, and using top: -27 was causing very strange latency issues with the zoom and focus sliders
      },
      face: {
        padding: 10,
        borderRadius: 1000,
        position: 'absolute',
        justifyContent: 'center',
        opacity: .3
      },
      landmark: {
        width: 2,
        height: 2,
        position: 'absolute',
        backgroundColor: 'red',
      },
      crossBarVericle: {
          width: 1,
          height: 100 + '%',
          backgroundColor: 'black'
      },
      crossBarHorizontal: {
          top: 50 + '%',
          width: 100 + '%',
          height: 1,
          backgroundColor: 'black'
      }
})

const mapStateToProps = state => {
    return {
        user: state.account.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //send back some function here that updates state to contain the new pic which is triggered by snapping the picture
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneCamera)
