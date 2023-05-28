async function getData() {
    const res = await fetch(`http://localhost:3000/api/mongo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: "Indra",
            email: "indra@designstripe.com",
        }),
    })
    const data = await res.json()
    return data
}

export default async function Home() {
    const data = await getData()
    return <main>Data : {JSON.stringify(data)}</main>
}
