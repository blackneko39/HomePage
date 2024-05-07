import { getAllPostsSlugs, getPostTitle } from "@/lib/postsGetter";
import DisplayPost from "@/components/@post/displayPost/displayPost";

import "./style.scss"

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

	return (
		<div className="display-port">
			<DisplayPost dn={dn} slug={slug}/>
		</div>
	);
}