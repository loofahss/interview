import { useEffect, useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(10);
    useEffect(() => {
        let countDown = setInterval(() => {
            setCount(c => {
                if (c <= 0) {
                    clearInterval(countDown)
                    return 0
                }
                return c - 1
            }, 1000);
        })
    }, [])
    return <div>倒计时: {count} 秒</div>
}
