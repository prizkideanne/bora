import { Provider } from "react-redux";
import store from "./store";

import RouteList from "./RouteList";

function App() {
  return (
    <Provider store={store}>
      <RouteList />
    </Provider>
  );
}

export default App;
