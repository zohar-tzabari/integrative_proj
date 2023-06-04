import AppTemp from "./menu";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";

function App() {
  return (
    <ConfigProvider
      locale={enUS}
      theme={{
        components: {
          Button: {
            colorPrimary: "#820034",
            colorPrimaryActive	:"#4f0619",
            colorPrimaryHover:"#f0c0cd"
          },
          Steps: {
            colorPrimary: "#820034",
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
