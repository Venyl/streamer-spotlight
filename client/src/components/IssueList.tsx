type Props = {
    issues: string[];
};

export default function IssueList({ issues }: Props) {
    return (
        <ul>
            {issues.map(issue => (
                <li key={issue}>{issue}</li>
            ))}
        </ul>
    );
}
