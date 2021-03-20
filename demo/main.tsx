import * as React from 'react';
import {AttrsObserver} from "../src/AttrsObserver";

class Test extends React.PureComponent {

    state = {
        num: 2,
        visible: false,
        display: 'none',
        height: 100
    };
    ref = React.createRef<HTMLDivElement>();

    /**
     *
     */
    componentDidMount(){
        const target = this.ref.current;
        const observer = new AttrsObserver();
        const observed = observer.observe(target,
            (target, from, to) => {
                console.log(target, from, to)
                if (to.value === 'yom') {
                    return true;
                } else {
                    return false
                }

            },
            (target, from, to) => {
                console.log(target, from, to)
            }
        )
    }

    /**
     *
     */
    render() {
        const {height} = this.state;
        return (
            <div ref={this.ref} style={{height: height, border: '1px solid'}}>
                <button onClick={() => {
                    this.setState({height: 300})
                }}>点我
                </button>
            </div>
        );
    }
}

/***
 *
 * @constructor
 */
export default function App(): React.ReactElement<HTMLElement> {
    return (
        <div className="app">
            <Test/>
        </div>
    )
}
