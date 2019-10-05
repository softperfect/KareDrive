import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox,SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import RNFetchBlob from 'rn-fetch-blob'
const IS_IOS = Platform.OS === 'ios'

const { config, fs } = RNFetchBlob


export default class CarSearchHistoryScreen extends React.Component
{
  constructor(props){
    super(props)
    this.state = {carSearchHistory:[],}
    this.getCarSearchHistory();

  }

  getCarSearchHistory()
  {
    fetch(global.APIURL + 'GetCarSearchHistory?user_id='+global.useId,{
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  }).then((response) => response.json()).then((responseJson) => {
  if(responseJson.status)
  {

      this.setState({carSearchHistory:responseJson.carsearch_list})
  }
  else {
        alert(responseJson.msg);
  }
}).catch((error) => {
    alert(error);
});
}
downloadReport(vehicle_id,vehicleNo)
{
  let PictureDir = '';
  if (IS_IOS) {
    PictureDir=fs.dirs.DocumentDir; // this is the pictures directory. You can check the available directories in the wiki.
  }
  else {
    PictureDir=fs.dirs.PictureDir;
  }
  let options = {
  fileCache: true,
  appendExt:'pdf',
  path:PictureDir +"/" + vehicleNo + ".pdf",
}
config(options).fetch('GET', vehicle_id).then((res) => {
  // do some magic here

  //alert('Dowloaded on path ' +  res.path());
  this.props.navigation.navigate('ShowPDF',{typeScreen:'2',path:res.path()});

})
}
  render() {

    const { navigation } = this.props;
    var carSearchList=[];
    var intC=0;
    for(let carSearch of this.state.carSearchHistory)
    {
      carSearchList.push(
        <View key={"View" + intC.toString()} flexDirection='row' styles={{marginBottom:0,marginTop:10}}>
        <Text key={"txt" + intC.toString()}  style={styles.vehicleName}> {carSearch.vehicle_search} </Text>
          <TouchableHighlight key={"touch" + intC.toString()}  underlayColor='transparent'  onPress={()=>this.downloadReport(carSearch.pdf_file_name,carSearch.vehicle_search)}>
            <Text key={"txtTouch" + intC.toString()}  style={styles.logoText}>DOWNLOAD REPORT</Text>
          </TouchableHighlight>
            </View>)
            intC=intC+1;
    }
    return (
      <ScrollView style={styles.containerMain}>
      {carSearchList}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#3598DB',
    resizeMode:'stretch'
  },
  vehicleName: {
    color: '#000000',
    fontSize: 15,
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft :  15,
    alignSelf: 'center',
    width:scale(200),
  },
  logoText:
  {
    backgroundColor: "transparent",
    color: '#3598DB',
    width: scale(100),
    height: verticalScale(40),
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 0,
    marginTop: moderateScale(10),
    textAlign: 'center',
    paddingTop: moderateScale(5),
  },
  containerMain: {
    backgroundColor: '#E7F2FB',
    flex: 1,
  },
  logoBackGround: {
    marginLeft: 15,
    marginRight:  15,
    marginTop: 20,
    width: 150,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',

  },
  backGroundImage: {

    alignItems: 'center',
    backgroundColor: '#3598DB',
    flexGrow: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  MainScreenIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    width: 45,
    height: 45,
    marginTop:10,
  },
  searchIcon:
  {
    padding: 10,
  },
  input:
  {
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(20),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    marginLeft:moderateScale(15),
    marginRight:moderateScale(15),
  color: '#000000',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(50),


  },
  headerDate: {
    color: '#000000',
    fontSize: 12,
    textAlign:'center',
    fontWeight: 'normal',
    marginLeft :  15,
    marginTop :  20,
    marginBottom: 20,
    width:300,
  },
  statusText: {
    color: '#000000',
    fontSize: 12,
    textAlign:'right',
    fontWeight: 'normal',
    marginLeft :  15,
    marginTop :  0,
    marginBottom: 0,
    width:100,
  },
});
