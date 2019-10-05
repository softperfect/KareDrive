import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox,SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export default class CarSearchInfoScreen extends React.Component
{
  constructor(props){
    super(props)
    this.state = {reg_number:'',   }

  }
  render() {

    const { navigation } = this.props;

    return (
      <ScrollView style={styles.containerMain}>
      <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
      value={this.state.reg_number}
      onChangeText={reg_number=>this.setState({reg_number})}
      style={styles.input} placeholder="Enter Registration Number" editable={true} />
    {(navigation.getParam('typeScreen', 'id')=='1') &&
      <View>
      <View flexDirection='row'>
        <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
        <Text style={styles.detailText}>Basic Data</Text>
      </View>
      <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
      <View flexDirection='row'>
       <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
      <Text style={styles.detailText}>Written Off</Text>
      </View>
      <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
      <View flexDirection='row'>
      <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
      <Text style={styles.detailText}>Stolen</Text>
      </View>
      <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
      <View flexDirection='row'>
      <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
      <Text style={styles.detailText}>Imported/Exported</Text>
      </View>
      <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
      <View flexDirection='row'>
      <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
      <Text style={styles.detailText}>Scrapped</Text>
      </View>
      <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
      <View flexDirection='row'>
      <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
      <Text style={styles.detailText}>VIn Check</Text>
      </View>
      <Button title="SILVER SEARCH - £1.49" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(320),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: moderateScale(100),
            marginBottom: moderateScale(20),
            marginLeft: scale(0),
          }}
          textStyle={{ fontWeight:'bold'}}
              onPress={()=>{
                const {reg_number}=this.state;
                this.props.navigation.navigate('CarSearchDownload',{typeScreen:reg_number,searchType:'Silver',badgeCount:global.notificationList.length})
              }}/>

              </View>
          }

          {(navigation.getParam('typeScreen', 'id')=='2') &&
            <View>
            <View flexDirection='row'>
              <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
              <Text style={styles.detailText}>All Key Data</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
            <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
            <Text style={styles.detailText}>MOT Checks</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
            <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
            <Text style={styles.detailText}>£30,000 Gurantee</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
             <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
            <Text style={styles.detailText}>Outstanding Finance</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
             <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
            <Text style={styles.detailText}>Log Book Loans Check</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
             <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
            <Text style={styles.detailText}>Vehicle Valuation</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
             <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
            <Text style={styles.detailText}>Written Off</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
            <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
            <Text style={styles.detailText}>Stolen</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
            <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
            <Text style={styles.detailText}>Imported/Exported</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
            <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
            <Text style={styles.detailText}>Scrapped</Text>
            </View>
            <Image source={require('./img/carsearchverticalline.png')} style={styles.verticleImage} />
            <View flexDirection='row'>
            <Image source={require('./img/carsearchtick.png')} style={styles.LeftArrowNavigation} />
            <Text style={styles.detailText}>VIn Check</Text>
            </View>


            <Button title="GOLD SEARCH - £8.49" buttonStyle={{
                  backgroundColor: "#3598DB",
                  width: scale(320),
                  height: verticalScale(50),
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 0,
                  marginTop: moderateScale(100),
                  marginBottom: moderateScale(20),
                  marginLeft: scale(0),
                }}
                textStyle={{ fontWeight:'bold'}}
                  onPress={()=>{
                      const {reg_number}=this.state;
                      this.props.navigation.navigate('CarSearchDownload',{typeScreen:reg_number,searchType:'Gold'})
                    }}/>
                      </View>
                }
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
  detailText: {
    color: '#000000',
    fontSize: 14,
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft :  moderateScale(20),
    width:scale(300),
    marginTop :  moderateScale(3),
  },
  LeftArrowNavigation:
  {
    marginLeft :  moderateScale(30),
    width: scale(20),
    height: verticalScale(22),
    resizeMode:'contain',
  },
  verticleImage:
  {
    marginLeft :  moderateScale(40),
    marginTop :  moderateScale(1),
    width: scale(1),
    height: verticalScale(40),
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
    marginBottom: moderateScale(30),
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
