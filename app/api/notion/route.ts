// app/api/notion/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

export async function POST(req: NextRequest) {
    const { summary } = await req.json();
    const pageId = process.env.NOTION_PAGE_ID;

    if (!pageId || !summary) {
        return NextResponse.json({ error: "Missing summary or page ID" }, { status: 400 });
    }

    try {
        await notion.pages.create({
            parent: { page_id: pageId },
            properties: {
                title: [
                    {
                        type: "text",
                        text: {
                            content: `Inbox Summary - ${new Date().toLocaleDateString()}`,
                        },
                    },
                ],
            },
            children: [
                {
                    object: "block",
                    type: "paragraph",
                    paragraph: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: summary,
                                },
                            },
                        ],
                    },
                },
            ],
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("❌ Notion API Error:", err);
        return NextResponse.json({ error: "Notion API error" }, { status: 500 });
    }
}