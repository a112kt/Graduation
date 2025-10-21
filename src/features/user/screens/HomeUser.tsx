import React from "react";
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import GradientText from "../../../Components/GradientText";
import { SvgXml } from "react-native-svg";
import { lightColors } from "../../../../theme";
import Highlights from "../../../Components/Highlights";
import GradientButton from "../../../Components/buttons/GradientButton";
import { useAppDispatch } from "../../../Redux/store";
import { clearToken } from "../../../Redux/slices/authSlice";
import { RootStackParamList } from "../../../Navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
type RootNavigationType = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const mainNavigation = useNavigation<RootNavigationType>();
  const dispatch = useAppDispatch();
  const searchSvg = `
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5947 19.4372C15.7581 20.783 13.4786 21.5804 11.0089 21.5804C4.92898 21.5804 0 16.7493 0 10.7902C0 4.83105 4.92898 0 11.0089 0C17.0888 0 22.0178 4.83105 22.0178 10.7902C22.0178 13.4646 21.0252 15.9119 19.3812 17.7972L24.8208 23.1288C25.0597 23.3629 25.0597 23.7425 24.8208 23.9764L23.956 24.8244C23.7171 25.0585 23.3297 25.0585 23.0911 24.8244L17.5947 19.4372ZM19.5714 10.7902C19.5714 15.4251 15.7378 19.1825 11.0089 19.1825C6.28001 19.1825 2.44642 15.4251 2.44642 10.7902C2.44642 6.15524 6.28001 2.39782 11.0089 2.39782C15.7378 2.39782 19.5714 6.15524 19.5714 10.7902Z" fill="url(#paint0_linear_425_2106)"/>
      <defs>
        <linearGradient id="paint0_linear_425_2106" x1="0" y1="12.5" x2="25" y2="12.5" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1B2351"/>
          <stop offset="1" stop-color="#47C0D2"/>
        </linearGradient>
      </defs>
    </svg>
  `;

  const notiSvg = `
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
      <path d="M18.2169 20.4444H8.77957M18.2169 20.4444H23.8637C26.7949 20.4444 26.2996 17.8611 24.8168 16.55C19.4763 11.8347 27.0621 1 13.4982 1C-0.0655937 1 7.52178 11.8333 2.18125 16.55C0.754706 17.8111 0.146904 20.4444 3.13435 20.4444H8.77957M18.2169 20.4444C18.2169 23.1181 17.2044 26 13.4982 26C9.79206 26 8.77957 23.1181 8.77957 20.4444" stroke="url(#paint0_linear_425_2105)" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
      <defs>
        <linearGradient id="paint0_linear_425_2105" x1="1" y1="13.5" x2="26" y2="13.5" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1B2351"/>
          <stop offset="1" stop-color="#47C0D2"/>
        </linearGradient>
      </defs>
    </svg>
  `;

  const starSvg = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.8326 6.99996L13.5686 5.72796C13.657 5.57492 13.6811 5.39301 13.6355 5.22224C13.5898 5.05147 13.4783 4.90581 13.3253 4.81729L12.0519 4.08129V2.61462C12.0519 2.43781 11.9817 2.26824 11.8567 2.14322C11.7316 2.01819 11.5621 1.94796 11.3853 1.94796H9.91926L9.18392 0.67529C9.09556 0.522178 8.95 0.41043 8.77926 0.364624C8.69467 0.341958 8.60644 0.33618 8.51962 0.347618C8.4328 0.359057 8.34909 0.387489 8.27326 0.43129L6.99992 1.16729L5.72659 0.430624C5.57347 0.342222 5.39151 0.318266 5.22072 0.364024C5.04994 0.409783 4.90433 0.521508 4.81592 0.674624L4.07992 1.94796H2.61392C2.43711 1.94796 2.26754 2.01819 2.14252 2.14322C2.01749 2.26824 1.94726 2.43781 1.94726 2.61462V4.08062L0.673923 4.81662C0.598075 4.86046 0.531609 4.9188 0.478325 4.98834C0.425041 5.05787 0.385984 5.13722 0.363385 5.22186C0.340786 5.3065 0.33509 5.39476 0.346621 5.4816C0.358153 5.56844 0.386686 5.65215 0.430589 5.72796L1.16659 6.99996L0.430589 8.27196C0.342582 8.42514 0.318704 8.6069 0.364162 8.77762C0.409619 8.94833 0.520726 9.09416 0.673256 9.18329L1.94659 9.91929V11.3853C1.94659 11.5621 2.01683 11.7317 2.14185 11.8567C2.26688 11.9817 2.43645 12.052 2.61326 12.052H4.07992L4.81592 13.3253C4.87494 13.4262 4.95921 13.51 5.06044 13.5684C5.16167 13.6269 5.27637 13.658 5.39326 13.6586C5.50926 13.6586 5.62459 13.628 5.72726 13.5686L6.99926 12.8326L8.27259 13.5686C8.42563 13.6571 8.60753 13.6811 8.7783 13.6355C8.94908 13.5899 9.09474 13.4783 9.18326 13.3253L9.91859 12.052H11.3846C11.5614 12.052 11.731 11.9817 11.856 11.8567C11.981 11.7317 12.0513 11.5621 12.0513 11.3853V9.91929L13.3246 9.18329C13.4004 9.13946 13.4669 9.08111 13.5202 9.01158C13.5735 8.94204 13.6125 8.86269 13.6351 8.77805C13.6577 8.69342 13.6634 8.60516 13.6519 8.51832C13.6404 8.43148 13.6118 8.34776 13.5679 8.27196L12.8326 6.99996ZM5.33259 3.65996C5.59789 3.66005 5.8523 3.76552 6.03983 3.95318C6.22737 4.14084 6.33268 4.39532 6.33259 4.66062C6.3325 4.92593 6.22702 5.18033 6.03936 5.36787C5.8517 5.5554 5.59723 5.66071 5.33192 5.66062C5.06662 5.66054 4.81221 5.55506 4.62468 5.3674C4.43714 5.17974 4.33183 4.92526 4.33192 4.65996C4.33201 4.39465 4.43749 4.14025 4.62515 3.95271C4.81281 3.76518 5.06728 3.65987 5.33259 3.65996ZM5.53259 10.06L4.46592 9.26062L8.46592 3.92729L9.53259 4.72662L5.53259 10.06ZM8.66592 10.3266C8.53456 10.3266 8.40449 10.3007 8.28314 10.2503C8.16179 10.2 8.05154 10.1263 7.95868 10.0334C7.86582 9.94048 7.79217 9.83018 7.74194 9.70879C7.69171 9.58741 7.66588 9.45732 7.66592 9.32596C7.66597 9.19459 7.69188 9.06452 7.7422 8.94317C7.79251 8.82182 7.86623 8.71157 7.95915 8.61871C8.05207 8.52585 8.16237 8.45221 8.28375 8.40197C8.40514 8.35174 8.53522 8.32591 8.66659 8.32596C8.93189 8.32605 9.1863 8.43152 9.37383 8.61918C9.56137 8.80684 9.66668 9.06132 9.66659 9.32662C9.6665 9.59193 9.56102 9.84633 9.37336 10.0339C9.1857 10.2214 8.93123 10.3267 8.66592 10.3266Z" fill="url(#paint0_linear_425_2063)"/>
<defs>
<linearGradient id="paint0_linear_425_2063" x1="0.34082" y1="6.99997" x2="13.6581" y2="6.99997" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B2351"/>
<stop offset="1" stop-color="#47C0D2"/>
</linearGradient>
</defs>
</svg>
`;

  const highlightsData = [
    {
      id: "1",
      text: "Brand1",
      source: require("../../../assests/imgs/Brand1.png"),
    },
    {
      id: "2",
      text: "Brand2",
      source: require("../../../assests/imgs/Brand2.png"),
    },
    {
      id: "3",
      text: "Brand3",
      source: require("../../../assests/imgs/Brand3.png"),
    },
    {
      id: "4",
      text: "Brand4",
      source: require("../../../assests/imgs/Brand4.png"),
    },
    {
      id: "5",
      text: "Brand5",
      source: require("../../../assests/imgs/Brand5.png"),
    },
    {
      id: "6",
      text: "Brand6",
      source: require("../../../assests/imgs/Brand6.png"),
    },
    {
      id: "7",
      text: "Brand3",
      source: require("../../../assests/imgs/Brand3.png"),
    },
    {
      id: "8",
      text: "Brand2",
      source: require("../../../assests/imgs/Brand2.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View style={styles.container}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../../assests/imgs/AlluvoLogo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <GradientText text="Alluvo" textStyle={styles.logoText} />
          </View>
          <View style={styles.rightIcons}>
            <TouchableOpacity
              style={styles.iconBtn}
              accessible
              accessibilityLabel="Search"
            >
              <SvgXml xml={searchSvg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              accessible
              accessibilityLabel="Notifications"
              onPress={() => {
                dispatch(clearToken());
                mainNavigation.replace("Auth");
              }}
            >
              <SvgXml xml={notiSvg} width={25} height={25} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Highlights */}
        <View style={styles.offers}>
          <GradientText text="Highlights" textStyle={styles.highlightsText} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.Highlightscontainer}
          >
            {highlightsData.map((h) => (
              <Highlights key={h.id} text={h.text} source={h.source} />
            ))}
          </ScrollView>
        </View>

        {/* Offers */}
        <View style={styles.offers}>
          <View style={styles.containeroffer}>
            <GradientText text="Today’s Offers" textStyle={styles.offerText} />
            <SvgXml xml={starSvg} width={25} height={25} style={styles.icon} />
          </View>

          <View style={styles.BrandProfile}>
            <Image
              source={require("../../../assests/imgs/Profile.png")}
              style={styles.brandProfileImage}
            />
            <Text style={styles.brandName}>Brand Name</Text>
          </View>
        </View>

        {/* Background Offer Image */}
        <View style={styles.BackGroundOffer}>
          <ImageBackground
            source={require("../../../assests/imgs/offer.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
        </View>

        {/* Explore */}
        <View style={styles.ExploreContainer}>
          <ImageBackground
            source={require("../../../assests/imgs/Explore.png")}
            style={styles.ExploreImage}
            resizeMode="cover"
          >
            <GradientButton text="Explore Reels" style={styles.Explorebtn} />
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: lightColors.background,
    paddingTop: 55,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  logoWrapper: { flexDirection: "row", alignItems: "center" },
  logoImage: { width: 39, height: 39, marginRight: 3 },
  logoText: {
    fontFamily: "CinzelDecorative-Regular",
    fontWeight: "400",
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: 0,
  },
  rightIcons: { flexDirection: "row", alignItems: "center", gap: 6 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  highlightsText: { fontSize: 20, fontWeight: "400" },
  Highlightscontainer: { flexDirection: "row" },
  offers: { marginTop: 20, marginLeft: 10 },
  containeroffer: { flexDirection: "row", alignItems: "center" },
  offerText: { fontSize: 20, fontWeight: "400" },
  icon: { marginLeft: 6, width: 14, height: 14 },
  BrandProfile: { marginTop: 5, flexDirection: "row", alignItems: "center" },
  brandProfileImage: { width: 38, height: 38 },
  brandName: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 16,
    color: "#1B2351",
    margin: 6,
  },
  BackGroundOffer: { width: screenWidth, height: 200, marginTop: 5 },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ExploreContainer: {
    width: screenWidth,
    height: 400,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ExploreImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Explorebtn: {
    width: 180,
    height: 48,
    borderRadius: 8,
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
  },
});
