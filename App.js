import React from "react";
import HomeScreen from "./Screens/HomeScreen";
import ArticleInfo from "./Screens/ArticleInfo";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

export default function App() {
  return <AppContainer />;
}

const StackNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ArticleInfo: {
    screen: ArticleInfo,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AppContainer = createAppContainer(StackNavigator);
