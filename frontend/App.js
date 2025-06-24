import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomTabNavigator from './src/navigation/CustomTabNavigator';
import ProductView from './src/screens/ProductView';
import OrderReviewScreen from './src/screens/OrderReviewScreen';
import PaymentMethodScreen from './src/screens/PaymentMethodScreen';
import CashPaymentScreen from './src/screens/CashPaymentScreen';
import PaymentCompleteScreen from './src/screens/PaymentCompleteScreen';
import GcashConfirmationScreen from './src/screens/GcashConfirmationScreen';
import AddScreen from './src/screens/AddScreen';
import AddProductScreen from './src/screens/AddProductScreen';
import AddIngredientScreen from './src/screens/AddIngredientScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SalesReportScreen from './src/screens/SalesReportScreen';
import { IngredientProvider } from './src/context/IngredientContext';
import { ProductProvider } from './src/context/ProductContext';
import { NotificationProvider } from './src/context/NotificationContext';
import InformationScreen from './src/screens/InformationScreen';
import MyAccountScreen from './src/screens/MyAccountScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import { UserProvider } from './src/context/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NotificationProvider>
      <IngredientProvider>
        <ProductProvider>
          <UserProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Onboarding"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="MainTabs" component={CustomTabNavigator} />
                <Stack.Screen name="ProductView" component={ProductView} />
                <Stack.Screen name="OrderReview" component={OrderReviewScreen} />
                <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
                <Stack.Screen name="CashPayment" component={CashPaymentScreen} />
                <Stack.Screen name="PaymentComplete" component={PaymentCompleteScreen} />
                <Stack.Screen name="GcashConfirmation" component={GcashConfirmationScreen} />
                <Stack.Screen name="AddProduct" component={AddProductScreen} />
                <Stack.Screen name="AddIngredient" component={AddIngredientScreen} />
                <Stack.Screen name="AddScreen" component={AddScreen}/>
                <Stack.Screen name="Notifications" component={NotificationScreen} />
                <Stack.Screen name="SalesReport" component={SalesReportScreen} />
                <Stack.Screen name="InformationScreen" component={InformationScreen} />
                <Stack.Screen name="MyAccountScreen" component={MyAccountScreen} />
                <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </UserProvider>
        </ProductProvider>
      </IngredientProvider>
    </NotificationProvider>
  );
}