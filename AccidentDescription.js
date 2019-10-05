import React, {Component} from 'react';
import {Platform,PermissionsAndroid, StyleSheet, Text, ScrollView,View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import MapView, { Marker, ProviderPropType,PROVIDER_GOOGLE } from 'react-native-maps';
import RNLocation from 'react-native-location';
const IS_IOS = Platform.OS === 'ios'

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0922;
let id = 0;

export default class AccidentDescriptionScreen extends React.Component
{
  constructor(props){
    super(props)
    if(global.isDescription)
    {
      this.state =global.descriptionData;
    }
    else {
      this.state = {datetime:"2019-01-01 12:00:00",description:'',textLength:0,  address:'cxcxzczc',
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        markers: [],
      }
    }
    RNLocation.configure({distanceFilter:5.0});

    if(IS_IOS)
    {
    RNLocation.requestPermission({ios:'whenInUse',android:{detail:'coarse'}}).then
    (granted=>{
      if(granted)
        {

          RNLocation.getLatestLocation({timeout:60000}).then(latestLocation=>{
            //alert(latestLocation.latitude);
          //  this.state.region.latitude=latestLocation.latitude;
            //this.state.region.longitude=latestLocation.longitude;
            this.setState({region:{latitude:latestLocation.latitude,longitude:latestLocation.longitude,latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA}});
            this.setState({address:latestLocation.latitude + ' ' + latestLocation.longitude});
          this.setState({
            markers: [
              {
                coordinate: latestLocation,
                key: `foo${id++}`,
              },
            ],
          });
          })
        }
    })
  }
  else {
    //alert("ok1");
    PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION ).then
    (

      granted=>{
        try {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Drive Kare',
              'message': 'Drive Kare access to your location '
            }
          ).then
          (
            granted=>{
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                RNLocation.getLatestLocation({timeout:60000}).then(latestLocation=>{
                //alert(latestLocation.latitude);
                //  this.state.region.latitude=latestLocation.latitude;
                //this.state.region.longitude=latestLocation.longitude;
                this.setState({region:{latitude:latestLocation.latitude,longitude:latestLocation.longitude,latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA}});
                this.setState({address:latestLocation.latitude + ' ' + latestLocation.longitude});
                this.setState({
                  markers: [
                    {
                      coordinate: latestLocation,
                      key: `foo${id++}`,
                    },
                  ],
                });
              })
            } else {
              console.log("location permission denied")
              alert("Location permission denied");
            }
          })
      }
      catch (err) {
        console.warn(err)
      }
    }
  )
}

   this.onMapPress = this.onMapPress.bind(this);

}
onChangeText(text)
{
  this.setState({textLength:200-text.length,description:text})

}
onMapPress(e) {
    //alert(e.nativeEvent.coordinate.latitude)
    //  this.setState({address:e.nativeEvent.coordinate});
      this.setState({address:e.nativeEvent.coordinate.latitude + ' ' + e.nativeEvent.coordinate.longitude});
      this.setState({
      markers: [
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++}`,
        },
      ],
    });

  }
  render() {
    return (
      <ScrollView style={styles.containerMain}>



        <Text style={styles.headerDate}>Date and time of accident?</Text>
          <DatePicker
         style={{width: scale(335),}}
         mode="datetime"
         date={this.state.datetime}
         placeholder=" "
         format="YYYY-MM-DD HH:mm:ss"
         minDate="2000-01-01 12:00:00"
         maxDate="2099-12-31 12:00:00"
         confirmBtnText="Confirm"
         cancelBtnText="Cancel"
         value={this.state.datetime}
         onDateChange={(date)=>{this.setState({datetime:date})}}
        customStyles={{
           dateInput: {
             marginLeft: moderateScale(15),
             width:scale(300),
             height:verticalScale(50),
             borderColor:'transparent',
             backgroundColor:'white',
             justifyContent: 'flex-start',
             alignItems: 'flex-start',
             paddingTop: moderateScale(15),
           },
            dateText:{
              textAlign: 'left',
              fontSize: 18,
              color: '#000'
            },
           dateIcon: {
             position: 'absolute',
             left: scale(285),
             top: scale(2),
             marginLeft: 0,
             backgroundColor:'#FC3AE3',
             height:verticalScale(32),
             width:scale(40),
             resizeMode:'contain',
             borderRadius:moderateScale(20),
             borderRadius:scale(20),
           }

           // ... You can check the source to find the other keys.
         }}
       />

        <Text style={styles.headerDate}>Describe what happened</Text>
          <Text style={{fontSize:12,color:'black',textAlign: 'right',marginRight:moderateScale(20) }}>
            Character Left:{this.state.textLength}
          </Text>
        <TextInput placeholderTextColor={'black'}
          value={this.state.description}
          underlineColorAndroid="transparent" style={styles.input} multiline={true} editable={true} maxLength={200}
          onChangeText={this.onChangeText.bind(this)}/>


        <Text style={styles.offenceCodeText}>Pick Accident Location</Text>
            <MapView
            provider={PROVIDER_GOOGLE}
                 style={styles.map}
               initialRegion={this.state.region}
               region={this.state.region}
               onPress={this.onMapPress}
             >
             {this.state.markers.map(marker => (
            <Marker
            coordinate={marker.coordinate}
            key={marker.key}
            />))}
             </MapView>
        <Button title="DONE" buttonStyle={{
              backgroundColor: "#3598DB",
              width: scale(320),
              height: verticalScale(50),
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 0,
              marginTop: verticalScale(30),
              marginBottom: verticalScale(50),
              marginLeft:moderateScale(0),
              marginRight:moderateScale(0),

              }}
              textStyle={{ fontWeight:'bold'}}
                onPress={()=>{
                //global.case_id=1111;
                const navigation = this.props.navigation;
                navigation.getParam('callback')();
                  global.isDescription=true;
                global.descriptionData=this.state;
                this.props.navigation.navigate('AccidentDetail')
                //const{datetime,description,address}=this.state
              //  const navigation = this.props.navigation;
                //navigation.getParam('callback')();
                //this.props.navigation.navigate('AccidentDetail')*/
                //const dateTime =this.state.datetime;
                //alert(datetime);
                //alert(description);
                //alert(address);
                //alert(global.useId);
                //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/ReportAccidentDescription', {

                  /*fetch(global.APIURL + 'ReportAccidentDescription',{
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                      'user_id':global.useId,
                      'case_datetime' : datetime,
                      'description': description,
                      'address':address
                    })
                  }).then((response) => response.json()).then((responseJson) => {
                        if(responseJson.status)
                        {
                          global.case_id=responseJson.case_id;
                          const{datetime,description,address}=this.state
                          const navigation = this.props.navigation;
                          navigation.getParam('callback')();
                          //this.props.navigation.navigate('AccidentDetail')
                          this.props.navigation.navigate('AccidentDetail')
                        }
                        else {
                          alert(responseJson.msg);
                        }
                      })
                      .catch((error) => {
                          alert(error);

                          //you will get error here.
                      });*/
                }}/>

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
  map: {
    marginLeft: moderateScale(15),
    marginRight: moderateScale(15),
    marginTop: moderateScale(20),
    height: verticalScale(200),
      width: scale(320)
  },
  containerMain: {
    backgroundColor: '#E7F2FB',
    flex: 1,

  },
  logoBackGround: {
    marginLeft: moderateScale(15),
    marginRight:  moderateScale(15),
    marginTop: moderateScale(20),
    width: scale(150),
    height: verticalScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',

  },
  backGroundImage: {

    alignItems: 'center',
    backgroundColor: '#3598DB',
    flexGrow: 1,
  },
  offenceCodeText: {
    color: '#000000',
    fontSize: moderateScale(20),
    textAlign:'left',
    fontWeight: 'normal',
    width: scale(335),
    marginTop:  moderateScale(20),
    marginLeft:  moderateScale(15),
    marginRight:  moderateScale(20),
  },
  welcome: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    margin: moderateScale(10),
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: moderateScale(5),
  },
  logoImage: {
    width: scale(200),
    height: verticalScale(200),
  },
  MainScreenIcon: {
    width: scale(50),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon:
  {
    padding: moderateScale(10),
  },
  input:
  {
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(20),
    marginLeft:moderateScale(15),
    marginRight:moderateScale(15),
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
    color: 'black',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(150),
    textAlignVertical:'top',

  },
  headerDate: {
    color: '#000000',
    fontSize: moderateScale(18),
    textAlign:'left',
    fontWeight: 'normal',
    marginTop:  moderateScale(20),
    marginLeft:  moderateScale(15),
    marginRight:  moderateScale(20),
    marginBottom:  moderateScale(15)
  },

});
