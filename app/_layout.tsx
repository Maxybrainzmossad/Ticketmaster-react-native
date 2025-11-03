// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarShowLabel: true,
//         tabBarActiveTintColor: "#0861FF",
//         tabBarInactiveTintColor: "#444",
//         tabBarStyle: { height: 65, borderTopColor: "#ddd" },
//         tabBarIcon: ({ color }) => {
//           let iconName;
//           if (route.name === "index") iconName = "search";
//           else if (route.name === "foryou") iconName = "heart-outline";
//           else if (route.name === "mytickets") iconName = "ticket-outline";
//           else if (route.name === "sell") iconName = "wallet-outline";
//           else if (route.name === "account") iconName = "person-outline";
//           return <Ionicons name={iconName} size={24} color={color} />;
//         },
//       })}
//     />
//   );
// }



























// import { Tabs } from "expo-router";
// import { Ionicons } from '@expo/vector-icons';

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarShowLabel: true,
//         tabBarActiveTintColor: "#0861FF",
//         tabBarInactiveTintColor: "#444",
//         tabBarStyle: { height: 65, borderTopColor: "#ddd" },
//         tabBarIcon: ({ color }) => {
//           let iconName;
//           if (route.name === "index") iconName = "search";
//           else if (route.name === "foryou") iconName = "heart-outline";
//           else if (route.name === "mytickets") iconName = "ticket-outline";
//           else if (route.name === "sell") iconName = "wallet-outline";
//           else if (route.name === "account") iconName = "person-outline";
//           return <Ionicons name={iconName} size={24} color={color} />;
//         },
//       })}
//     >
//       <Tabs.Screen name="index" options={{ title: 'Discover' }} />
//       <Tabs.Screen name="foryou" options={{ title: 'For You' }} />
//       <Tabs.Screen name="mytickets" options={{ title: 'My Tickets' }} />
//       <Tabs.Screen name="sell" options={{ title: 'Sell' }} />
//       <Tabs.Screen name="account" options={{ title: 'Account' }} />
//     </Tabs>
//   );
// }


















// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/use-color-scheme';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }
