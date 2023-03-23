import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// import "taro-ui/dist/style/components/button.scss" // 按需引入
// import './index.less'
import Home from '../home'
import View1 from '../view1'

export default class Index extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <BrowserRouter>
        <View className="drawer-box">
          <View className="box-item">
            <Link to="/pages/router/index/view1?a=1&b=2">view1</Link>
          </View>
          <View className="box-item">
            <Link to="/pages/router/index/view2#a=3&b=4">view2</Link>
          </View>
          <View className="box-item">
            <Link to="/pages/router/index/2?a=1&b=2#a=3&b=4">view3</Link>
          </View>
        </View>

        <Routes>
          {/* <Route path="/pages/browser-router/index" element={<Home />}></Route> */}
          <Route path="/pages/router/index/view1" element={<View1 />}></Route>
          {/* <Route path="/pages/router/index/view2" element={<View2 />}></Route>
          <Route path="/pages/router/index/:id" element={<View3 />}></Route> */}
        </Routes>
      </BrowserRouter>
    )
  }
}
