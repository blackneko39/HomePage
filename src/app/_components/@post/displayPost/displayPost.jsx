import Link from "next/link";
import styles from './style.module.css';

import { getPostData } from "@/lib/postsGetter";


export default function DisplayPost(props) {
    const dn = props.dn;
	const slug = props.slug;

		return (<>
			<main className={styles.main}>
				<div className={styles.space}></div>
				<article className={styles.article}>
					{getPostData(dn, slug).then(post => {
						return (<>

							<section className={styles.head}>
								<h1 className="title">{post.title}</h1>
								<div className="date">{post.date}</div>
							</section>
							<hr className={styles.border}></hr>
							<section className="content">
								<div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
							</section>
							<section className={styles.back}>
								<Link href={`/${dn}`}>Prev Page</Link>
							</section>

						</>);
					})}
				</article>
				<div className={styles.space}></div>
			</main>
		</>);
}