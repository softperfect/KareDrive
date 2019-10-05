import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView, View,Image,ImageBackground,TextInput,TouchableHighlight} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import { Button,CheckBox,SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {Col,Row,Grid} from 'react-native-easy-grid';

export default class TrackParkingTicketScreen extends React.Component
{
  constructor(props,typeTicket){
    super(props)
    const { navigation } = this.props;

      this.state = {parkingListData:[],parkingListDataOri:[],typeTicket:navigation.getParam('typeTicket', 'id'),}
      var url='';
      if(this.state.typeTicket=='1')
      {
        url='TrackParkingTickets';
      }
      else {
        url='TrackCameraTickets';
      }
      //fetch('http://192.168.137.13:8080/DriveKareAdmin/api.php/TrackClaim', {
      fetch(global.APIURL + url,{
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
                            this.setState({parkingListData:responseJson.cases,parkingListDataOri:responseJson.cases})
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
      var searchClaim=this.state.parkingListDataOri.filter(parkingListDataOri=>
        parkingListDataOri.case_id.toString().includes(search) || parkingListDataOri.case_status.includes(search)
      || parkingListDataOri.case_datetime.toString().includes(search)|| parkingListDataOri.message.includes(search));
      this.setState({parkingListData:searchClaim});
    }
    else {
      this.setState({parkingListData:this.state.parkingListDataOri});
    }
  };
  render() {
    var parkingList=[];
    var intC=0;
    for(let parkingData of this.state.parkingListData)
    {
      parkingList.push(
        <View key={"View" + intC.toString()}>
        <Text key={"txtMain" + intC.toString()} style={styles.headerDate}>{parkingData.case_datetime} - Ticket #{parkingData.case_id} </Text>
        <View key={"SubView" + intC.toString()} flexDirection='row' styles={{marginBottom:24,marginTop:0}}>
          {(  parkingData.case_status=="Processing") &&
            <View style={styles.grid}>
            <Grid >
                <Col  style={{width:scale(80), borderRadius:5, backgroundColor: '#CCCA28',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                <Col  style={{width:scale(160),marginLeft:-3, borderRadius:5,backgroundColor: 'white',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
            </Grid>
            </View>}
          {(  parkingData.case_status=="Won") &&
            <View style={styles.grid}>
            <Grid >
                <Col  style={{width:scale(80), borderRadius:5, backgroundColor: '#CCCA28',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                <Col   style={{width:scale(80),marginLeft:-3,borderRadius:5,backgroundColor: 'orange',height:verticalScale(7)}} key={"1Col" + intC.toString()} />
                <Col  style={{width:scale(80),marginLeft:-3, borderRadius:5,backgroundColor: 'green',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
            </Grid>
            </View>
            }
          {(  parkingData.case_status=="Lost") &&
            <View style={styles.grid}>
            <Grid >
                <Col  style={{width:scale(80), borderRadius:5, backgroundColor: '#CCCA28',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                <Col   style={{width:scale(80),marginLeft:-3,borderRadius:5,backgroundColor: 'orange',height:verticalScale(7)}} key={"1Col" + intC.toString()} />
                <Col  style={{width:scale(80),marginLeft:-3, borderRadius:5,backgroundColor: 'black',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
            </Grid>
            </View>
            }

          {(  parkingData.case_status=="Pending") &&
            <View style={styles.grid}>
            <Grid >
                <Col  style={{width:scale(80), borderRadius:5, backgroundColor: '#008B8B',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                <Col  style={{width:scale(160),marginLeft:-3, borderRadius:5,backgroundColor: 'white',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
            </Grid>
            </View>
            }
          {(  parkingData.case_status=="Rejected") &&
            <View style={styles.grid}>
            <Grid >
                <Col  style={{width:scale(80), borderRadius:5, backgroundColor: 'black',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                <Col  style={{width:scale(160),marginLeft:-3, borderRadius:5,backgroundColor: 'white',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
            </Grid>
            </View>
            }
            {(  parkingData.case_status=="Info needed") &&
              <View style={styles.grid}>
              <Grid >
                  <Col  style={{width:scale(80), borderRadius:5, backgroundColor: '#CCCA28',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                    <Col  style={{width:scale(80), marginLeft:-3,borderRadius:5, backgroundColor: 'orange',height:verticalScale(7)}} key={"1Col" + intC.toString()} />
                    <Col  style={{width:scale(80),marginLeft:-3, borderRadius:5,backgroundColor: 'white',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
              </Grid>

              </View>
            }
              {(  parkingData.case_status=="Accepted") &&
                <View style={styles.grid}>
                <Grid >
                    <Col  style={{width:scale(80), borderRadius:5, backgroundColor: '#CCCA28',height:verticalScale(7)}} key={"Col" + intC.toString()} />
                      <Col  style={{width:scale(80), marginLeft:-3, borderRadius:5, backgroundColor: 'orange',height:verticalScale(7)}} key={"1Col" + intC.toString()} />
                      <Col  style={{width:scale(80),marginLeft:-3, borderRadius:5,backgroundColor: 'white',height:verticalScale(7)}}  key={"2Col" + intC.toString()} />
                </Grid>
                </View>
              }
        <Text key={"txtStatus" + intC.toString()} style={styles.statusText}>{parkingData.case_status}  </Text>
          <Text key={"txtMessage" + intC.toString()} style={styles.statusText}>{parkingData.message}  </Text>
      </View>
</View>)
    intC=intC+1;
    }
    return (
      <ScrollView style={styles.containerMain}>
        <SearchBar containerStyle ={{marginLeft:moderateScale(15),marginTop:moderateScale(20),
          marginRight:moderateScale(15),width:scale(320),
          flexDirection:'row-reverse',
          backgroundColor:'white',borderRadius: 2,borderWidth: 0,borderBottomColor:'transparent',borderTopColor:'transparent'}}
        style={{width:scale(320),marginTop:moderateScale(20),marginLeft:20,borderRadius: 2,borderWidth: 0,borderColor:'transparent'}}
        inputStyle={{flex:1,backgroundColor: 'transparent'}}
        placeholder="Search"
        icon={{type:'font-awesome',name:'search',marginLeft:100}}
          onChangeText={this.searchClaim}/>
        {parkingList}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#E7F2FB',
    flex: 1,
  },
  headerDate: {
    color: '#000000',
    fontSize: 12,
    textAlign:'center',
    fontWeight: 'normal',
    marginLeft :  20,
    marginTop :  20,
    marginBottom: 20,
    width:300,
  },
  grid: {
      width: scale(240),
      marginLeft: moderateScale(20),
      borderRadius:5,
      borderColor: 'transparent'
  },
  statusText: {
    color: '#000000',
    fontSize: 12,
    textAlign:'right',
    fontWeight: 'normal',
    marginLeft :  20,
    marginTop :  0,
    marginBottom: 0,
    width:scale(60),
  },
});
