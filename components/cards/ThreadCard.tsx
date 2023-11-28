interface Props {
	id: string;
	createdAt: string;
	author: {
		id: string;
		name: string;
		image: string;
	};
	content: string;
	parentId: string | null;
	currentUser: string;
	crew: {
		id: string;
		name: string;
		image: string;
	} | null;
	comments: {
		author: {
			image: string;
		};
	}[];
	isComments?: boolean;
}

const ThreadCard = ({
	id,
	currentUser,
	content,
	comments,
	crew = null,
	author,
	createdAt,
	parentId,
}: Props) => {
	return (
		<article>
			<h2 className="text-small-regular text-light-2">{content}</h2>
		</article>
	);
};

export default ThreadCard;
