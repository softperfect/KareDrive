import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class AccidentPoliceScreen extends React.Component
{
  constructor(props){
    super(props)
    if(global.isPolice)
    {
      this.state =global.policeData;
    }
    else {
    this.state = {full_name:'',  collar_number:'',police_station_name:'',crime_ref_number:''}
    }
  }
  render() {
    return (
      <View style={styles.containerMain}>

        <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
          value={this.state.full_name}
          onChangeText={full_name=>this.setState({full_name})}
          style={styles.input} placeholder="Full Name" editable={true} />
        <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
          value={this.state.collar_number}
          onChangeText={collar_number=>this.setState({collar_number})}
           style={styles.input} placeholder="Collar Number" editable={true} />
        <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
          value={this.state.police_station_name}
          onChangeText={police_station_name=>this.setState({police_station_name})}
           style={styles.input} placeholder="Crime Reference No" editable={true} />
        <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
          value={this.state.crime_ref_number}
        onChangeText={crime_ref_number=>this.setState({crime_ref_number})}
        style={styles.input} placeholder="Police Station Name" editable={true} />

        <Button title="DONE" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(320),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginLeft:moderateScale(0),
            marginRight:moderateScale(0),
            marginTop: verticalScale(200),
            }}
            textStyle={{ fontWeight:'bold'}}
              onPress={()=>{
              const{full_name,collar_number,  police_station_name,crime_ref_number}=this.state
              global.isPolice=true;
              const navigation = this.props.navigation;
              navigation.getParam('callback')();
              global.policeData=this.state;
              this.props.navigation.navigate('AccidentDetail')

              //navigation.getParam('callback')();
              //this.props.navigation.navigate('AccidentDetail')
              //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/ReportAccidentPoliceDetail', {
            /*  fetch(global.APIURL + 'ReportAccidentPoliceDetail',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    'user_id':global.useId,
                    'case_id':global.case_id,
                    'full_name' : full_name,
                    'collar_number' : collar_number,
                    'police_station_name' : police_station_name,
                    'crime_ref_number' : crime_ref_number,
                  })
                }).then((response) => response.json()).then((responseJson) => {
                        if(responseJson.status)
                      {
                        //global.case_id=responseJson.case_id;
                        navigation.getParam('callback')();
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
    </View>
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
  input:
  {
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(5),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    marginLeft:moderateScale(15),
    marginRight:moderateScale(15),
    color: '#000000',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(50),
    paddingLeft: moderateScale(15),
    fontSize: moderateScale(14),


  },
  headerDate: {
    color: '#000000',
    fontSize: 18,
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft :  moderateScale(15),
    marginTop :  moderateScale(15),
    marginBottom: 0,
  },
});
