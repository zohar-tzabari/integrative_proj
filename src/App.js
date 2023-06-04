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
          Layout: {
            padding: 0,
            background: "rgba(255, 255, 100, 0.1)",
            backgroundImage:
              'url("https://img.freepik.com/free-vector/light-pink-heart-pattern_53876-67660.jpg")',
            backgroundSize: "20%",
            backgroundRepeat: "repeat",
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
