import { Component, PropsWithChildren } from "react";
import { View, Text } from "@tarojs/components";


export default class Index extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return <View className="drawer-box">hello home</View>;
  }
}
