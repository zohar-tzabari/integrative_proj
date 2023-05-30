import AppTemp from "./menu";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ConfigProvider } from "antd";
import enUS from 'antd/lib/locale/en_US';


function App() {
  return (
    <ConfigProvider
      locale={enUS}
      theme={{
        components: {
          Switch: {
            colorPrimary: "#00b96b",
          },
        },
      }}
    >
      <Provider store={store}>
        <AppTemp />
      </Provider>
    </ConfigProvider>
  );
}
export default App;
