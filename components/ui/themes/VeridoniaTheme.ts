/* eslint-disable sonarjs/no-duplicate-string */
import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import { Spacing } from '../styleUtils';

const Colors = {
  Black: '#231F20',
  Zambezi: '#5F5F5F',
  Grey: '#B0B0B0',
  Grey5: '#E0E0E0',
  Grey6: '#F2F2F2',
  Gray40: '#666666',
  Gray44: '#707070',
  Gray9: '#171717',
  DimGray: '#737373',
  Orange: '#F2811D',
  LightOrange: '#FDF1E6',
  LightGrey: '#FAF9FF',
  ShadeOfGrey: '#6F6F6F',
  White: '#FFFFFF',
  Red: '#EB5757',
  Green: '#219653',
  Transparent: 'transparent',
  Warning: '#f0ad4e',
  GrayText: '#6F6F6F',
  dorColor: '#793126',
  plainText: '#FFD6A7',
  walletbindingLabel: '#000000',
  GradientColors: ['#9D423B', '#793126'],
  DisabledColors: ['#b0b0b0', '#b0b0b0'],
  Blossom: '#DEB9B5',
  MetalicCopper: '#7A3127',
  LightMetalicCopper: '#fcf1f1',
  TimeoutHintBoxColor: '#FFF7E5',
  TimoutText: '#8B6105',
  resendCodeTimer: '#555555',
};

export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const VeridoniaTheme = {
  Colors: {
    TabItemText: Colors.MetalicCopper,
    Details: Colors.Black,
    DetailsLabel: Colors.MetalicCopper,
    LoadingDetailsLabel: Colors.MetalicCopper,
    AddIdBtnBg: Colors.MetalicCopper,
    AddIdBtnTxt: Colors.MetalicCopper,
    DownloadIdBtnTxt: Colors.White,
    Loading: Colors.MetalicCopper,
    Cursor: Colors.MetalicCopper,
    noUinText: Colors.MetalicCopper,
    IconBg: Colors.MetalicCopper,
    popUp: Colors.Green,
    Icon: Colors.MetalicCopper,
    GrayIcon: Colors.Grey,
    helpText: Colors.Gray44,
    borderBottomColor: Colors.Grey6,
    whiteBackgroundColor: Colors.White,
    lightGreyBackgroundColor: Colors.LightGrey,
    profileLanguageValue: Colors.Grey,
    aboutVersion: Colors.Gray40,
    profileAuthFactorUnlock: Colors.Grey,
    profileLabel: Colors.Black,
    profileValue: Colors.Grey,
    switchHead: Colors.dorColor,
    switchTrackTrue: Colors.Blossom,
    switchTrackFalse: Colors.Grey,
    overlayBackgroundColor: Colors.White,
    rotatingIcon: Colors.Grey5,
    loadingLabel: Colors.Grey6,
    textLabel: Colors.Grey,
    textValue: Colors.Black,
    requesterName: Colors.Red,
    errorMessage: Colors.Red,
    QRCodeBackgroundColor: Colors.LightGrey,
    ReceiveVcModalBackgroundColor: Colors.LightGrey,
    ToastItemText: Colors.White,
    VerifiedIcon: Colors.Green,
    whiteText: Colors.White,
    flipCameraIcon: Colors.Black,
    IdInputModalBorder: Colors.Grey,
    RetrieveIdLabel: Colors.ShadeOfGrey,
    inputSelection: Colors.MetalicCopper,
    checkCircleIcon: Colors.White,
    OnboardingCircleIcon: Colors.White,
    OnboardingCloseIcon: Colors.White,
    WarningIcon: Colors.Warning,
    DefaultToggle: Colors.LightMetalicCopper,
    ProfileIconBg: Colors.LightMetalicCopper,
    GrayText: Colors.GrayText,
    gradientBtn: Colors.GradientColors,
    dotColor: Colors.dorColor,
    plainText: Colors.plainText,
    IconBackground: Colors.LightMetalicCopper,
    GradientColors: Colors.GradientColors,
    DisabledColors: Colors.DisabledColors,
    getVidColor: Colors.Zambezi,
    TimeoutHintBoxColor: Colors.TimeoutHintBoxColor,
    TimoutText: Colors.TimoutText,
    walletbindingLabel: Colors.Black,
    walletbindingContent: Colors.Gray40,
    resendCodeTimer: Colors.resendCodeTimer,
    statusLabel: Colors.Black,
  },
  Styles: StyleSheet.create({
    title: {
      color: Colors.Black,
      backgroundColor: Colors.Transparent,
    },
    progressingLogo: {
      marginBottom: 15,
      marginLeft: -6,
      height: 63,
      width: 100,
      resizeMode: 'contain',
    },
    loadingTitle: {
      color: Colors.Transparent,
      backgroundColor: Colors.Grey,
      borderRadius: 4,
    },
    subtitle: {
      backgroundColor: Colors.Transparent,
    },
    homeLogoStyle: {
      width: 157,
      height: 58,
      resizeMode: 'contain',
      marginLeft: 18,
    },
    loadingSubtitle: {
      backgroundColor: Colors.Grey,
      borderRadius: 4,
    },
    statusLabel: {
      color: Colors.Black,
    },
    verifiedIconContainer: {
      marginLeft: 5,
    },
    verifiedIconInner: {
      backgroundColor: 'white',
      borderRadius: 10,
    },
    vcItemLabelHeader: {
      color: Colors.MetalicCopper,
    },
    closeDetails: {
      flex: 1,
      flexDirection: 'row',
      paddingRight: 90,
    },
    loadingContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: Colors.Grey6,
      borderRadius: 4,
    },
    loadingCardDetailsContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: Colors.Grey6,
      borderRadius: 4,
    },
    cardDetailsContainer: {},
    bottomTabIconStyle: {
      padding: 4,
      width: 36,
      height: 36,
      borderRadius: 6,
      backgroundColor: Colors.LightMetalicCopper,
    },
    popUp: {
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Colors.Green,
      height: 39,
      position: 'relative',
      paddingHorizontal: 12,
    },
    homeScreenContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.4,
      elevation: 5,
      padding: 10,
    },
    vertloadingContainer: {
      flex: 1,
      backgroundColor: Colors.Grey6,
      borderRadius: 4,
      padding: 5,
    },
    closeDetailsContainer: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    closecardMosipLogo: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      marginLeft: 300,
    },
    closeCardBgContainer: {
      borderRadius: 10,
      margin: 8,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: -1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 4,
    },
    selectedBindedVc: {
      borderRadius: 15,
      margin: 5,
      borderWidth: 3,
      borderColor: Colors.MetalicCopper,
    },
    selectedVc: {
      borderRadius: 10,
      margin: 5,
      borderWidth: 2,
      borderColor: Colors.MetalicCopper,
    },
    labelPartContainer: {
      marginLeft: 16,
      flex: 1,
    },
    urlContainer: {
      backgroundColor: Colors.White,
      padding: 10,
      borderRadius: 12,
      fontSize: 12,
    },
    lockDomainContainer: {
      backgroundColor: Colors.White,
      alignSelf: 'center',
      borderRadius: 15,
      width: 100,
    },
    bottomButtonsContainer: {
      height: 'auto',
      borderTopLeftRadius: 27,
      borderTopRightRadius: 27,
      padding: 6,
      backgroundColor: Colors.White,
    },
    consentPageTop: {
      backgroundColor: Colors.White,
      height: 160,
      borderRadius: 6,
    },
    consentDottedLine: {
      width: 182,
      borderWidth: 2,
      margin: 5,
      borderStyle: 'dashed',
      borderRadius: 1,
      borderColor: 'grey',
    },
    labelPart: {
      marginTop: 10,
      alignItems: 'flex-start',
    },
    openCardBgContainer: {
      borderRadius: 10,
      margin: 8,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: -1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 4,
      padding: 10,
    },
    backgroundImageContainer: {
      flex: 1,
      padding: 10,
    },
    successTag: {
      backgroundColor: Colors.Green,
      height: 43,
      flex: 1,
      alignItems: 'center',
      paddingLeft: 6,
    },
    closeDetailsHeader: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 18,
      margin: 6,
    },
    openDetailsHeader: {
      flex: 1,
      justifyContent: 'space-between',
    },
    logo: {
      height: 35,
      width: 55,
    },
    homeCloseCardDetailsHeader: {
      flex: 1,
    },
    cardDetailsHeader: {
      flex: 1,
      justifyContent: 'space-between',
    },
    mosipLogoContainer: {},
    details: {
      width: 290,
      marginLeft: 110,
      marginTop: 0,
    },
    openDetailsContainer: {
      flex: 1,
      padding: 10,
    },
    profileIconBg: {
      padding: 8,
      width: 40,
      height: 40,
      borderRadius: 6,
      backgroundColor: Colors.LightMetalicCopper,
    },
    IconContainer: {
      padding: 6,
      width: 36,
      marginRight: 4,
      marginLeft: 10,
      height: 36,
      borderRadius: 10,
      backgroundColor: Colors.LightMetalicCopper,
    },
    settingsIconBg: {
      padding: 6,
      width: 36,
      marginRight: 4,
      height: 36,
      backgroundColor: Colors.Transparent,
    },
    backArrowContainer: {
      padding: 6,
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: Colors.LightMetalicCopper,
    },
    receiveCardsContainer: {
      height: Dimensions.get('window').height * 0.12,
      width: Dimensions.get('window').width * 0.45,
      alignItems: 'center',
      borderBottomRightRadius: 0,
      padding: 15,
      marginVertical: 18,
      elevation: 1,
    },
    domainVerifiyIcon: {
      padding: 20,
      marginLeft: 120,
      width: 130,
      height: 130,
      borderRadius: 60,
      borderWidth: 10,
      borderColor: Colors.White,
      backgroundColor: Colors.LightMetalicCopper,
    },
    closeCardImage: {
      width: 105,
      height: 135,
      borderRadius: 5,
    },
    openCardImage: {
      width: 105,
      height: 135,
      borderRadius: 5,
    },
    versionContainer: {
      backgroundColor: Colors.Grey6,
      margin: 4,
      borderRadius: 14,
    },
    primaryRow: {
      backgroundColor: Colors.LightMetalicCopper,
      paddingHorizontal: 18,
      paddingVertical: 9,
      justifyContent: 'space-between',
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    scannerContainer: {
      borderRadius: 32,
      alignSelf: 'center',
      height: 330,
      width: 320,
      overflow: 'hidden',
      marginTop: -65,
    },
    scanner: {
      height: 400,
      width: '100%',
      margin: 'auto',
    },
    photoConsentLabel: {
      backgroundColor: Colors.White,
      padding: 0,
      borderWidth: 0,
    },
    tabIndicator: {
      backgroundColor: Colors.MetalicCopper,
    },
    tabContainer: {
      backgroundColor: Colors.Transparent,
      justifyContent: 'center',
    },
    tabView: {
      flex: 1,
    },
    detailsText: {
      fontWeight: 'bold',
      fontSize: 15,
      fontFamily: 'Inter_700Bold',
    },
    getId: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 6,
    },
    placeholder: {
      fontFamily: 'Inter_600SemiBold',
    },
    hrLine: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      marginTop: 10,
    },
  }),
  QrCodeStyles: StyleSheet.create({
    magnifierZoom: {
      backgroundColor: Colors.White,
      width: 30,
      height: 30,
      alignItems: 'center',
      padding: 5,
      borderTopLeftRadius: 11,
      elevation: 4,
    },
    expandedQrCode: {
      backgroundColor: Colors.White,
      width: 350,
      borderRadius: 21,
    },
    QrCodeHeader: {
      backgroundColor: Colors.White,
      borderTopLeftRadius: 21,
      borderTopRightRadius: 21,
      justifyContent: 'space-between',
      fontFamily: 'Inter_700Bold',
      paddingBottom: 10,
      paddingRight: 15,
      paddingLeft: 130,
      elevation: 2,
    },
    warningText: {
      color: Colors.Red,
      fontSize: 18,
    },
  }),
  PinInputStyle: StyleSheet.create({
    input: {
      borderBottomWidth: 3,
      borderColor: Colors.Grey,
      color: Colors.Black,
      flex: 1,
      fontSize: 33,
      fontFamily: 'Inter_600SemiBold',
      height: 40,
      lineHeight: 28,
      margin: 8,
      textAlign: 'center',
    },
    onEnteringPin: {
      borderBottomWidth: 3,
      borderColor: Colors.MetalicCopper,
      color: Colors.Black,
      flex: 1,
      fontSize: 33,
      fontFamily: 'Inter_600SemiBold',
      height: 40,
      lineHeight: 28,
      margin: 8,
      textAlign: 'center',
    },
  }),
  TextStyles: StyleSheet.create({
    header: {
      color: Colors.Black,
      fontFamily: 'Inter_700Bold',
      fontSize: 18,
      lineHeight: 22,
      paddingTop: 4,
    },
    retrieveIdLabel: {
      color: Colors.ShadeOfGrey,
      fontFamily: 'Inter_600SemiBold',
      lineHeight: 18,
    },
    helpDetailes: {
      margin: 5,
      color: Colors.Gray44,
      fontFamily: 'Inter_600SemiBold',
    },
    aboutDetailes: {
      color: Colors.Black,
      fontSize: 18,
      margin: 7,
      lineHeight: 18,
    },
    error: {
      color: Colors.Red,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 12,
    },
    base: {
      color: Colors.Black,
      fontSize: 16,
      lineHeight: 18,
    },
    regular: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
    },
    semibold: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 15,
    },
    bold: {
      fontFamily: 'Inter_700Bold',
    },
    small: {
      fontSize: 13,
      lineHeight: 21,
    },
    smaller: {
      fontSize: 11,
      lineHeight: 18,
    },
    large: {
      fontSize: 18,
    },
  }),
  VcItemStyles: StyleSheet.create({
    title: {
      color: Colors.Black,
      backgroundColor: 'transparent',
    },
    loadingTitle: {
      color: 'transparent',
      backgroundColor: Colors.Grey5,
      borderRadius: 4,
    },
    subtitle: {
      backgroundColor: 'transparent',
      flex: 1,
    },
    loadingSubtitle: {
      backgroundColor: Colors.Grey,
      borderRadius: 4,
    },
    container: {
      backgroundColor: Colors.White,
    },
    loadingContainer: {
      backgroundColor: Colors.Grey6,
      borderRadius: 4,
    },
  }),
  ToastItemStyles: StyleSheet.create({
    toastContainer: {
      backgroundColor: Colors.MetalicCopper,
      position: 'absolute',
      alignSelf: 'center',
      top: 80,
      borderRadius: 4,
    },
    messageContainer: {
      fontSize: 12,
    },
  }),
  ButtonStyles: StyleSheet.create({
    fill: {
      flex: 1,
    },
    solid: {
      backgroundColor: Colors.MetalicCopper,
    },
    clear: {
      backgroundColor: Colors.Transparent,
    },
    outline: {
      backgroundColor: Colors.Transparent,
      borderColor: Colors.MetalicCopper,
    },
    container: {
      height: 45,
      flexDirection: 'row',
    },
    disabled: {
      backgroundColor: Colors.Grey,
    },
    addId: {
      backgroundColor: Colors.MetalicCopper,
    },
    gradient: {
      borderRadius: 9,
      width: Dimensions.get('window').width * 0.72,
      alignSelf: 'center',
      margin: 4,
      height: 50,
      justifyContent: 'center',
    },
    float: {
      borderRadius: 9,
      alignSelf: 'center',
      fontSize: 10,
      elevation: 5,
      position: 'absolute',
      bottom: 24,
    },
    clearAddIdBtnBg: {
      backgroundColor: Colors.Transparent,
    },
    radius: {
      borderRadius: 10,
    },
  }),
  OIDCAuthStyles: StyleSheet.create({
    viewContainer: {
      backgroundColor: Colors.White,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      position: 'absolute',
      top: 0,
      zIndex: 9,
      padding: 32,
    },
  }),
  QRCodeOverlay: StyleSheet.create({
    header: {},
  }),
  SelectVcOverlayStyles: StyleSheet.create({
    overlay: {
      elevation: 5,
      backgroundColor: Colors.White,
      padding: 0,
    },
    consentCheckContainer: {
      backgroundColor: Colors.White,
      borderWidth: 0,
      marginTop: -15,
      fontFamily: 'Inter_600SemiBold',
      padding: 0,
    },
    timeoutHintContainer: {
      backgroundColor: Colors.TimeoutHintBoxColor,
      margin: 21,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 12,
    },
    sharedSuccessfully: {
      flex: 1,
      backgroundColor: Colors.White,
    },
  }),
  AppMetaDataStyles: StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      left: 0,
      right: 'auto',
    },
    view: {
      flex: 1,
      width: Dimensions.get('screen').width,
    },
    contentView: {
      flex: 1,
      padding: 20,
    },
    header: {
      fontSize: 20,
      fontWeight: 'normal',
      color: 'rgb(28,28,30)',
    },
  }),
  FooterStyles: StyleSheet.create({
    bottom: {
      justifyContent: 'flex-end',
      backgroundColor: Colors.Grey6,
      borderRadius: 15,
      padding: 10,
    },
  }),
  ModalStyles: StyleSheet.create({
    modal: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
    },
  }),
  UpdateModalStyles: StyleSheet.create({
    modal: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
    },
  }),
  TextEditOverlayStyles: StyleSheet.create({
    overlay: {
      elevation: 5,
      backgroundColor: Colors.White,
      padding: 0,
    },
    viewContainer: {
      backgroundColor: 'rgba(0,0,0,.6)',
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      position: 'absolute',
      top: 0,
      zIndex: 9,
    },
    boxContainer: {
      backgroundColor: Colors.White,
      padding: 24,
      elevation: 6,
      borderRadius: 4,
    },
  }),
  PasscodeStyles: StyleSheet.create({
    modal: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
    },
  }),
  KebabPopUpStyles: StyleSheet.create({
    kebabPopUp: {
      marginHorizontal: 4,
    },
    kebabHeaderStyle: {
      backgroundColor: Colors.White,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      justifyContent: 'space-between',
      fontFamily: 'Inter_700Bold',
      paddingRight: 15,
      paddingLeft: 130,
      paddingTop: 18,
    },
  }),
  MessageOverlayStyles: StyleSheet.create({
    overlay: {
      elevation: 5,
      backgroundColor: Colors.White,
      padding: 5,
      borderRadius: 10,
    },
    buttonContainer: {
      justifyContent: 'center',
      marginBottom: 75,
    },
    popupOverLay: {
      height: 150,
      backgroundColor: Colors.White,
    },
    button: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    halfButton: {
      borderRadius: 8,
      margin: '0.5%',
    },
  }),
  BindingVcWarningOverlay: StyleSheet.create({
    overlay: {
      elevation: 5,
      backgroundColor: Colors.White,
      padding: 0,
      borderRadius: 15,
    },
    button: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  }),
  RevokeStyles: StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      left: 0,
      right: 'auto',
    },
    view: {
      flex: 1,
      width: Dimensions.get('screen').width,
    },
    revokeView: { padding: 20 },
    flexRow: { flexDirection: 'row', margin: 0, padding: 0 },
    rowStyle: { flexDirection: 'column', justifyContent: 'space-between' },
    viewContainer: {
      backgroundColor: 'rgba(0,0,0,.6)',
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      position: 'absolute',
      top: 0,
      zIndex: 999,
    },
    boxContainer: {
      backgroundColor: Colors.White,
      padding: 24,
      elevation: 6,
      borderRadius: 4,
    },
  }),
  VerifyIdentityOverlayStyles: StyleSheet.create({
    content: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      backgroundColor: Colors.White,
    },
  }),
  RevokeConfirmStyles: StyleSheet.create({
    viewContainer: {
      backgroundColor: 'rgba(0,0,0,.6)',
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      position: 'absolute',
      top: 0,
      zIndex: 999999,
    },
    boxContainer: {
      backgroundColor: Colors.White,
      padding: 24,
      elevation: 6,
      borderRadius: 4,
    },
  }),
  OtpVerificationStyles: StyleSheet.create({
    modal: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
    },
    viewContainer: {
      backgroundColor: Colors.White,
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      position: 'absolute',
      top: 0,
      zIndex: 9,
      padding: 32,
    },
    close: {
      position: 'absolute',
      top: 32,
      right: 0,
      color: Colors.MetalicCopper,
    },
  }),
  MessageStyles: StyleSheet.create({
    overlay: {
      elevation: 5,
      backgroundColor: Colors.White,
      padding: 0,
    },
    button: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    viewContainer: {
      backgroundColor: 'rgba(0,0,0,.6)',
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      position: 'absolute',
      top: 0,
      zIndex: 9,
    },
    boxContainer: {
      backgroundColor: Colors.White,
      padding: 24,
      elevation: 6,
      borderRadius: 4,
    },
  }),
  VidItemStyles: StyleSheet.create({
    title: {
      color: Colors.Black,
      backgroundColor: 'transparent',
    },
    loadingTitle: {
      color: 'transparent',
      backgroundColor: Colors.Grey5,
      borderRadius: 4,
    },
    subtitle: {
      backgroundColor: 'transparent',
    },
    loadingSubtitle: {
      backgroundColor: Colors.Grey,
      borderRadius: 4,
    },
    container: {
      backgroundColor: Colors.White,
    },
    loadingContainer: {
      backgroundColor: Colors.Grey6,
      borderRadius: 4,
    },
  }),
  OnboardingOverlayStyles: StyleSheet.create({
    overlay: {
      padding: 24,
      bottom: 86,
      backgroundColor: 'transparent',
      shadowColor: 'transparent',
    },
    slide: {
      width: '100%',
      padding: 20,
    },
    slider: {
      backgroundColor: Colors.MetalicCopper,
      minHeight: 300,
      width: '100%',
      margin: 0,
      borderRadius: 4,
    },
    appSlider: {},
    sliderTitle: {
      color: Colors.White,
      marginBottom: 20,
      fontFamily: 'Inter_700Bold',
    },
    text: {
      color: Colors.White,
    },
    paginationContainer: {
      margin: 10,
    },
    paginationDots: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    closeIcon: {
      alignItems: 'flex-end',
      end: 16,
      top: 40,
      zIndex: 1,
    },
    bottomContainer: {
      padding: 20,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: -185,
      paddingBottom: 100,
    },
  }),
  claimsContainer: StyleSheet.create({
    container: {
      backgroundColor: Colors.Transparent,
    },
  }),
  OpenCard: '',
  CloseCard: '',
  ProfileIcon: require('../../../veridoniaAssets/profile-icon.png'),
  MosipSplashLogo: require('../../../veridoniaAssets/veridonia-splash-logo.png'),
  MosipLogo: require('../../../veridoniaAssets/mosip-logo.png'),
  DomainWarningLogo: require('../../../assets/domain-warning.png'),
  WarningLogo: require('../../../assets/warningLogo.png'),
  OtpLogo: require('../../../veridoniaAssets/otp-mobile-logo.png'),
  SuccessLogo: require('../../../assets/success-logo.png'),
  DigitalIdentityLogo: require('../../../veridoniaAssets/digital-identity-icon.png'),
  InjiProgressingLogo: require('../../../veridoniaAssets/progressing-logo.png'),
  LockIcon: require('../../../veridoniaAssets/lock-icon.png'),
  InjiHomeLogo: require('../../../veridoniaAssets/inji-home-logo.png'),
  MagnifierZoom: require('../../../assets/magnifier-zoom.png'),
  HelpIcon: require('../../../veridoniaAssets/help-icon.png'),
  sharingIntro: require('../../../assets/Secure-Sharing.png'),
  walletIntro: require('../../../assets/intro-wallet-binding.png'),
  IntroScanner: require('../../../assets/intro-scanner.png'),
  injiSmallLogo: require('../../../veridoniaAssets/inji-small-logo.png'),
  protectPrivacy: require('../../../assets/phone_mockup_1.png'),

  elevation(level: ElevationLevel): ViewStyle {
    // https://ethercreative.github.io/react-native-shadow-generator/

    if (level === 0) {
      return null;
    }

    const index = level - 1;

    return {
      shadowColor: Colors.Black,
      shadowOffset: {
        width: 0,
        height: [1, 1, 1, 2, 2][index],
      },
      shadowOpacity: [0.18, 0.2, 0.22, 0.23, 0.25][index],
      shadowRadius: [1.0, 1.41, 2.22, 2.62, 3.84][index],
      elevation: level,
      zIndex: level,
      borderRadius: 4,
      backgroundColor: Colors.White,
    };
  },
  spacing(type: 'margin' | 'padding', values: Spacing) {
    if (Array.isArray(values) && values.length === 2) {
      return {
        [`${type}Horizontal`]: values[0],
        [`${type}Vertical`]: values[1],
      };
    }

    const [top, end, bottom, start] =
      typeof values === 'string' ? values.split(' ').map(Number) : values;

    return {
      [`${type}Top`]: top,
      [`${type}End`]: end != null ? end : top,
      [`${type}Bottom`]: bottom != null ? bottom : top,
      [`${type}Start`]: start != null ? start : end != null ? end : top,
    };
  },
};