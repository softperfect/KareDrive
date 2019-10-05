import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight,TouchableOpacity} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export default class AccidentIPeopleScreen extends React.Component
{
  constructor(props){
    super(props)
    if(global.isPeople)
    {
      this.state =global.peopleData;
    }
    else {
    this.state = {full_name:"",address:'',  phone:'',car_reg_number:'',driver_is_owner:true,  witness:[],casualty:[],}
    this.state.witness.push( {key:0,full_name:'',address:'',phone:'',});
    this.state.casualty.push( {key:0,full_name:'',address:'',phone:'',});
    }
  }
  addTextInput = (key) => {
    let witness = this.state.witness;
    witness.push({key:key,full_name:'',address:'',phone:'',});
    this.setState({ witness:witness})
  }
  addTextInputCasualty = (key) => {
    let casualty = this.state.casualty;
    casualty.push({key:key,full_name:'',address:'',phone:'',});
    this.setState({ casualty:casualty})
  }

  removeTextInput = (key) => {
    let witness = this.state.witness;
    if(witness.length>1)
    {
      witness.splice(witness.length-1,1);
      this.setState({ witness:witness})
    }
  }
  removeTextInputCasualty = (key) => {
    let casualty = this.state.casualty;
    if(casualty.length>1)
    {
      casualty.splice(casualty.length-1,1);
      this.setState({ casualty:casualty})
    }

  }
  render() {
    var withnessList=[];

    for(let withness of this.state.witness)
    {
      withnessList.push(
        <View key={withness.key+'v1'}>
          <TextInput key={withness.key+'v2'} placeholderTextColor={'black'}
            value={withness.full_name}
            onChangeText={full_name=>{
              const newArray=this.state.witness[withness.key];
              newArray.full_name=full_name;
              //this.state.witness[withness.key]=newArray;
              this.setState({newArray})
              //alert(this.state.witness.length);

            }}
            underlineColorAndroid="transparent" style={styles.input} placeholder="Full Name" editable={true} />
          <TextInput key={withness.key+'v3'} placeholderTextColor={'black'}
            value={withness.address}
            onChangeText={address=>{
              const newArray=this.state.witness[withness.key];
              newArray.address=address;
              //this.state.witness[withness.key]=newArray;
              this.setState({newArray})
            }}
            underlineColorAndroid="transparent" style={styles.input} placeholder="Address" editable={true} />
          <TextInput key={withness.key+'v4'} placeholderTextColor={'black'}
            value={withness.phone}
            onChangeText={phone=>{
              const newArray=this.state.witness[withness.key];
              newArray.phone=phone;
              //this.state.witness[withness.key]=newArray;
              this.setState({newArray})
            }}
            underlineColorAndroid="transparent" style={styles.input} placeholder="Phone No." editable={true} />
        </View>)
    }

    var casualtyList=[];

    for(let casualtyItem of this.state.casualty)
    {
      casualtyList.push(
        <View key={casualtyItem.key+'vC1'}>
          <TextInput key={casualtyItem.key+'vC2'} placeholderTextColor={'black'}
            value={casualtyItem.full_name}
            onChangeText={full_name=>{
              const newArray=this.state.casualty[casualtyItem.key];
              newArray.full_name=full_name;
              //this.state.witness[withness.key]=newArray;
              this.setState({newArray})
              //alert(this.state.witness.length);

            }}
            underlineColorAndroid="transparent" style={styles.input} placeholder="Full Name" editable={true} />
          <TextInput key={casualtyItem.key+'vC3'} placeholderTextColor={'black'}
            value={casualtyItem.address}
            onChangeText={address=>{
              const newArray=this.state.casualty[casualtyItem.key];
              newArray.address=address;
              //this.state.witness[withness.key]=newArray;
              this.setState({newArray})
            }}
            underlineColorAndroid="transparent" style={styles.input} placeholder="Address" editable={true} />
          <TextInput key={casualtyItem.key+'vC4'} placeholderTextColor={'black'}
            value={casualtyItem.phone}
            onChangeText={phone=>{
              const newArray=this.state.casualty[casualtyItem.key];
              newArray.phone=phone;
              //this.state.witness[withness.key]=newArray;
              this.setState({newArray})
            }}
            underlineColorAndroid="transparent" style={styles.input} placeholder="Phone No." editable={true} />
        </View>)
    }
    return (
      <ScrollView style={styles.containerMain}>
        <Text style={styles.headerDate}>Third party driver:</Text>
        <TextInput placeholderTextColor={'black'}
          value={this.state.full_name}
          onChangeText={full_name=>this.setState({full_name})}
          underlineColorAndroid="transparent" style={styles.input} placeholder="Full Name" editable={true} />
        <TextInput placeholderTextColor={'black'}
          value={this.state.address}
          onChangeText={address=>this.setState({address})}
          underlineColorAndroid="transparent" style={styles.input} placeholder="Address" editable={true} />
        <TextInput placeholderTextColor={'black'}
          value={this.state.phone}
          onChangeText={phone=>this.setState({phone})}
          underlineColorAndroid="transparent" style={styles.input} placeholder="Phone No." editable={true} />
        <TextInput placeholderTextColor={'black'}
          value={this.state.car_reg_number}
          onChangeText={car_reg_number=>this.setState({car_reg_number})}
          underlineColorAndroid="transparent" style={styles.input} placeholder="Car registration No." editable={true} />
          <View style={styles.containerCheckbox}>

      <CheckBox  containerStyle={{backgroundColor: 'transparent',borderColor: 'transparent'}} style={{width: scale(180),marginLeft: moderateScale(10),backgroundColor: 'red'}}title="Driver is vehicle owner" checked={this.state.driver_is_owner}
        onPress={()=>
          this.setState({driver_is_owner:!this.state.driver_is_owner})}
         />
     </View>
          <View style={styles.containerRecord}flexDirection="row">
          <Text style={styles.headerDate}>Witnesses:</Text>
            <TouchableOpacity
               underlayColor='none'  onPress={() => this.addTextInput(this.state.witness.length)}>
          <Image source={require('./img/plus_icon.png')} style={styles.userIcon}/>
          </TouchableOpacity>
          <TouchableOpacity
             underlayColor='none'  onPress={() => this.removeTextInput(this.state.witness.length)}>
        <Image source={require('./img/remove.png')} style={styles.userIcon}/>
        </TouchableOpacity>
        </View>
          {withnessList}
          <View style={styles.containerRecord} flexDirection="row">

      <Text style={styles.headerDate}>Casualty details:</Text>
        <TouchableOpacity
           underlayColor='none'  onPress={() => this.addTextInputCasualty(this.state.casualty.length)}>
        <Image source={require('./img/plus_icon.png')} style={styles.userIcon}/>
        </TouchableOpacity>
        <TouchableOpacity
           underlayColor='none'  onPress={() => this.removeTextInputCasualty(this.state.casualty.length)}>
        <Image source={require('./img/remove.png')} style={styles.userIcon}/>
        </TouchableOpacity>
      </View>
        {casualtyList}

      <Button title="DONE" buttonStyle={{
            backgroundColor: "#3598DB",
            width: scale(320),
            height: verticalScale(50),
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 0,
            marginTop: verticalScale(10),
            marginBottom: verticalScale(50),
            marginLeft:moderateScale(0),
            marginRight:moderateScale(0),
          }}
            textStyle={{ fontWeight:'bold'}}
              onPress={()=>{
              //this.props.navigation.navigate('AccidentDetail')

              const{full_name,address,  phone,car_reg_number,driver_is_owner,  witness,casualty,}=this.state
              global.isPeople=true;
              const navigation = this.props.navigation;
              navigation.getParam('callback')();
                global.peopleData=this.state;
              this.props.navigation.navigate('AccidentDetail')

              //this.props.navigation.navigate('AccidentDetail')
              //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/ReportAccidentPeopleInvolved', {
              /*fetch(global.APIURL + 'ReportAccidentPeopleInvolved',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    'user_id':global.useId,
                    'case_id':global.case_id,
                    'full_name' : full_name,
                    'address' : address,
                    'phone' : phone,
                    'car_reg_number':car_reg_number,
                    'driver_is_owner':driver_is_owner,
                    'witness' : witness,
                    'casualty':casualty,
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
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  containerMain: {
    backgroundColor: '#E7F2FB',
    flex: 1,
  },

  containerRecord:
  {
    justifyContent: 'center'
  },
  userIcon: {
    width: moderateScale(45),
    height: moderateScale(45),
    marginTop:moderateScale(20),
    marginLeft:moderateScale(10),
  },
  containerCheckbox: {
    backgroundColor: 'transparent',
    width: scale(320),
    marginTop: moderateScale(10),
    marginLeft: moderateScale(5),

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
    paddingLeft: moderateScale(15),
    fontSize: moderateScale(14),


  },
  headerDate: {
    color: '#000000',
    fontSize: moderateScale(20),
    textAlign:'left',
    fontWeight: 'bold',
    marginLeft :  moderateScale(15),
    marginTop :  moderateScale(20),
    marginBottom: moderateScale(10),
    width:scale(220),
  },
});
