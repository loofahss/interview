// react 脱围机制，更改ref不会引起组件重新渲染
import { useRef } from 'react';

export default function Counter() {
    let ref = useRef(0);

    function handleClick() {
        ref.current = ref.current + 1;
        alert('你点击了 ' + ref.current + ' 次！');
    }

    return (
        <button onClick={handleClick}>
        点击我！
        </button>
    );
}
