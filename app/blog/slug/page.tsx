import React from "react";

const POSTS_DATA: any = {
  "pdf-to-tally-import": {
    title: "PDF to Tally Import: The Ultimate 2026 Guide",
    content: "यहाँ PDF to Tally वाले ब्लॉग का 1000 शब्दों का कंटेंट पेस्ट करें..."
  },
  "invoice-to-tally-automation": {
    title: "Invoice to Tally Automation for MSMEs",
    content: "यहाँ दूसरे ब्लॉग का 1000 शब्दों का कंटेंट पेस्ट करें..."
  },
  // इसी तरह बाकी 4 आर्टिकल्स भी यहाँ पेस्ट करें...
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = POSTS_DATA[params.slug];

  if (!post) return <div className="text-white text-center py-40">Post Not Found</div>;

  return (
    <div className="bg-[#020617] min-h-screen py-32 px-4 text-slate-300">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-10 italic uppercase leading-tight">{post.title}</h1>
        <div className="prose prose-invert prose-teal max-w-none text-lg leading-relaxed">
          {/* यहाँ आपका 1000 शब्दों का कंटेंट रेंडर होगा */}
          {post.content}
        </div>
      </article>
    </div>
  );
}