import Link from "next/link";
import styles from './style.module.scss';

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
								<h1 className={styles.title}>{post.title}</h1>
								<div className={styles.date}>{post.date}</div>
							</section>
							<hr className={styles.border}></hr>
							<section className={styles.content}>
								<div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
							</section>
							<hr className={styles.border}></hr>
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