import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabNavigator from "./CustomTabNavigator";
import ProductView from "../screens/ProductView";
import OrderReviewScreen from "../screens/OrderReviewScreen";
import PaymentMethodScreen from "../screens/PaymentMethodScreen";
import CashPaymentScreen from "../screens/CashPaymentScreen";
import PaymentCompleteScreen from "../screens/PaymentCompleteScreen";
import GcashConfirmationScreen from "../screens/GcashConfirmationScreen";
import AddScreen from "../screens/AddScreen";
import AddProductScreen from "../screens/AddProductScreen";
import AddIngredientScreen from "../screens/AddIngredientScreen";
import NotificationScreen from "../screens/NotificationScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import BusinessInformation from "../screens/BusinessInformation";
import Terms from "../screens/Terms";
import SalesReportScreen from "../screens/SalesReportScreen";
import InformationScreen from "../screens/InformationScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="BusinessInformation"
        component={BusinessInformation}
      />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="MainTabs" component={CustomTabNavigator} />
      <Stack.Screen name="ProductView" component={ProductView} />
      <Stack.Screen name="OrderReview" component={OrderReviewScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="CashPayment" component={CashPaymentScreen} />
      <Stack.Screen name="PaymentComplete" component={PaymentCompleteScreen} />
      <Stack.Screen
        name="GcashConfirmation"
        component={GcashConfirmationScreen}
      />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="AddIngredient" component={AddIngredientScreen} />
      <Stack.Screen name="AddScreen" component={AddScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="SalesReport" component={SalesReportScreen} />
      <Stack.Screen name="InformationScreen" component={InformationScreen} />
      <Stack.Screen name="MyAccountScreen" component={MyAccountScreen} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
    </Stack.Navigator>
  );
}
