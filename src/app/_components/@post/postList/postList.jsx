import Link from "next/link";
import styles from './style.module.css';

import { getSortedPostsData } from "@/lib/postsGetter"


export default function PostList(props) {
    const dn = props.dn;

		return (<>
			<main className={styles.main}>
				<div className={styles.space}></div>
				<article className={styles.article}>
					<h1 className={styles.title}>{dn}</h1>
					{getSortedPostsData(dn).map((post) => {
						return (

							<section key={post.slug} className={styles.section}>
								<Link className={styles.link} href={`/${dn}/${post.slug}`}>
								<div className={styles.tap}>
									<h1>{post.title}</h1>
									<p>{post.date}</p>
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