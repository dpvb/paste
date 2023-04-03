import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
    const router = useRouter();
    const [snippet, setSnippet] = useState("");

    const saveSnippet = async () => {
        const response = await fetch("/api/snippets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                snippet,
            }),
        });

        const createdSnippet = await response.json();
        router.push(`/${createdSnippet.slug}`);
    };

    return (
        <>
            <Head>
                <title>Paste!</title>
                <meta name="description" content="paste away!" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex-col flex gap-4 px-40 font-mono max-h-[calc(100vh-2rem)]">
                <div className="flex justify-between items-center mt-4">
                    <Link href="/">
                        <h1 className="text-3xl">Paste!</h1>
                    </Link>
                    <button
                        onClick={saveSnippet}
                        className="bg-sky-500 hover:bg-sky-600 rounded-md transition-all duration-200 ease-in-out text-xl w-48 py-2"
                    >
                        Save
                    </button>
                </div>
                <div className="h-screen">
                    <textarea
                        onChange={(e) => setSnippet(e.target.value)}
                        className="p-2 w-full h-full bg-[#242424] outline-none resize-none text-lg mb-0 mt-0"
                    ></textarea>
                </div>
            </div>
        </>
    );
}
