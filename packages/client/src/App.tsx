import { useEffect, useState } from 'react'


function App() {
    const [res, setRes] = useState("")
    useEffect(() => {
        async function getRequest() {
            try {
                const res = await fetch('http://localhost:3000')
                const resText = await res.text()
                setRes(resText)
            } catch (error) {
                console.log(error)
            }
        }
        getRequest()
    }, [])
    return (
        <>
            {res}
        </>
    )
}

export default App
