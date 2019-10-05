import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default {
  container: {
    paddingTop: 50,
    flex: 1,
    width: '100%',
    backgroundColor: "#3598DB60",
      alignItems: 'stretch',
    height:800,
  },
  containerMain: {
    paddingTop: 50,
    flex: 1,
    width: '100%',
    backgroundColor: "#3598DB",
    justifyContent: 'center',
      alignItems: 'stretch',

  },
  navItemStyle: {
    padding: 20,
    color: '#ffffff',
    fontSize: 20,
    fontWeight:'bold',
    backgroundColor:'transparent',
    width: '100%',
    borderColor:'#FFFFFF20',
    borderWidth:.5,
  },
  navItemNotificationStyle: {
    padding: 20,
    color: '#000000',
    fontSize: 20,
    fontWeight:'bold',
    backgroundColor:'#FFFFFF',
    width: '100%',
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    marginTop:1,
    borderColor:'red',
    borderWidth:1,
    width: '60%',
    backgroundColor: '#FFFFFF',
  },
  sectionNotificationStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor:'white',
    borderWidth:1,
    width: '20%',
    backgroundColor: '#FFFFFF',
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  },
  backGroundImage: {
    backgroundColor: '#3598DB60',
    width:null,
    height:null,
    flex: 1,
    justifyContent: 'center',
    alignSelf:'stretch',
    resizeMode:'contain',
  },
  logoImage: {
    width: 175,
    height: 175,
    marginTop:50,
    alignItems:'center',
    resizeMode:'contain',
  },
  crossImage: {
    width: scale(20),
    height: verticalScale(20),
    justifyContent: 'center',
    alignItems:'center',
    marginLeft:moderateScale(10),
    marginBottom:moderateScale(20),
  },
};
