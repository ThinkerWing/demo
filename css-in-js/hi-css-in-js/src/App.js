import { css } from "@emotion/react";
import styled from '@emotion/styled'
import Css from './Css'
// const style = css`
//     width: 200;
//     height: 200;
//     background: "red";
// `;

// console.log(style);

function Demo ({className}) {
  return <div className={className}>Demo</div>
}

const Fancy = styled(Demo)`
color:red;`
const style = css({
  width: 200,
  height: 200,
  background: 'pink'
})

const Button = styled.button`
    width: 200;
    height: 200;
    background: ${props => props.bgColor || 'red'};
`
const Container = styled.div({
  width: 1000,
  background: 'pink'
})

// 通过父组件设置子组件样式
const Child = styled.div({
  color: 'red'
})

const Parent = styled.div({
  [Child]: {
    color: 'green'
  }
})
function App(props) {
  return (
    <div className="App" css={style}>
      {/* hello world */}
      {/* props 的css是高于组件内部的css */}
      <Css css={style}/>
      <Container> <Button bgColor="blue">button</Button></Container>
      <Fancy />
    </div>
  );
}

export default App;
