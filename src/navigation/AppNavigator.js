import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../constants/colors";

import HomeScreen from "../screens/HomeScreen";
import PracticeTestScreen from "../screens/PracticeTestScreen";
import QuizScreen from "../screens/QuizScreen";
import QuizPlayScreen from "../screens/QuizPlayScreen";
import TutorialsScreen from "../screens/TutorialsScreen";
import WorkbookScreen from "../screens/WorkbookScreen";
import WhatsAppScreen from "../screens/WhatsAppScreen";
import ContactScreen from "../screens/ContactScreen";
import AdminLoginScreen from "../screens/AdminLoginScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import AdminManagePracticeTestsScreen from "../screens/AdminManagePracticeTestsScreen";
import AdminManageQuizScreen from "../screens/AdminManageQuizScreen";
import AdminManageTutorialsScreen from "../screens/AdminManageTutorialsScreen";
import AdminManageWorkbookScreen from "../screens/AdminManageWorkbookScreen";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: COLORS.primary },
  headerTintColor: COLORS.white,
  headerTitleStyle: { fontWeight: "700" },
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PracticeTest" component={PracticeTestScreen} options={{ title: "Practice Tests" }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: "Quiz" }} />
        <Stack.Screen name="QuizPlay" component={QuizPlayScreen} options={{ title: "Quiz" }} />
        <Stack.Screen name="Tutorials" component={TutorialsScreen} options={{ title: "Tutorials" }} />
        <Stack.Screen name="Workbook" component={WorkbookScreen} options={{ title: "Workbook" }} />
        <Stack.Screen name="WhatsApp" component={WhatsAppScreen} options={{ title: "WhatsApp Chat" }} />
        <Stack.Screen name="Contact" component={ContactScreen} options={{ title: "Contact Us" }} />

        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} options={{ title: "Admin Login" }} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: "Admin Dashboard", headerBackVisible: false }} />
        <Stack.Screen name="AdminManagePracticeTests" component={AdminManagePracticeTestsScreen} options={{ title: "Practice Tests" }} />
        <Stack.Screen name="AdminManageQuiz" component={AdminManageQuizScreen} options={{ title: "Quizzes" }} />
        <Stack.Screen name="AdminManageTutorials" component={AdminManageTutorialsScreen} options={{ title: "Tutorials" }} />
        <Stack.Screen name="AdminManageWorkbook" component={AdminManageWorkbookScreen} options={{ title: "Workbook" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
