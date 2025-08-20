import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Layout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        popToTopOnBlur: true,
        tabBarShowLabel: true,
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: "rgba(255, 135, 37, 1)",
        tabBarInactiveTintColor: "rgb(100,100,100)",
        tabBarBadgeStyle: {
          backgroundColor: "tomato",
          color: "white",
        },
      }}
      backBehavior="order"
    >
      <Tabs.Screen
        name="samples"
        options={{
          title: "Samples",
          // tabBarBadge: 2,
          tabBarIcon: ({ color, size }) => (
            <View style={ styles.iconContainer}>
              <MaterialCommunityIcons
              name="scan-helper"
              size={size}
              color={color}
              />
              <MaterialCommunityIcons
              name="corn"
              size={size}
              color={color}
              style={styles.overlayIcon}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="plants"
        options={{
          title: "Plants",
          // tabBarBadge: 2,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
            name="corn"
            size={size}
            color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              size={size+10}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="fields"
        options={{
          title: "Fields",
          // tabBarBadge: 2,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
            name="grid"
            size={size}
            color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          popToTopOnBlur: true,
          // tabBarBadge: 2,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayIcon: {
    position: 'absolute',
  },
});