import { Metadata } from "next"

const title = 'BlackNeko - Kinoshita, Ryosuke';
const description = "木下亮佑のホームページです";
const url = 'https://blackneko.net'

export const defaultMeta: Metadata = {
    title: title,
    description: description,
    metadataBase: new URL(url),
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: title,
      locale: "ja_JP",
      type: "website",
      images: {
        width: 1200,
        height: 600,
        url: '/me.jpg'
      }
    }
}

export function customMeta(title: string): Metadata {
    let meta = defaultMeta;
    
    meta.title = title;
    if (meta.openGraph != null) meta.openGraph.title = title;

    return meta;
}