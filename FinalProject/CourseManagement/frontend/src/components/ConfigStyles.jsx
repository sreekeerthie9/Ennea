import { ConfigProvider } from "antd";

export default function ConfigStyles({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#e30d7c",
        },
        components: {
          Button: {
            bg: "#e30d7c",
            bgHover: "#e30d5b",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
