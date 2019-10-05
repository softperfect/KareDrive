import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox,SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {Col,Row,Grid} from 'react-native-easy-grid';

export default class ClaimTrackScreen extends React.Component
{
  constructor(props){
    super(props)
      this.state = {claimData:[],claimDataOri:[],}
      //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/TrackClaim', {
      fetch(global.APIURL + 'TrackClaim',{
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                        'user_id':global.useId,
                      })
                    }).then((response) => response.json()).then((responseJson) => {
                            if(responseJson.status)
                          {
                            this.setState({claimData:responseJson.cases,claimDataOri:responseJson.cases})
                              //alert(this.state.claimData.length);
                            //global.case_id=responseJson.case_id;

                            //this.props.navigation.navigate('Main')
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
  searchClaim=search=>{
    if(search.length>0)
    {
      var searchClaim=this.state.claimDataOri.filter(claimDataOri=>
        claimDataOri.case_id.toString()==search || claimDataOri.case_status.toString()==search
      || claimDataOri.case_datetime.toString()==search);
      this.setState({claimData:searchClaim});
    }
    else {
      this.setState({claimData:this.state.claimDataOri});
    }
  };
  render() {
    var caseList=[];
    var intC=0;
    for(let caseData of this.state.claimData)
    {
      caseList.push(
        <View key={"View" + intC.toString()}>
        <Text key={"txtMain" + intC.toString()} style={styles.headerDate}>{caseData.case_datetime} - Claim #{caseData.case_id} </Text>
        <View key={"SubView" + intC.toString()}
          flexDirection='row' styles={{marginBottom:24,marginTop:0,justifyContent:'center'}}>

            {(  caseData.case_status=="Processing") &&
              <View style={styles.grid}>
              <Grid >
                  <Col  style={{width:scale(80), borderRadius:5, backgroundColor: '#CCCA28',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                  <Col  style={{width:scale(160),marginLeft:-3, borderRadius:5,backgroundColor: 'white',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
              </Grid>
              </View>}
            {(  caseData.case_status=="Won") &&
              <View style={styles.grid}>
              <Grid >
                  <Col  style={{width:scale(80), borderRadius:5, backgroundColor: '#CCCA28',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                  <Col   style={{width:scale(80),marginLeft:-3,borderRadius:5,backgroundColor: 'orange',height:verticalScale(7)}} key={"1Col" + intC.toString()} />
                  <Col  style={{width:scale(80),marginLeft:-3, borderRadius:5,backgroundColor: 'green',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
              </Grid>
              </View>
              }
            {(  caseData.case_status=="Lost") &&
              <View style={styles.grid}>
              <Grid >
                  <Col  style={{width:scale(80), borderRadius:5, backgroundColor: '#CCCA28',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                  <Col   style={{width:scale(80),marginLeft:-3,borderRadius:5,backgroundColor: 'orange',height:verticalScale(7)}} key={"1Col" + intC.toString()} />
                  <Col  style={{width:scale(80),marginLeft:-3, borderRadius:5,backgroundColor: 'black',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
              </Grid>
              </View>
              }

            {(  caseData.case_status=="Pending") &&
              <View style={styles.grid}>
              <Grid >
                  <Col  style={{width:scale(80), borderRadius:5, backgroundColor: '#008B8B',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                  <Col  style={{width:scale(160),marginLeft:-3, borderRadius:5,backgroundColor: 'white',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
              </Grid>
              </View>
              }
            {(  caseData.case_status=="Rejected") &&
              <View style={styles.grid}>
              <Grid >
                  <Col  style={{width:scale(80), borderRadius:5, backgroundColor: 'black',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                  <Col  style={{width:scale(160),marginLeft:-3, borderRadius:5,backgroundColor: 'white',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
              </Grid>
              </View>
              }
              {(  caseData.case_status=="Info needed") &&
                <View style={styles.grid}>
                <Grid >
                    <Col  style={{width:scale(80), borderRadius:5, backgroundColor: '#CCCA28',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                      <Col  style={{width:scale(80), marginLeft:-3,borderRadius:5, backgroundColor: 'orange',height:verticalScale(7)}} key={"1Col" + intC.toString()} />
                      <Col  style={{width:scale(80),marginLeft:-3, borderRadius:5,backgroundColor: 'white',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
                </Grid>
                </View>
                }
                {(  caseData.case_status=="Accepted") &&
                  <View style={styles.grid}>
                  <Grid >
                      <Col  style={{width:scale(80), borderRadius:5, backgroundColor: '#CCCA28',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                        <Col  style={{width:scale(80), borderRadius:5, backgroundColor: 'orange',height:verticalScale(7)}} key={"1Col" + intC.toString()} />
                        <Col  style={{width:scale(80),marginLeft:-3,marginLeft:-3, borderRadius:5,backgroundColor: 'white',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
                  </Grid>
                  </View>
                }
        <Text style={styles.statusText}>{caseData.case_status}  </Text>
          <Text style={styles.statusText}>{caseData.message}  </Text>
      </View>
</View>)
  intC=intC+1;
    }
    return (
      <ScrollView style={styles.containerMain}>
        <SearchBar inputStyle ={{backgroundColor:'white'}}
          inputContainerStyle ={{backgroundColor:'white'}}
          containerStyle ={{marginLeft:moderateScale(15),marginTop:moderateScale(20),
            marginRight:moderateScale(15),width:scale(320),
            flexDirection:'row-reverse',
            backgroundColor:'white',borderRadius: 2,borderWidth: 0,borderBottomColor:'transparent',borderTopColor:'transparent'}}
          style={{width:scale(320),marginTop:moderateScale(20),marginLeft:20,borderRadius: 2,borderWidth: 0,borderColor:'transparent'}}
          inputStyle={{flex:1,backgroundColor: 'transparent'}}
          placeholder="Search"
          icon={{type:'font-awesome',name:'search',marginLeft:100}}
          onChangeText={this.searchClaim}/>
        {caseList}
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
  grid: {
      width: scale(240),
      marginLeft: moderateScale(15),
      borderRadius:5,
      borderColor: 'transparent'
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
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft:15,
    color: '#000000',
    width: 340,
    backgroundColor:'white',
    height:50,


  },
  headerDate: {
    color: '#000000',
    fontSize: 12,
    textAlign:'center',
    fontWeight: 'normal',
    marginLeft : moderateScale(15),
    marginTop :  moderateScale(20),
    marginBottom: moderateScale(20),
    width:scale(300),
  },
  statusText: {
    color: '#000000',
    fontSize: 12,
    textAlign:'right',
    fontWeight: 'normal',
    marginLeft :  15,
    marginTop :  0,
    marginBottom: 0,
    width:scale(60),
  },
});
