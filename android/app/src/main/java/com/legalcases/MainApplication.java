package com.legalcases;

import android.app.Application;

import com.facebook.react.ReactApplication;
//import com.RNFetchBlob.RNFetchBlobPackage;
import com.keyee.pdfview.PDFView;
import org.wonday.pdf.RCTPdfView;
import com.magus.fblogin.FacebookLoginPackage;
import com.github.reactnativecommunity.location.RNLocationPackage;
import com.gettipsi.stripe.StripeReactPackage;
import cl.json.RNSharePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
//import com.magus.fblogin.FacebookLoginPackage;
import com.rnziparchive.RNZipArchivePackage;
//import com.magus.fblogin.FacebookLoginPackage;
import org.reactnative.camera.RNCameraPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import se.bonniernews.rn3d.RN3DPackage;
import com.jimmydaddy.imagemarker.ImageMarkerPackage;
import com.imagepicker.ImagePickerPackage;
//import se.bonniernews.rn3d.RN3DPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnziparchive.RNZipArchivePackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.reactnative.camera.RNCameraPackage;
import java.util.Arrays;
import java.util.List;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;  // <--- Import Package

//import com.viromedia.bridge.ReactViroPackage;
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            //new RNFetchBlobPackage(),
            new PDFView(),
            new ReactNativePushNotificationPackage(),
            new RCTPdfView(),
            new FacebookLoginPackage(),
            new RNLocationPackage(),
            new StripeReactPackage(),
            new RNSharePackage(),
            new RNFetchBlobPackage(),
           // new FacebookLoginPackage(),
            new RNZipArchivePackage(),
            //new FacebookLoginPackage(),
            new RNCameraPackage(),
            new RNViewShotPackage(),
            new RN3DPackage(),
            new ImageMarkerPackage(),
            new ImagePickerPackage(),
            new RN3DPackage(),
            //new RNFetchBlobPackage(),
            new RNFSPackage(),
            //new RNZipArchivePackage(),
            new MapsPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage()
            //new ReactViroPackage(ReactViroPackage.ViroPlatform.AR)
            //new   RNCameraPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
