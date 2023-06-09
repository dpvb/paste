import Head from "next/head";
import { Snippet } from "@/models/Snippet";
import { connect } from "@/utils/db";
import copy from "clipboard-copy";
import Link from "next/link";

export default function ViewSnippet({ snippetText }) {
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
            <div className="flex-col flex gap-4 px-12 md:px-40 font-mono  max-h-[calc(100vh-2rem)]">
                <div className="flex justify-between items-center mt-4">
                    <Link href="/">
                        <h1 className="text-3xl">Paste!</h1>
                    </Link>
                    <button
                        onClick={() => copy(window.location)}
                        className="bg-sky-500 hover:bg-sky-600 rounded-md transition-all duration-200 ease-in-out text-xl w-32 md:w-48 py-2"
                    >
                        Copy Link!
                    </button>
                </div>
                <div className="h-screen">
                    <textarea
                        value={snippetText}
                        disabled
                        className="p-2 w-full h-full bg-[#242424] outline-none resize-none text-lg mb-0 mt-0"
                    ></textarea>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    await connect();
    const slug = context.params.slug;
    const snippetObj = await Snippet.findOne({
        slug,
    });

    return {
        props: {
            snippetText: snippetObj.snippet,
        },
    };
}
