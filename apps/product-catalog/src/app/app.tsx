import { Provider } from 'react-redux';
import { store } from './store/store';
import { ProductCatalogApp } from './ProductCatalogApp';

export function App() {
  return (
    <Provider store={store}>
      <ProductCatalogApp />
    </Provider>
  );
}

export default App;
