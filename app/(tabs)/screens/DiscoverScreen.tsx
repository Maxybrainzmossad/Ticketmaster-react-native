// App.js
import React, { useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const HERO_HEIGHT = 220;
const CARD_WIDTH = width * 0.84;
const HORIZ_CARD = width * 0.8;

const CATEGORIES = ["Concerts", "Sports", "Arts, Theater & Comedy", "Family", "Festivals"];
const RECOMMENDED = [
  {
    id: "1",
    title: "Ed Sheeran",
    subtitle: "Pop",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2b7d1a28f8b3d7a0f847354ab475b257",
  },
  {
    id: "2",
    title: "Billie Eilish",
    subtitle: "Pop",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1f1b9b1b9e1f6d7f258b7a7f4a2cbe1b",
  },
  {
    id: "3",
    title: "Kenny Chesney",
    subtitle: "Country",
    img: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=9b3f1b2f2e3b5a1a9f5f2c7f8c6e9a1b",
  },
];

export default function DiscoverScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.logo}>ticketmaster</Text>
          <TouchableOpacity style={styles.flagWrap}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
              }}
              style={styles.flag}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="location-outline" size={18} color="#fff" />
            <Text style={styles.filterText}>New York, NY</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.filterBtn, { marginLeft: 10 }]}>
            <Ionicons name="calendar-outline" size={18} color="#fff" />
            <Text style={styles.filterText}>All Dates</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={20} color="#666" style={{ marginLeft: 8 }} />
          <TextInput
            placeholder="Artist, Event or Venue"
            placeholderTextColor="#999"
            style={styles.searchInput}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.chipsRow}>
          {CATEGORIES.map((c, i) => (
            <TouchableOpacity key={c} style={[styles.chip, i === 0 && styles.chipActive]}>
              <Text style={[styles.chipText, i === 0 && styles.chipTextActive]} numberOfLines={1}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* HERO / FEATURED */}
        <View style={styles.heroWrap}>
          <ImageBackground
            source={{
              uri:
                "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=c4d8a6c8b0f5b7b4e4c3b2a1a0b9c8d7",
            }}
            style={styles.hero}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Kenny Chesney</Text>
              <TouchableOpacity style={styles.heroBtn}>
                <Text style={styles.heroBtnText}>Find Tickets</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* RECOMMENDED HORIZONTAL */}
        <View style={{ marginTop: 18 }}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <Animated.FlatList
            data={RECOMMENDED}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            snapToInterval={HORIZ_CARD + 16}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 16 }}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: true,
            })}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * (HORIZ_CARD + 16),
                index * (HORIZ_CARD + 16),
                (index + 1) * (HORIZ_CARD + 16),
              ];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.92, 1, 0.92],
                extrapolate: "clamp",
              });

              return (
                <Animated.View style={[styles.hCard, { transform: [{ scale }] }]}>
                  <Image source={{ uri: item.img }} style={styles.hImage} />
                  <View style={styles.hInfo}>
                    <Text style={styles.hTitle}>{item.title}</Text>
                    <Text style={styles.hSub}>{item.subtitle}</Text>
                  </View>
                </Animated.View>
              );
            }}
          />
        </View>

        {/* Placeholder additional content */}
        <View style={{ padding: 16 }}>
          <Text style={styles.sectionTitle}>Popular Near You</Text>
          <View style={styles.listCard}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1518972559570-8a1e5e3d1df1?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=a1b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7",
              }}
              style={styles.listImage}
            />
            <View style={{ flex: 1, paddingLeft: 12 }}>
              <Text style={{ fontWeight: "700", fontSize: 16 }}>Fela Kuti Revival</Text>
              <Text style={{ color: "#666", marginTop: 6 }}>World / Afrobeat • Various dates</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#0861FF" />
          <Text style={[styles.navText, { color: "#0861FF" }]}>Discover</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={22} color="#444" />
          <Text style={styles.navText}>For You</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="ticket-outline" size={22} color="#444" />
          <Text style={styles.navText}>My Tickets</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="wallet-outline" size={22} color="#444" />
          <Text style={styles.navText}>Sell</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#444" />
          <Text style={styles.navText}>My Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0b0b0b",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#0b0b0b",
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  logo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  flagWrap: {
    width: 34,
    height: 22,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#222",
  },
  flag: {
    width: "100%",
    height: "100%",
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#222",
  },
  filterText: {
    color: "#fff",
    marginLeft: 8,
    marginRight: 6,
    fontWeight: "600",
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 44,
    marginTop: 6,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    color: "#222",
    fontSize: 15,
  },
  body: {
    flex: 1,
    backgroundColor: "#f6f6f8",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    marginTop: 8,
  },
  chipsRow: {
    flexDirection: "row",
    paddingTop: 18,
    paddingHorizontal: 12,
  },
  chip: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 22,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e6e6e9",
  },
  chipActive: {
    backgroundColor: "#0861FF",
    borderColor: "#0861FF",
  },
  chipText: {
    fontWeight: "600",
    color: "#333",
    fontSize: 13,
  },
  chipTextActive: {
    color: "#fff",
  },
  heroWrap: {
    paddingHorizontal: 12,
    marginTop: 14,
  },
  hero: {
    height: HERO_HEIGHT,
    borderRadius: 14,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  heroImage: {
    borderRadius: 14,
    resizeMode: "cover",
    opacity: 0.95,
  },
  heroContent: {
    backgroundColor: "rgba(0,0,0,0.28)",
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
  heroBtn: {
    backgroundColor: "#0861FF",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  heroBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  hCard: {
    width: HORIZ_CARD,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  hImage: {
    width: "100%",
    height: 150,
  },
  hInfo: {
    padding: 12,
  },
  hTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  hSub: {
    color: "#666",
    marginTop: 6,
  },
  listCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  listImage: {
    width: 90,
    height: 60,
    borderRadius: 8,
  },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    height: 64,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    color: "#444",
    marginTop: 2,
  },
});
