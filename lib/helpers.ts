export const formattedDate = (date: string) => {
    const formatted = new Date(date);
    return formatted.toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    })
}

export const timeAgo = (date: string) => {
    const now = new Date();
    const dateObj = new Date(date);
    const timeDifference = now.getTime() - dateObj.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    switch (true) {
        case months > 0:
            return `${months}m ago`;
        case weeks > 0:
            return `${weeks}w ago`;
        case days > 0:
            return `${days}d ago`;
        case hours > 0:
            return `${hours}h ago`;
        case minutes > 0:
            return `${minutes}m ago`;
        case seconds > 0:
            return `${seconds}s ago`;
        default:
            break;
    }

    // if (months > 0) {
    //     return `${months}m ago`;
    // } else if (weeks > 0) {
    //     return `${weeks}w ago`;
    // } else if (days > 0) {
    //     return `${days}d ago`;
    // } else if (hours > 0) {
    //     return `${hours}h ago`;
    // } else if (minutes > 0) {
    //     return `${minutes}m ago`;
    // } else {
    //     return `${seconds}s ago`;
    // }
};