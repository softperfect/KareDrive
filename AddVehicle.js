import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight,TouchableOpacity} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class AddVehicleScreen extends React.Component
{
  constructor(props){
    super(props)
    this.state = {vehicleDetails:[],}
    this.state.vehicleDetails.push( {key:0,vehicle_company:'Make',vehicle_model:'Modal',vehicle_colour:'Colour',manufacture_year:'Year of Manufacture',vehicle_reg_number:'',});

  }
  componentDidMount()
  {

  }
  addTextInput = (key) => {
    let vehicleDetails = this.state.vehicleDetails;
    vehicleDetails.push({key:key,vehicle_company:'Make',vehicle_model:'Modal',vehicle_colour:'Colour',manufacture_year:'Year of Manufacture',vehicle_reg_number:'',});
    this.setState({ vehicleDetails:vehicleDetails})
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

  var vehicleList=[];

  for(let vehicle of this.state.vehicleDetails)
  {
    vehicleList.push(
      <View key={vehicle.key+'v1'}>


          <TextInput key={vehicle.key+'v51'} placeholderTextColor={'black'} underlineColorAndroid="transparent"
            value={this.state.vehicle_company}
            onChangeText={vehicle_company=>{
              const newArray=this.state.vehicleDetails[vehicle.key];
              newArray.vehicle_company=vehicle_company;
              this.setState({newArray})
            }}
            style={styles.input} placeholder="Make" editable={true} />


          <TextInput key={vehicle.key+'v52'} placeholderTextColor={'black'} underlineColorAndroid="transparent"
            value={this.state.vehicle_model}
            onChangeText={vehicle_model=>{
              const newArray=this.state.vehicleDetails[vehicle.key];
              newArray.vehicle_model=vehicle_model;
              this.setState({newArray})
            }}
            style={styles.input} placeholder="Model" editable={true} />

          <TextInput key={vehicle.key+'v3'} placeholderTextColor={'black'} underlineColorAndroid="transparent"
              value={this.state.manufacture_year}
              onChangeText={manufacture_year=>{
                const newArray=this.state.vehicleDetails[vehicle.key];
                newArray.manufacture_year=manufacture_year;
                this.setState({newArray})
              }}
              style={styles.input} placeholder="Year of Manufacture" editable={true} />
        <TextInput key={vehicle.key+'v3'} placeholderTextColor={'black'} underlineColorAndroid="transparent"
            value={this.state.vehicle_colour}
            onChangeText={vehicle_colour=>{
              const newArray=this.state.vehicleDetails[vehicle.key];
              newArray.vehicle_colour=vehicle_colour;
              this.setState({newArray})
            }}
            style={styles.input} placeholder="Colour" editable={true} />


        <TextInput key={vehicle.key+'v5'} placeholderTextColor={'black'} underlineColorAndroid="transparent"
          value={this.state.vehicle_reg_number}
          onChangeText={vehicle_reg_number=>{
            const newArray=this.state.vehicleDetails[vehicle.key];
            newArray.vehicle_reg_number=vehicle_reg_number;
            this.setState({newArray})
          }}
          style={styles.input} placeholder="Registration Number" editable={true} />
      </View>)
  }

    return (
      <ScrollView style={styles.containerMain}>

          {vehicleList}
          <View style={styles.container} alignItems='center' flexDirection="row">
            <Text style={styles.headerDate2}>ADD MORE VEHICLES</Text>
              <TouchableOpacity
                 underlayColor='none'  onPress={() => this.addTextInput(this.state.vehicleDetails.length)}>
              <Image source={require('./img/plus_icon.png')} style={styles.userIcon}/>
            </TouchableOpacity>
          </View>

        <Button title="DONE" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(300),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: moderateScale(20),
            marginBottom: moderateScale(30),
            marginLeft:moderateScale(0),
            marginRight:moderateScale(0),


          }}
          onPress={() => {  const navigation = this.props.navigation;
              navigation.getParam('callback')(this.state.vehicleDetails);
              navigation.navigate('SignUp');}}
          />
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    resizeMode:'stretch'
  },
  containerMain: {
    flexDirection: 'row',
    flex: 1,
    flexWrap:'wrap',
    resizeMode:'stretch',
    backgroundColor: '#E7F2FB',

  },
  userIcon: {
    width: moderateScale(45),
    height: moderateScale(45),
    marginTop:moderateScale(20),
  },
  input:
  {
    paddingTop: moderateScale(1),
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(5),
    marginTop: moderateScale(20),
    marginLeft:moderateScale(15),
    marginRight:moderateScale(15),
    color: 'black',
    width: scale(320),
    backgroundColor:'white',
    height:verticalScale(40),


  },
  dropdown:
  {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(15),
    marginRight:moderateScale(15),
    width: scale(320),
    height: verticalScale(37),
    backgroundColor: 'white',
    borderColor: 'transparent',
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
  headerDate2: {
    color: '#000000',
    fontSize: moderateScale(18),
    textAlign:'center',
    fontWeight: 'bold',
    marginLeft:  moderateScale(15),
    marginRight:  moderateScale(10),
    marginBottom: moderateScale(20),
    marginTop:  moderateScale(30),

  },
});
