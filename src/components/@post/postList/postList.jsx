import Link from "next/link";
import styles from './style.module.scss';

import { getSortedPostsData } from "@/lib/postsGetter"


export default function PostList(props) {
    const dn = props.dn;

		return (<>
			<main className={styles.main}>
				<div className={styles.space}></div>
				<article className={styles.article}>
					<div className={styles.title}>{dn}</div>
					{getSortedPostsData(dn).map((post) => {
						return (

							<section key={post.slug} className={styles.section}>
								<Link className={styles.link} href={`/${dn}/${post.slug}`}>
								<div className={styles.post}>
									<h1 className={styles.postTitle}>{post.title}</h1>
									<p className={styles.postDate}>{post.date}</p>
								</div>
								</Link>
							</section>
							
						);
					})}
				</article>
				<div className={styles.space}></div>
			</main>
		</>);
}