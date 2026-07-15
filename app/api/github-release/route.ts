import { NextResponse } from "next/server";

const OWNER = "jit0341";
const REPO = "lekhaflow-website";

export async function GET() {

    try {

        const response = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/releases`,
            {
                headers: {
                    Accept: "application/vnd.github+json",
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Unable to fetch releases"
                },
                {
                    status: 500
                }
            );

        }

        const releases = await response.json();

        let standard = null;
        let demo = null;
        let gold = null;

        for (const release of releases) {

            const tag = String(release.tag_name).toUpperCase();

            if (tag === "V1FULL") {

                if (release.assets.length > 0) {

                    standard =
                        release.assets[0].browser_download_url;

                }

            }

            else if (tag === "V1.0") {

                if (release.assets.length > 0) {

                    demo =
                        release.assets[0].browser_download_url;

                }

            }

            else if (tag === "VGOLD") {

                if (release.assets.length > 0) {

                    gold =
                        release.assets[0].browser_download_url;

                }

            }

        }

       return NextResponse.json({

    success: true,

    version: releases[0]?.tag_name || "",

    publishedAt: releases[0]?.published_at || "",

    standard,

    demo,

    gold

});


    }

    catch (err) {

        console.error(err);

        return NextResponse.json(
            {
                success: false
            },
            {
                status: 500
            }
        );

    }

}