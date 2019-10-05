import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView,Text, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Dropdown } from 'react-native-material-dropdown';

export default class MyVehicleScreen extends React.Component
{
  constructor(props){
    super(props)
    this.state = {vehicleList:[],vehicle_company:'',vehicle_model:'',vehicle_colour:'',manufacture_year:'',vehicle_reg_number:'',}
    this.getVehicles();

  }

  getVehicles()
  {
    fetch(global.APIURL + 'MyVehicles?user_id='+global.useId,{
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  }).then((response) => response.json()).then((responseJson) => {
  if(responseJson.status)
  {

      this.setState({vehicleList:responseJson.vehicles})
  }
  else {
        alert(responseJson.msg);
  }
}).catch((error) => {
    alert(error);
});
}
removeVehicle(vehicle_id)
  {
    fetch(global.APIURL + 'RemoveUserVehicle',{
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                      'user_id':global.useId,
                      'vehicle_id':vehicle_id,
                    })
                  }).then((response) => response.json()).then((responseJson) => {

                          if(responseJson.status)
                        {
                          this.getVehicles();
                        }
                        else {
                          alert(responseJson.msg);
                        }
                      })
                      .catch((error) => {
                          alert(error);

                          //you will get error here.
                      });
  }
  render() {
    let make=[{
        value:'Jeep',
    },
    {
        value:'Maruti',
    },
    {
        value:'Honda',
    }]
    let model=[{
        value:'model1',
    },
    {
        value:'model2',
    },
    {
        value:'model3',
    }]
    let color=[{
        value:'Red',
    },
    {
        value:'Black',
    },
    {
        value:'White',
    },
    {
        value:'Silver',
    },
    {
        value:'Golden',
    }]

    let year=[{
        value:'2001',
    },
    {
        value:'2002',
    },
    {
        value:'2003',
    },
    {
        value:'2004',
    },
    {
        value:'2005',
    },
    {
        value:'2006',
    },
    {
        value:'2007',
    },
    {
        value:'2008',
    },
    {
        value:'2009',
    },
    {
        value:'2010',
    },
    {
        value:'2011',
    },
    {
        value:'2012',
    },
    {
        value:'2013',
    },
    {
        value:'2014',
    },
    {
        value:'2015',
    },
    {
        value:'2016',
    },
    {
        value:'2017',
    },
    {
        value:'2018',
    },
    {
        value:'2019',
    },
    {
        value:'2020',
    }

  ]

  var vehicles=[];
  var intC=0;
  for(let vehicle of this.state.vehicleList)
  {
    vehicles.push(
      <View key={"View" + intC.toString()} flexDirection='row' styles={{marginBottom:0,marginTop:10}}>
      <Text key={"txt" + intC.toString()} style={styles.vehicleName}> {vehicle.vehicle_reg_number} </Text>
      <Button key={"Button" + intC.toString()} title="REMOVE" buttonStyle={{
          backgroundColor: "#3598DB",
          width: scale(100),
          height: verticalScale(40),
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 0,
          marginTop: 10,
          }}
          onPress={()=>this.removeVehicle(vehicle.vehicle_id)}
          />

          </View>)
          intC=intC+1;
  }
    return (
      <ScrollView style={styles.containerMain}>
        {vehicles}

      <Text style={styles.headerDate}>Add Vehicle</Text>
        <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
          value={this.state.vehicle_company}
          onChangeText={vehicle_company=>this.setState({vehicle_company})}
          style={styles.input} placeholder="Make" editable={true} />
          <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
          value={this.state.vehicle_model}
          onChangeText={vehicle_model=>this.setState({vehicle_model})}
          style={styles.input} placeholder="Model" editable={true} />


          <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
          value={this.state.manufacture_year}
          onChangeText={manufacture_year=>this.setState({manufacture_year})}
          style={styles.input} placeholder="Year of Manufacture" editable={true} />

        <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
          value={this.state.vehicle_colour}
          onChangeText={vehicle_colour=>this.setState({vehicle_colour})}
          style={styles.input} placeholder="Colour" editable={true} />


      <TextInput placeholderTextColor={'black'} underlineColorAndroid="transparent"
        value={this.state.vehicle_reg_number}
        onChangeText={vehicle_reg_number=>this.setState({vehicle_reg_number})}
        style={styles.input} placeholder="Registration Number" editable={true} />

      <Button title="ADD" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(320),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: moderateScale(50),
            marginBottom: moderateScale(50),
            marginLeft: scale(0),
            }}
            onPress={()=>{
              const{vehicle_company,vehicle_model,vehicle_colour,manufacture_year,vehicle_reg_number}=this.state
              global.isPolice=true;
              const navigation = this.props.navigation;
              //navigation.getParam('callback')();
              //this.props.navigation.navigate('AccidentDetail')
              //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/ReportAccidentPoliceDetail', {
              fetch(global.APIURL + 'AddUserVehicle',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    'user_id':global.useId,
                    'vehicle_reg_number':vehicle_reg_number,
                    'vehicle_model' : vehicle_model,
                    'vehicle_company' : vehicle_company,
                    'manufacture_year' : manufacture_year,
                    'vehicle_colour' : vehicle_colour,

                  })
                }).then((response) => response.json()).then((responseJson) => {
                        if(responseJson.status)
                      {
                        //global.case_id=responseJson.case_id;

                        this.props.navigation.navigate('ProfileDetails')
                      }
                      else {
                        alert(responseJson.msg);
                      }
                    })
                    .catch((error) => {
                        alert(error);

                        //you will get error here.
                    });
            }}/>

    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#E7F2FB',
    flex: 1,
    height: 200,

  },
  vehicleName: {
    color: '#000000',
    fontSize: 15,
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft :  20,
    alignSelf: 'center',
    width:scale(200),
  },
  input:
  {
    paddingTop: moderateScale(1),
    paddingRight: 10,
    paddingBottom: moderateScale(1),
    paddingLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    marginLeft:moderateScale(15),
    marginRight:moderateScale(15),
    color: '#000000',
    width: scale(320),
    backgroundColor:'white',
    height:50,
  paddingLeft: moderateScale(15),

  },
  dropdown:
  {
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    marginLeft: moderateScale(15),
    width: scale(320),
    height: verticalScale(37),
    backgroundColor: 'white',
    borderColor: 'transparent',
    paddingLeft: moderateScale(15),
  },
  dropdownArrow:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    width: scale(320),
    height: verticalScale(40),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  dropdownText:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    width: scale(320),
    height: verticalScale(200),
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  headerDate: {
    color: '#000000',
    fontSize: 14,
    textAlign:'left',
    fontWeight: 'normal',
    marginLeft :  15,
    marginTop :  20,
    marginBottom: 0,
    width: scale(320),
  },
});
