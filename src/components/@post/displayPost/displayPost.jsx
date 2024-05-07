import Link from "next/link";
import s from './style.module.scss';

import { getPostData } from "@/lib/postsGetter";


export default function DisplayPost(props) {
    const dn = props.dn;
	const slug = props.slug;

		return (<>
			<main className={s.main}>
				<div className={s.space}></div>
				<article className={s.article}>
					{getPostData(dn, slug).then(post => {
						return (<>

							<section className={s.head}>
								<h1 className={s.title}>{post.title}</h1>
								<div className={s.date}>{post.date}</div>
							</section>
							<hr className={s.border}></hr>
							<section className={s.content}>
								<div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
							</section>
							<hr className={s.border}></hr>
							<section className={s.back}>
								<Link href={`/${dn}`}>Prev Page</Link>
							</section>

						</>);
					})}
				</article>
				<div className={s.space}></div>
			</main>
		</>);
}