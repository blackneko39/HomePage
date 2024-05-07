import Link from "next/link";
import s from './style.module.scss';

import { getSortedPostsData } from "@/lib/postsGetter"


export default function PostList(props) {
    const dn = props.dn;

		return (<>
			<main className={s.main}>
				<div className={s.space}></div>
				<article className={s.article}>
					<div className={s.title}>{dn}</div>
					{getSortedPostsData(dn).map((post) => {
						return (

							<section key={post.slug} className={s.section}>
								<Link className={s.link} href={`/${dn}/${post.slug}`}>
								<div className={s.post}>
									<h1 className={s.postTitle}>{post.title}</h1>
									<p className={s.postDate}>{post.date}</p>
								</div>
								</Link>
							</section>
							
						);
					})}
					<div className={s.margin}></div>
				</article>
				<div className={s.space}></div>
			</main>
		</>);
}