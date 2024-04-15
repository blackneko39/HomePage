import { getAllPostsSlugs, getPostTitle } from "@/lib/postsGetter";
import DisplayPost from "@/app/_components/@post/displayPost/displayPost";

import "./style.css"

const dn: string = 'projects';

export function generateMetadata({ params }: { params: { slug: string } }) {
	return {
		title: `${getPostTitle(dn, params.slug)} - BlackNeko Posts`,
	}
}
export async function generateStaticParams() {
	return getAllPostsSlugs(dn);
}

export default function Page({ params }: { params: { slug: string } }) { 
	const slug = params.slug;

	return (<>
		<DisplayPost dn={dn} slug={slug}/>
	</>);
}