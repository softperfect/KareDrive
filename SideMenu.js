import React, { Component } from 'react';
import { ScrollView, View, Text,Image,ImageBackground ,TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import styles from './SideMenu.style';
import IconBadge from 'react-native-icon-badge';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

//import NotificationBadge from 'react-notification-badge';
//import {Effect} from 'react-notification-badge';
export default class Drawer extends Component {
  constructor(props){
    super(props)
    this.state = {BadgeCount:global.notificationList.length}
  }
  render() {
    //const {count}=this.props.navigator.state.params;
    //alert("ok");
    if(global.useId>0)
    {



}

    return (

        <View style={styles.containerMain}>
          <ImageBackground style={styles.backGroundImage}  resizeMode='contain' source={require('./img/app_logo.png')} >
            <ScrollView style={{backgroundColor:'#3598DB99' , width:'100%'}}>
              <TouchableOpacity underlayColor='none' onPress={()=>{this.props.navigation.closeDrawer()}}>
                 <Image source={require('./img/close_icon.png')}  style={styles.crossImage} />
              </TouchableOpacity>
                <TouchableOpacity underlayColor='none'
                   onPress={()=>{this.props.navigation.navigate('NotificationDetail',{badgeCount:global.notificationList.length})}}>
                   <IconBadge
                MainElement={
                  <View tyle={styles.sectionNotificationStyle}>
                    <Text style={styles.navItemNotificationStyle} >
                      Notifications
                    </Text>
                  </View>
                }
                BadgeElement={

                  <Text style={{color:'#FFFFFF'}} >{global.notificationList.length}</Text>
                }
                IconBadgeStyle={
                  {
                    width:30,
                  height:30,
                  marginTop:moderateScale(15),
                  marginRight:  moderateScale(15),
                  backgroundColor: '#FF0000'}
                }
                Hidden={global.notificationList.length==0}/>
            </TouchableOpacity >
              <View tyle={styles.sectionHeadingStyle}>
             <Text style={styles.navItemStyle} onPress={()=>{ this.props.navigation.navigate('ProfileDetails',{badgeCount:global.notificationList.length})}}>
              My Profile
             </Text>
           </View>
           <View tyle={styles.sectionHeadingStyle}>

           <Text style={styles.navItemStyle} onPress={()=>{ this.props.navigation.navigate('Subscription',{badgeCount:global.notificationList.length})}}>
                  Subscriptions
              </Text>
            </View>
            <View tyle={styles.sectionHeadingStyle}>
               <Text style={styles.navItemStyle} onPress={()=>{ this.props.navigation.navigate('Settings',{badgeCount:global.notificationList.length})}} >
                Settings
              </Text>
            </View>
            <View tyle={styles.sectionHeadingStyle}>
               <Text style={styles.navItemStyle} onPress={()=>{ this.props.navigation.navigate('ContactUs',{badgeCount:global.notificationList.length})}}>
              Contact Us
            </Text>
          </View>
          <View tyle={styles.sectionHeadingStyle}>
             <Text style={styles.navItemStyle} onPress={()=>{ this.props.navigation.navigate('InviteFriend',{badgeCount:global.notificationList.length})}}>
                Invite a Friend
              </Text>
            </View>
            <View tyle={styles.sectionHeadingStyle}>
                 <Text style={styles.navItemStyle} >
                Terms of service
              </Text>
            </View>
            <View tyle={styles.sectionHeadingStyle}>
               <Text style={styles.navItemStyle} onPress={()=>{ this.props.navigation.navigate('Home',{badgeCount:global.notificationList.length})}}>
                Sign out
              </Text>
            </View>
         </ScrollView>
       </ImageBackground>

        </View>
    );
  }
}
