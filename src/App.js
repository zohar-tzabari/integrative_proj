import AppTemp from "./menu";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <AppTemp />
    </Provider>
  );
}
export default App;
