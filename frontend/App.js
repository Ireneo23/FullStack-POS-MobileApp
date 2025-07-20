import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import { IngredientProvider } from './src/context/IngredientContext';
import { ProductProvider } from './src/context/ProductContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <NotificationProvider>
      <IngredientProvider>
        <ProductProvider>
          <UserProvider>
            <NavigationContainer>
              <AppNavigation />
            </NavigationContainer>
          </UserProvider>
        </ProductProvider>
      </IngredientProvider>
    </NotificationProvider>
  );
}