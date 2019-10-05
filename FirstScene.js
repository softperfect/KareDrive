import React, {Component} from 'react';
import {Platform,StyleSheet, TouchableOpacity,Text,View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
//import {Switch} from 'react-native-customisable-switch';
import {ModelView} from 'react-native-3d-model-view';
import PropTypes from 'prop-types';
import ImageMarker from "react-native-image-marker";
//import {ModelView, ModelTypes} from 'react-native-3d-model-view';
import { Manager, ARManager } from 'react-native-3d-model-view';
import {captureScreen} from "react-native-view-shot";
import {
  ViroARScene,
  ViroScene,
  ViroImage,
  ViroAmbientLight,
  ViroARPlane,
  ViroMaterials,
  ViroNode,
  ViroUtils,
  ViroQuad,
  ViroSpotLight,
  Viro3DObject,
  ViroText,
  ViroAnimations,
  ViroARSceneNavigator,
} from 'react-viro';
var isARSupportedOnDevice = ViroUtils.isARSupportedOnDevice;

export default class FirstScene extends React.Component
{
  constructor() {
    super();


  }
  render()
  {
    ViroMaterials.createMaterials({
        face:{
          shininess : 2.0,
          lightingModel: "Blinn",
          diffuseTexture:require('./obj/model.jpg'),
        },
      });
    return (
      <ViroScene>
        <ViroImage
    height={1}
    width={1}
    source={require('./img/app_logo.png')}/>

</ViroScene>
    );
  }
}
